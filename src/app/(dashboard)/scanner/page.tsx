"use client";

import type React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import jsQR from "jsqr";
import { useFirebase } from "@/common/context";
import { useAllEvents, useCheckInEvent } from "@/common/api/event";
import { useActiveHackathonForStatic } from "@/common/api/hackathon/hook";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "sonner";
import { Building2, CheckCircle, Camera, CameraOff } from "lucide-react";
import { useAllUsers } from "@/common/api/user";

const SponsorScannerPage: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);
	const lastScannedRef = useRef<string>("");
	const lastScannedTimeRef = useRef<number>(0);
	const { user, logout } = useFirebase();
	const [selectedEvent, setSelectedEvent] = useState<string>("");
	const [isScanning, setIsScanning] = useState<boolean>(true);
	const [scanStatus, setScanStatus] = useState<"idle" | "scanning" | "found">(
		"idle"
	);
	const [recentScans, setRecentScans] = useState<string[]>([]);

	const {
		data: eventsData,
		isLoading: eventsLoading,
		isError: eventsError,
	} = useAllEvents();

	// Filter events to only include those with "(Sponsor)" in the name
	interface Event {
		id: string;
		name: string;
	}

	const filteredEventsData: Event[] | undefined = eventsData?.filter((event: Event) => 
		event.name.includes("(Sponsor)")
	);
	console.log("Filtered Events Data:", filteredEventsData);
	console.log("Events Data:", eventsData);
	
	const { data: hackathonData } = useActiveHackathonForStatic();
	const { mutate: checkInMutate } = useCheckInEvent();
	const { data: userData } = useAllUsers();

	// Default event selection - prioritize sponsor/booth events
	useEffect(() => {
		if (!eventsLoading && filteredEventsData && filteredEventsData.length && !selectedEvent) {
			const sponsorEvent = filteredEventsData.find(
				(e) =>
					e.name.toLowerCase().includes("sponsor") ||
					e.name.toLowerCase().includes("booth")
			);
			setSelectedEvent(sponsorEvent?.id || filteredEventsData[0].id);
		}
	}, [eventsLoading, filteredEventsData, selectedEvent]);

	// Start camera
	useEffect(() => {
		let stream: MediaStream | null = null;
		const startCamera = async () => {
			try {
				stream = await navigator.mediaDevices.getUserMedia({
					video: { facingMode: "environment" },
				});
				if (videoRef.current) {
					videoRef.current.srcObject = stream;
				}
			} catch (err) {
				console.error(err);
				toast.error("Error accessing the camera. Please check permissions.");
			}
		};
		startCamera();
		return () => {
			if (stream) stream.getTracks().forEach((t) => t.stop());
		};
	}, []);

	const handleEventChange = useCallback(
		(value: string) => setSelectedEvent(value),
		[]
	);

	const handleBoothCheckIn = useCallback(
		(scannedUserId: string) => {
			if (!user) return void logout();
			if (!selectedEvent) return void toast.error("Please select an event");
			if (!hackathonData) return void toast.error("No active hackathon found");

			// Prevent duplicate scans within 5 seconds
			const now = Date.now();
			if (
				lastScannedRef.current === scannedUserId &&
				now - lastScannedTimeRef.current < 5000
			) {
				//toast.info("Participant already scanned recently")
				return;
			}

			lastScannedRef.current = scannedUserId;
			lastScannedTimeRef.current = now;

			checkInMutate(
				{
					id: selectedEvent,
					userId: scannedUserId,
					data: { hackathonId: hackathonData.id, organizerId: user.uid },
				},
				{
					onSuccess: () => {
						const eventName =
							filteredEventsData?.find((e) => e.id === selectedEvent)?.name || "event";
						toast.success("Participant checked in successfully!", {
							description: `User ${scannedUserId} → ${eventName}`,
						});
						setScanStatus("found");
						setRecentScans((prev) => [scannedUserId, ...prev.slice(0, 4)]);
						setTimeout(() => setScanStatus("scanning"), 2000);
					},
					onError: (err: any) => {
						console.error(err);
						toast.error("Failed to check in participant", {
							description: err.message || "Please try again",
						});
						setScanStatus("scanning");
					},
				}
			);
		},
		[user, selectedEvent, hackathonData, checkInMutate, logout, filteredEventsData]
	);

	const captureAndScanImage = useCallback(async () => {
		if (!videoRef.current || !isScanning) return;

		const canvas = document.createElement("canvas");
		canvas.width = videoRef.current.videoWidth;
		canvas.height = videoRef.current.videoHeight;
		const ctx = canvas.getContext("2d");

		if (ctx && canvas.width > 0 && canvas.height > 0) {
			ctx.drawImage(videoRef.current, 0, 0);
			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
			const code = jsQR(imageData.data, imageData.width, imageData.height);

			if (code) {
				const userId = code.data.replace("HACKPSU_", "");
				handleBoothCheckIn(userId);
			}
		}
	}, [handleBoothCheckIn, isScanning]);

	// Continuous scanning
	useEffect(() => {
		if (isScanning && videoRef.current) {
			setScanStatus("scanning");
			scanIntervalRef.current = setInterval(() => {
				captureAndScanImage();
			}, 300);
		} else {
			setScanStatus("idle");
			if (scanIntervalRef.current) {
				clearInterval(scanIntervalRef.current);
				scanIntervalRef.current = null;
			}
		}

		return () => {
			if (scanIntervalRef.current) {
				clearInterval(scanIntervalRef.current);
			}
		};
	}, [isScanning, captureAndScanImage]);

	const toggleScanning = useCallback(() => {
		setIsScanning((prev) => !prev);
	}, []);

	if (eventsLoading) {
		return (
			<div className="container max-w-2xl mx-auto py-8">
				<div className="text-center">Loading scanner...</div>
			</div>
		);
	}

	if (eventsError) {
		return (
			<div className="container max-w-2xl mx-auto py-8">
				<Alert variant="destructive">
					<AlertDescription>
						Error loading events. Please try again or contact support.
					</AlertDescription>
				</Alert>
			</div>
		);
	}

	return (
		<>
			<div className="container max-w-2xl mx-auto py-6 px-4">
				{/* Header */}
				<div className="text-center mb-6">
					<div className="flex items-center justify-center gap-2 mb-2">
						<Building2 className="h-6 w-6 text-primary" />
						<h1 className="text-2xl font-bold">Sponsor Scanner</h1>
					</div>
					<p className="text-muted-foreground">
						Scan participant QR codes to check them into your event
					</p>
				</div>

				{/* Event Selection */}
				<div className="mb-6">
					<Label htmlFor="event-select" className="text-sm font-medium">
						Select Event
					</Label>
					<Select value={selectedEvent} onValueChange={handleEventChange}>
						<SelectTrigger id="event-select" className="w-full mt-1">
							<SelectValue placeholder="Choose an event" />
						</SelectTrigger>
						<SelectContent className="max-h-[300px]">
							<div className="sticky top-0 bg-background p-2 border-b">
								<input
									type="text"
									placeholder="Search events..."
									className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
									onChange={(e) => {
										const searchTerm = e.target.value.toLowerCase();
										const items = document.querySelectorAll(
											"[data-radix-select-item]"
										);
										items.forEach((item) => {
											const text = item.textContent?.toLowerCase() || "";
											const shouldShow = text.includes(searchTerm);
											(item as HTMLElement).style.display = shouldShow
												? "flex"
												: "none";
										});
									}}
								/>
							</div>
							<div className="max-h-[200px] overflow-y-auto">
								{filteredEventsData?.map((evt) => (
									<SelectItem key={evt.id} value={evt.id}>
										{evt.name}
									</SelectItem>
								))}
							</div>
						</SelectContent>
					</Select>
				</div>

				{/* Camera Scanner */}
				<Card className="mb-6">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Camera className="h-5 w-5" />
							QR Code Scanner
						</CardTitle>
						<CardDescription>
							Point the camera at a participant's QR code
						</CardDescription>
					</CardHeader>
					<CardContent>
						{/* Camera with overlay */}
						<div className="relative overflow-hidden rounded-lg bg-black mb-4">
							<video
								ref={videoRef}
								autoPlay
								muted
								playsInline
								className="w-full aspect-video object-cover"
							/>

							{/* QR Code targeting overlay */}
							<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
								<div className="relative">
									{/* Main scanning frame */}
									<div className="w-40 h-40 rounded-lg transition-colors duration-300">
										{/* Corner indicators */}
										<div className="absolute -top-1 -left-1 w-8 h-8 border-l-4 border-t-4 border-white rounded-tl-lg"></div>
										<div className="absolute -top-1 -right-1 w-8 h-8 border-r-4 border-t-4 border-white rounded-tr-lg"></div>
										<div className="absolute -bottom-1 -left-1 w-8 h-8 border-l-4 border-b-4 border-white rounded-bl-lg"></div>
										<div className="absolute -bottom-1 -right-1 w-8 h-8 border-r-4 border-b-4 border-white rounded-br-lg"></div>

										{/* Success indicator */}
										{scanStatus === "found" && (
											<div className="absolute inset-0 flex items-center justify-center">
												<div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
													<CheckCircle className="w-8 h-8 text-white" />
												</div>
											</div>
										)}

										{/* Scanning line animation */}
										{scanStatus === "scanning" && (
											<div className="absolute inset-0 overflow-hidden rounded-lg">
												<div className="absolute w-full h-0.5 bg-blue-400 animate-pulse top-1/2 transform -translate-y-1/2"></div>
											</div>
										)}
									</div>
								</div>
							</div>

							{/* Subtle status indicator */}
							<div className="absolute top-4 right-4">
								<div
									className={`w-3 h-3 rounded-full ${
										scanStatus === "found"
											? "bg-green-400"
											: scanStatus === "scanning"
												? "bg-blue-400 animate-pulse"
												: "bg-gray-400"
									}`}
								></div>
							</div>
						</div>

						{/* Control buttons */}
						<div className="flex gap-3">
							<Button
								variant={isScanning ? "destructive" : "default"}
								onClick={toggleScanning}
								className="flex-1"
								size="lg"
							>
								{isScanning ? (
									<>
										<CameraOff className="w-4 h-4 mr-2" />
										Stop Scanner
									</>
								) : (
									<>
										<Camera className="w-4 h-4 mr-2" />
										Start Scanner
									</>
								)}
							</Button>
							<Button
								variant="outline"
								onClick={captureAndScanImage}
								disabled={!isScanning}
								size="lg"
							>
								Manual Scan
							</Button>
						</div>

						{/* Status text */}
						<div className="text-center text-sm text-muted-foreground mt-3">
							{isScanning
								? "Hold steady and point camera at QR codes"
								: "Scanner is paused. Click 'Start Scanner' to resume."}
						</div>
					</CardContent>
				</Card>

				{/* Recent Scans - More Compact */}
				{recentScans.length > 0 && (
					<Card>
						<CardHeader className="pb-3">
							<CardTitle className="text-lg">Recent Check-ins</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-1">
								{recentScans.map((userId, index) => (
									<div
										key={`${userId}-${index}`}
										className="flex items-center justify-between py-1.5 text-sm"
									>
										<div className="flex items-center gap-2">
											<div className="w-2 h-2 bg-green-500 rounded-full"></div>
											<span className="font-mono">
												{userData?.find((u) => u.id === userId)?.firstName +
													" " +
													userData?.find((u) => u.id === userId)?.lastName ||
													userId}
											</span>
										</div>
										<span className="text-muted-foreground text-xs">
											{index === 0 ? "Just now" : `${index + 1} ago`}
										</span>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				)}
			</div>
		</>
	);
};

export default SponsorScannerPage;

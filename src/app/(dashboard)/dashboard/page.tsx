"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Users,
	Calendar,
	FolderOpen,
	UserCheck,
	ArrowRight,
	RefreshCw,
	Download,
	FileText,
	QrCode,
} from "lucide-react";
import Link from "next/link";
import { useAllEvents, EventType } from "@/common/api/event";
import { useActiveHackathonForStatic } from "@/common/api/hackathon";
import { useAllScans } from "@/common/api/scan";
import { useAllResumes } from "@/common/api/user";
import { useFlagState } from "@/common/api/flag";
import { toast } from "sonner";
import { useState } from "react";

export default function SponsorDashboard() {
	const { data: hackathon } = useActiveHackathonForStatic();
	const {
		data: scans,
		isLoading,
		error,
		refetch,
		isFetching,
	} = useAllScans(hackathon?.id);
	const { data: events } = useAllEvents(hackathon?.id);
	const { refetch: downloadResumes, isFetching: isDownloading } =
		useAllResumes();
	const { data: sponsorScannerFlag } = useFlagState("SponsorScanner");
	const [downloadProgress, setDownloadProgress] = useState<
		"idle" | "downloading" | "success" | "error"
	>("idle");

	const checkInEvent = events?.filter(
		(event) => event.type === EventType.checkIn
	);

	const eventYear = hackathon?.name;

	const totalCheckIns =
		scans?.filter((scan) => scan.eventId === checkInEvent?.[0]?.id).length || 0;

	const handleDownloadResumes = async () => {
		try {
			setDownloadProgress("downloading");
			toast.loading("Preparing resume book download...", {
				id: "resume-download",
			});

			const result = await downloadResumes();

			if (result.data) {
				// Create download link for zip file
				const url = window.URL.createObjectURL(result.data);
				const link = document.createElement("a");
				link.href = url;
				link.download = `HackPSU-${eventYear}-Resume-Book-${new Date().toISOString().split("T")[0]}.zip`;
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				window.URL.revokeObjectURL(url);

				setDownloadProgress("success");
				toast.success("Resume book downloaded successfully!", {
					id: "resume-download",
				});
			} else {
				throw new Error("No data received");
			}
		} catch (error) {
			setDownloadProgress("error");
			toast.error("Failed to download resume book. Please try again.", {
				id: "resume-download",
			});
			console.error("Download error:", error);
		}
	};

	if (error) {
		return (
			<div className="min-h-screen bg-background p-4">
				<div className="max-w-4xl mx-auto">
					<Card>
						<CardContent className="pt-6">
							<div className="text-center text-red-600">
								<p>Error loading data. Please try again later.</p>
								<Button onClick={() => refetch()} className="mt-4">
									Try Again
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<div className="border-b bg-card">
				<div className="max-w-4xl mx-auto p-4 sm:p-6">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-2xl sm:text-3xl font-bold">Sponsor Portal</h1>
						</div>
						<Button
							onClick={() => refetch()}
							disabled={isFetching}
							variant="outline"
							size="sm"
							className="self-start sm:self-auto"
						>
							<RefreshCw
								className={`h-4 w-4 mr-2 ${isFetching ? "animate-spin" : ""}`}
							/>
							Refresh
						</Button>
					</div>
				</div>
			</div>

			<div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
				{/* Navigation Cards */}
				<div className="space-y-4">
					<h2 className="text-xl font-semibold">Explore</h2>
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
						{/* Check-in Counter Card */}
						<Card className="border-2">
							<CardHeader className="pb-3">
								<div className="flex items-center gap-3">
									<div className="p-2 bg-orange-100 rounded-lg">
										<UserCheck className="h-5 w-5 text-orange-600" />
									</div>
									<div className="flex-1">
										<CardTitle className="text-base">Check-ins</CardTitle>
									</div>
								</div>
							</CardHeader>
							<CardContent className="pt-0">
								{isLoading ? (
									<Skeleton className="h-8 w-16 mb-2" />
								) : (
									<div className="text-2xl font-bold text-primary mb-2">
										{totalCheckIns}
									</div>
								)}
								<CardDescription>Total participants checked in</CardDescription>
							</CardContent>
						</Card>

						{/* Resume Book Download Card */}
						<Card className="border-2">
							<CardHeader className="pb-3">
								<div className="flex items-center gap-3">
									<div className="p-2 bg-red-100 rounded-lg">
										<FileText className="h-5 w-5 text-red-600" />
									</div>
									<div className="flex-1">
										<CardTitle className="text-base">Resume Book</CardTitle>
									</div>
								</div>
							</CardHeader>
							<CardContent className="pt-0 space-y-3">
								<CardDescription>
									Download complete resume collection (ZIP)
								</CardDescription>
								<Button
									onClick={handleDownloadResumes}
									disabled={isDownloading}
									size="sm"
									className="w-full"
									variant={
										downloadProgress === "success" ? "default" : "outline"
									}
								>
									{isDownloading ? (
										<>
											<RefreshCw className="h-4 w-4 mr-2 animate-spin" />
											Preparing...
										</>
									) : downloadProgress === "success" ? (
										<>
											<Download className="h-4 w-4 mr-2" />
											Downloaded
										</>
									) : (
										<>
											<Download className="h-4 w-4 mr-2" />
											Download
										</>
									)}
								</Button>
							</CardContent>
						</Card>

						{/* Sponsor Scanner Card - Conditional */}
						{sponsorScannerFlag?.isEnabled && (
							<Card className="group hover:shadow-md transition-shadow cursor-pointer">
								<Link href="/scanner" className="block">
									<CardHeader className="pb-3">
										<div className="flex items-center gap-3">
											<div className="p-2 bg-yellow-100 rounded-lg">
												<QrCode className="h-5 w-5 text-yellow-600" />
											</div>
											<div className="flex-1">
												<CardTitle className="text-base">
													Booth Scanner
												</CardTitle>
											</div>
											<ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
										</div>
									</CardHeader>
									<CardContent className="pt-0">
										<CardDescription>
											Check participants into your sponsor booth
										</CardDescription>
									</CardContent>
								</Link>
							</Card>
						)}

						{/* Participant Directory */}
						<Card className="group hover:shadow-md transition-shadow cursor-pointer">
							<Link href="/participants" className="block">
								<CardHeader className="pb-3">
									<div className="flex items-center gap-3">
										<div className="p-2 bg-blue-100 rounded-lg">
											<Users className="h-5 w-5 text-blue-600" />
										</div>
										<div className="flex-1">
											<CardTitle className="text-base">
												Participant Directory
											</CardTitle>
										</div>
										<ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
									</div>
								</CardHeader>
								<CardContent className="pt-0">
									<CardDescription>
										Browse profiles and connect with talented participants
									</CardDescription>
								</CardContent>
							</Link>
						</Card>

						{/* Project Directory */}
						<Card className="group hover:shadow-md transition-shadow cursor-pointer">
							<Link href="/projects" className="block">
								<CardHeader className="pb-3">
									<div className="flex items-center gap-3">
										<div className="p-2 bg-green-100 rounded-lg">
											<FolderOpen className="h-5 w-5 text-green-600" />
										</div>
										<div className="flex-1">
											<CardTitle className="text-base">
												Project Directory
											</CardTitle>
										</div>
										<ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
									</div>
								</CardHeader>
								<CardContent className="pt-0">
									<CardDescription>
										Discover innovative projects and potential hires
									</CardDescription>
								</CardContent>
							</Link>
						</Card>

						{/* Event Schedule */}
						<Card className="group hover:shadow-md transition-shadow cursor-pointer">
							<Link href="/schedule" className="block">
								<CardHeader className="pb-3">
									<div className="flex items-center gap-3">
										<div className="p-2 bg-purple-100 rounded-lg">
											<Calendar className="h-5 w-5 text-purple-600" />
										</div>
										<div className="flex-1">
											<CardTitle className="text-base">
												Event Schedule
											</CardTitle>
										</div>
										<ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
									</div>
								</CardHeader>
								<CardContent className="pt-0">
									<CardDescription>
										View workshops, activities, and networking events
									</CardDescription>
								</CardContent>
							</Link>
						</Card>
					</div>
				</div>

				{/* Welcome Message */}
				<Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
					<CardContent className="pt-6">
						<div className="text-center space-y-2">
							<UserCheck className="h-8 w-8 text-blue-600 mx-auto" />
							<h3 className="font-semibold text-blue-900">
								Welcome to HackPSU {eventYear}!
							</h3>
							<p className="text-sm text-blue-700">
								Thank you for sponsoring our event. Use the navigation above to
								explore participants, projects, and connect with the next
								generation of innovators.
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

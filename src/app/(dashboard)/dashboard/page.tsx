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
} from "lucide-react";
import Link from "next/link";
import { useAllEvents, EventType } from "@/common/api/event";
import { useActiveHackathonForStatic } from "@/common/api/hackathon";
import { useAllScans } from "@/common/api/scan";

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

	const checkInEvent = events?.filter(
		(event) => event.type === EventType.checkIn
	);
	const totalCheckIns =
		scans?.filter((scan) => scan.eventId === checkInEvent?.[0]?.id).length || 0;

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
								Welcome to HackPSU 2024!
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

"use client";

import * as React from "react";
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { MultiSelect, type OptionType } from "@/components/ui/multi-select";
import { AlertTriangle, Trophy, Lightbulb } from "lucide-react";
import { useAllProjects } from "@/common/api/judging";

// --- MAIN COMPONENT ---

function ProjectsDirectory() {
	const { data: projects, isLoading, isError } = useAllProjects();
	const [selectedChallenges, setSelectedChallenges] = React.useState<string[]>(
		[]
	);

	const challengeOptions = React.useMemo((): OptionType[] => {
		if (!projects) return [];
		const allChallenges = new Set<string>();
		projects.forEach((project) => {
			if (project.categories) {
				project.categories.split(",").forEach((cat) => {
					const trimmedCat = cat.trim();
					if (trimmedCat) {
						allChallenges.add(trimmedCat);
					}
				});
			}
		});
		return Array.from(allChallenges)
			.sort()
			.map((challenge) => ({ label: challenge, value: challenge }));
	}, [projects]);

	const filteredProjects = React.useMemo(() => {
		if (!projects) return [];
		if (selectedChallenges.length === 0) return projects;

		return projects.filter((project) => {
			if (!project.categories) return false;
			const projectChallenges = project.categories
				.split(",")
				.map((c) => c.trim());
			return selectedChallenges.some((selected) =>
				projectChallenges.includes(selected)
			);
		});
	}, [projects, selectedChallenges]);

	return (
		<div className="bg-muted/30 text-foreground min-h-screen">
			<header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-10">
				<div className="container mx-auto px-4 py-4">
					<h1 className="text-2xl font-bold tracking-tight">
						Project Directory
					</h1>
					<p className="text-sm text-muted-foreground">
						Browse projects and see which challenges they entered.
					</p>
				</div>
			</header>

			<main className="container mx-auto px-4 py-8">
				<div className="max-w-sm mb-6">
					<Label htmlFor="challenge-filter" className="text-sm font-medium">
						Filter by Challenge
					</Label>
					<MultiSelect
						options={challengeOptions}
						selected={selectedChallenges}
						onChange={setSelectedChallenges}
						placeholder="Select challenges..."
						className="mt-1"
					/>
				</div>

				{isLoading ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{[...Array(6)].map((_, i) => (
							<Card key={i}>
								<CardHeader>
									<Skeleton className="h-5 w-3/4" />
								</CardHeader>
								<CardContent>
									<div className="flex flex-wrap gap-2">
										<Skeleton className="h-6 w-24 rounded-full" />
										<Skeleton className="h-6 w-28 rounded-full" />
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				) : isError ? (
					<div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-destructive/50 bg-destructive/10 py-12 text-center text-destructive">
						<AlertTriangle className="h-10 w-10" />
						<h3 className="mt-4 text-lg font-semibold">
							Failed to Load Projects
						</h3>
					</div>
				) : filteredProjects.length === 0 ? (
					<div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted bg-background py-12 text-center">
						<h3 className="text-lg font-semibold tracking-tight">
							No Projects Found
						</h3>
						<p className="text-sm text-muted-foreground">
							Try adjusting your filters.
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{filteredProjects.map((project) => (
							<Card key={project.id} className="flex flex-col">
								<CardHeader className="flex-grow">
									<div className="flex items-start gap-3">
										<Lightbulb className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
										<CardTitle className="text-base">{project.name}</CardTitle>
									</div>
								</CardHeader>
								<CardContent>
									<div className="flex flex-wrap gap-2">
										{project.categories ? (
											project.categories.split(",").map((cat) => (
												<Badge
													key={cat}
													variant="secondary"
													className="font-normal"
												>
													<Trophy className="h-3 w-3 mr-1.5" />
													{cat.trim()}
												</Badge>
											))
										) : (
											<Badge
												variant="outline"
												className="font-normal text-muted-foreground"
											>
												No challenges entered
											</Badge>
										)}
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				)}
			</main>
		</div>
	);
}

const queryClient = new QueryClient();
export default function ProjectsPageWrapper() {
	return <ProjectsDirectory />;
}

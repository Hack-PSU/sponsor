"use client";

import * as React from "react";
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Toaster } from "sonner";
import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import { useMediaQuery } from "@react-hook/media-query";
import {
	FilterIcon,
	XIcon,
	Mail,
	Phone,
	Globe,
	User,
	Shirt,
	Users,
	Utensils,
	AlertTriangle,
	Briefcase,
	Download,
	Search,
	FileX2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UserEntity, useAllUsers, useUserResume } from "@/common/api/user";

// --- SUB-COMPONENTS ---
const DetailItem = ({
	icon: Icon,
	label,
	value,
}: {
	icon: React.ElementType;
	label: string;
	value?: string | null;
}) => {
	if (!value) return null;
	return (
		<div className="flex items-start gap-3">
			<Icon className="h-4 w-4 flex-shrink-0 text-muted-foreground mt-1" />
			<div>
				<p className="text-sm font-medium text-foreground">{value}</p>
				<p className="text-xs text-muted-foreground">{label}</p>
			</div>
		</div>
	);
};

const ParticipantDetailHeader = ({ user }: { user: UserEntity }) => (
	<div className="flex items-center gap-4">
		<div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
			<User size={32} />
		</div>
		<div>
			<h2 className="text-2xl font-semibold leading-none tracking-tight">{`${user.firstName} ${user.lastName}`}</h2>
			<p className="text-sm text-muted-foreground">{`${user.major} at ${user.university}`}</p>
		</div>
	</div>
);

const ParticipantDetailContent = ({
	user,
	resumeUrl,
	isResumeLoading,
	isResumeError,
}: {
	user: UserEntity;
	resumeUrl: string | null;
	isResumeLoading: boolean;
	isResumeError: boolean;
}) => (
	<div className="p-6 space-y-8 overflow-y-auto">
		<div>
			<h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
				Contact & Personal Info
			</h3>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
				<DetailItem icon={Mail} label="Email" value={user.email} />
				<DetailItem icon={Phone} label="Phone" value={user.phone} />
				<DetailItem icon={Globe} label="Country" value={user.country} />
				<DetailItem icon={Users} label="Gender" value={user.gender} />
				<DetailItem icon={Shirt} label="Shirt Size" value={user.shirtSize} />
				<DetailItem icon={Briefcase} label="Race" value={user.race} />
				<DetailItem
					icon={Utensils}
					label="Dietary Restrictions"
					value={user.dietaryRestriction}
				/>
				<DetailItem
					icon={AlertTriangle}
					label="Allergies"
					value={user.allergies}
				/>
			</div>
		</div>
		<div>
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
					Resume
				</h3>
				{resumeUrl && (
					<Button variant="secondary" size="sm" asChild>
						<a
							href={resumeUrl}
							download={`${user.firstName}_${user.lastName}_Resume.pdf`}
						>
							<Download className="mr-2 h-4 w-4" />
							Download
						</a>
					</Button>
				)}
			</div>
			<div className="relative rounded-lg border bg-background min-h-[400px]">
				{!user.resume ? (
					<div className="flex flex-col items-center justify-center h-full text-center p-4">
						<FileX2 className="h-10 w-10 mb-3 text-muted-foreground" />
						<p className="font-semibold">No Resume Submitted</p>
						<p className="text-sm text-muted-foreground">
							This participant has not uploaded a resume.
						</p>
					</div>
				) : isResumeLoading ? (
					<div className="flex items-center justify-center h-full">
						<Skeleton className="w-full h-full" />
					</div>
				) : isResumeError ? (
					<div className="flex flex-col items-center justify-center h-full text-destructive p-4 text-center">
						<AlertTriangle className="h-10 w-10 mb-3" />
						<p className="font-semibold">Could not load resume</p>
						<p className="text-sm">Please try again later.</p>
					</div>
				) : resumeUrl ? (
					<iframe
						src={resumeUrl}
						className="w-full h-full rounded-md md:min-h-[400px]"
						title={`${user.firstName}'s Resume`}
					/>
				) : null}
			</div>
		</div>
	</div>
);

// --- MAIN COMPONENT ---
function ParticipantsDirectory() {
	const { data: users, isLoading, isError } = useAllUsers();
	const [selectedUser, setSelectedUser] = React.useState<UserEntity | null>(
		null
	);
	const [filters, setFilters] = React.useState({
		search: "",
		university: "all",
	});
	const isDesktop = useMediaQuery("(min-width: 1024px)");

	React.useEffect(() => {
		if (isDesktop && !selectedUser && users && users.length > 0) {
			setSelectedUser(users[0]);
		}
	}, [users, selectedUser, isDesktop]);

	const universities = React.useMemo(
		() =>
			users
				? [
						...new Set(users.map((user) => user.university).filter(Boolean)),
					].sort()
				: [],
		[users]
	);
	const filteredUsers = React.useMemo(
		() =>
			users
				? users.filter(
						(user) =>
							(filters.search === "" ||
								`${user.firstName} ${user.lastName}`
									.toLowerCase()
									.includes(filters.search.toLowerCase()) ||
								user.email
									.toLowerCase()
									.includes(filters.search.toLowerCase()) ||
								user.major
									.toLowerCase()
									.includes(filters.search.toLowerCase())) &&
							(filters.university === "all" ||
								user.university === filters.university)
					)
				: [],
		[users, filters]
	);

	React.useEffect(() => {
		if (
			isDesktop &&
			selectedUser &&
			!filteredUsers.find((u) => u.id === selectedUser.id)
		) {
			setSelectedUser(filteredUsers[0] || null);
		}
	}, [filteredUsers, selectedUser, isDesktop]);

	const {
		data: resumeBlob,
		isLoading: isResumeLoading,
		isError: isResumeError,
	} = useUserResume(selectedUser?.id || "");
	const [resumeUrl, setResumeUrl] = React.useState<string | null>(null);
	React.useEffect(() => {
		if (resumeBlob instanceof Blob) {
			const url = URL.createObjectURL(resumeBlob);
			setResumeUrl(url);
			return () => {
				URL.revokeObjectURL(url);
			};
		}
	}, [resumeBlob]);

	const participantList = (
		<div className="space-y-2">
			{isLoading ? (
				[...Array(8)].map((_, i) => (
					<div key={i} className="flex items-center gap-4 p-3 rounded-lg">
						<Skeleton className="h-10 w-10 rounded-full" />
						<div className="space-y-2">
							<Skeleton className="h-4 w-32" />
							<Skeleton className="h-3 w-24" />
						</div>
					</div>
				))
			) : isError ? (
				<div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-destructive/50 bg-destructive/10 py-12 text-center text-destructive">
					<AlertTriangle className="h-10 w-10" />
					<h3 className="mt-4 text-lg font-semibold">Failed to Load</h3>
				</div>
			) : filteredUsers.length === 0 ? (
				<div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted bg-background py-12 text-center">
					<h3 className="text-lg font-semibold tracking-tight">No Results</h3>
					<p className="text-sm text-muted-foreground">
						Try adjusting your search.
					</p>
				</div>
			) : (
				filteredUsers.map((user) => (
					<div
						key={user.id}
						onClick={() => setSelectedUser(user)}
						className={cn(
							"flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors",
							selectedUser?.id === user.id && !isDesktop
								? "bg-primary/20"
								: selectedUser?.id === user.id && isDesktop
									? "bg-background shadow-sm"
									: "hover:bg-background"
						)}
					>
						<div
							className={cn(
								"flex h-10 w-10 items-center justify-center rounded-full text-primary flex-shrink-0",
								selectedUser?.id === user.id && isDesktop
									? "bg-primary text-primary-foreground"
									: "bg-primary/10"
							)}
						>
							<User className="h-5 w-5" />
						</div>
						<div className="truncate">
							<p className="font-semibold text-sm truncate">{`${user.firstName} ${user.lastName}`}</p>
							<p className="text-xs text-muted-foreground truncate">
								{user.major}
							</p>
						</div>
					</div>
				))
			)}
		</div>
	);

	return (
		<div className="bg-muted/30 text-foreground min-h-screen">
			<Toaster position="top-center" richColors />
			<header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-10">
				<div className="container mx-auto px-4 py-4">
					<h1 className="text-2xl font-bold tracking-tight">
						Participant Directory
					</h1>
					<p className="text-sm text-muted-foreground">
						Discover and connect with talented individuals.
					</p>
				</div>
			</header>

			<main className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-start">
					<div className="lg:col-span-1 xl:col-span-1 space-y-6 lg:sticky lg:top-28">
						<div className="flex flex-col md:flex-row items-center gap-2">
							<div className="relative w-full">
								<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
								<Input
									placeholder="Search participants..."
									value={filters.search}
									onChange={(e) =>
										setFilters({ ...filters, search: e.target.value })
									}
									className="pl-9 bg-background"
								/>
							</div>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className="w-full md:w-auto bg-background flex-shrink-0"
									>
										<FilterIcon className="mr-2 h-4 w-4" />
										Filters
										{filters.university !== "all" && (
											<span className="ml-2 h-2 w-2 rounded-full bg-primary" />
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-72" align="end">
									<div className="space-y-4">
										<div className="space-y-1">
											<h4 className="font-medium leading-none">Filter By</h4>
											<p className="text-sm text-muted-foreground">
												Select filters to narrow results.
											</p>
										</div>
										<div className="grid gap-2">
											<div className="grid grid-cols-3 items-center gap-4">
												<Label htmlFor="university">University</Label>
												<Select
													value={filters.university}
													onValueChange={(value) =>
														setFilters({ ...filters, university: value })
													}
												>
													<SelectTrigger id="university" className="col-span-2">
														<SelectValue placeholder="Select University" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="all">
															All Universities
														</SelectItem>
														{universities.map((uni) => (
															<SelectItem key={uni} value={uni}>
																{uni}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</div>
										</div>
										{filters.university !== "all" && (
											<Button
												variant="ghost"
												size="sm"
												onClick={() =>
													setFilters({ ...filters, university: "all" })
												}
												className="w-full justify-center text-muted-foreground"
											>
												<XIcon className="mr-2 h-4 w-4" />
												Reset Filter
											</Button>
										)}
									</div>
								</PopoverContent>
							</Popover>
						</div>
						<div className="lg:h-[calc(100vh-17rem)] lg:overflow-y-auto lg:pr-2">
							{participantList}
						</div>
					</div>

					<div className="lg:col-span-2 xl:col-span-3">
						{isDesktop ? (
							!selectedUser ? (
								<Card className="h-[calc(100vh-12rem)] flex items-center justify-center border-2 border-dashed bg-background sticky top-28">
									<div className="text-center">
										<p className="text-lg font-medium">Select a Participant</p>
										<p className="text-sm text-muted-foreground">
											Their details will be displayed here.
										</p>
									</div>
								</Card>
							) : (
								<Card className="sticky top-28">
									<CardHeader className="p-6">
										<ParticipantDetailHeader user={selectedUser} />
									</CardHeader>
									<CardContent className="p-0">
										<ParticipantDetailContent
											user={selectedUser}
											resumeUrl={resumeUrl}
											isResumeLoading={isResumeLoading}
											isResumeError={isResumeError}
										/>
									</CardContent>
								</Card>
							)
						) : (
							<Drawer
								open={!!selectedUser}
								onOpenChange={(open) => !open && setSelectedUser(null)}
							>
								<DrawerContent>
									{selectedUser && (
										<>
											<DrawerHeader className="text-left p-6">
												<ParticipantDetailHeader user={selectedUser} />
											</DrawerHeader>
											<ParticipantDetailContent
												user={selectedUser}
												resumeUrl={resumeUrl}
												isResumeLoading={isResumeLoading}
												isResumeError={isResumeError}
											/>
										</>
									)}
								</DrawerContent>
							</Drawer>
						)}
					</div>
				</div>
			</main>
		</div>
	);
}

// --- WRAPPER WITH QUERY CLIENT PROVIDER ---
const queryClient = new QueryClient();
export default function ParticipantsPageWrapper() {
	return (
		<QueryClientProvider client={queryClient}>
			<ParticipantsDirectory />
		</QueryClientProvider>
	);
}

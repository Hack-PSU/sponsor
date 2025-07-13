"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Toaster } from "sonner";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
} from "@/components/ui/sheet";
import { MultiSelect } from "@/components/ui/multi-select";
import {
	FilterIcon,
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
	GraduationCap,
	BookOpen,
	Cake,
	Car,
	Shield,
} from "lucide-react";
import {
	RegistrationEntity,
	useAllRegistrations,
} from "@/common/api/registration";
import { UserEntity, useAllUsers, useUserResume } from "@/common/api/user";

type Participant = UserEntity &
	Omit<Partial<RegistrationEntity>, "id" | "userId">;

// --- SUB-COMPONENTS ---
const DetailItem = ({
	icon: Icon,
	label,
	value,
}: {
	icon: React.ElementType;
	label: string;
	value?: string | null | boolean | number;
}) => {
	if (value === null || value === undefined) return null;
	const displayValue =
		typeof value === "boolean" ? (value ? "Yes" : "No") : String(value);
	return (
		<div className="flex items-start gap-3">
			<Icon className="h-4 w-4 flex-shrink-0 text-muted-foreground mt-1" />
			<div>
				<p className="text-sm font-medium text-foreground">{displayValue}</p>
				<p className="text-xs text-muted-foreground">{label}</p>
			</div>
		</div>
	);
};

// --- MAIN COMPONENT ---
function ParticipantsDirectory() {
	const {
		data: users,
		isLoading: usersLoading,
		isError: usersError,
	} = useAllUsers();
	const {
		data: registrations,
		isLoading: regsLoading,
		isError: regsError,
	} = useAllRegistrations();

	const [selectedUser, setSelectedUser] = React.useState<Participant | null>(
		null
	);
	const [filters, setFilters] = React.useState({
		search: "",
		universities: [] as string[],
		majors: [] as string[],
		academicYears: [] as string[],
	});

	const participants = React.useMemo<Participant[]>(() => {
		if (!users || !registrations) return [];
		const registrationsMap = new Map(
			registrations.map((reg) => [reg.userId, reg])
		);
		return users.map((user) => {
			const registrationData = registrationsMap.get(user.id);
			const { id, userId, ...rest } = registrationData || {};
			return {
				...user,
				...rest,
			};
		});
	}, [users, registrations]);

	const { universityOptions, majorOptions, academicYearOptions } =
		React.useMemo(() => {
			if (!participants)
				return {
					universityOptions: [],
					majorOptions: [],
					academicYearOptions: [],
				};

			const toOptions = (key: keyof Participant) => {
				const uniqueOptions = new Map<
					string,
					{ label: string; value: string }
				>();
				for (const p of participants) {
					const originalValue = p[key] as string;
					if (originalValue && typeof originalValue === "string") {
						const trimmedValue = originalValue.trim();
						const normalizedValue = trimmedValue.toLowerCase();
						if (!uniqueOptions.has(normalizedValue)) {
							uniqueOptions.set(normalizedValue, {
								label: trimmedValue,
								value: normalizedValue,
							});
						}
					}
				}
				return Array.from(uniqueOptions.values()).sort((a, b) =>
					a.label.localeCompare(b.label)
				);
			};

			return {
				universityOptions: toOptions("university"),
				majorOptions: toOptions("major"),
				academicYearOptions: toOptions("academicYear"),
			};
		}, [participants]);

	const filteredParticipants = React.useMemo(
		() =>
			participants.filter((p) => {
				const searchLower = filters.search.toLowerCase().trim();
				const searchMatch =
					filters.search.trim() === "" ||
					`${p.firstName} ${p.lastName}`.toLowerCase().includes(searchLower) ||
					p.email.toLowerCase().includes(searchLower);

				const universityMatch =
					filters.universities.length === 0 ||
					(p.university &&
						filters.universities.includes(p.university.toLowerCase().trim()));

				const majorMatch =
					filters.majors.length === 0 ||
					(p.major && filters.majors.includes(p.major.toLowerCase().trim()));

				const yearMatch =
					filters.academicYears.length === 0 ||
					(p.academicYear &&
						filters.academicYears.includes(
							p.academicYear.toLowerCase().trim()
						));

				return searchMatch && universityMatch && majorMatch && yearMatch;
			}),
		[participants, filters]
	);

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
			return () => URL.revokeObjectURL(url);
		}
	}, [resumeBlob]);

	const isLoading = usersLoading || regsLoading;
	const isError = usersError || regsError;

	const activeFilterCount =
		(filters.search ? 1 : 0) +
		filters.universities.length +
		filters.majors.length +
		filters.academicYears.length;

	const resetFilters = () => {
		setFilters({ search: "", universities: [], majors: [], academicYears: [] });
	};

	return (
		<Sheet
			open={!!selectedUser}
			onOpenChange={(open) => !open && setSelectedUser(null)}
		>
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
					<div className="max-w-4xl mx-auto">
						<div className="flex flex-col md:flex-row items-center gap-2 mb-6">
							<div className="relative w-full">
								<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
								<Input
									placeholder="Search participants..."
									value={filters.search}
									onChange={(e) =>
										setFilters((prev) => ({ ...prev, search: e.target.value }))
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
										{activeFilterCount > 0 && (
											<span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
												{activeFilterCount}
											</span>
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-80" align="end">
									<div className="flex justify-between items-center mb-4">
										<h4 className="font-medium leading-none">Filter By</h4>
										{activeFilterCount > 0 && (
											<Button
												variant="ghost"
												size="sm"
												onClick={resetFilters}
												className="h-auto p-0 text-xs"
											>
												Reset Filters
											</Button>
										)}
									</div>
									<div className="grid gap-4">
										<div className="grid gap-2">
											<Label>University</Label>
											<MultiSelect
												options={universityOptions}
												selected={filters.universities}
												onChange={(selected) =>
													setFilters((prev) => ({
														...prev,
														universities: selected,
													}))
												}
												placeholder="Select universities..."
											/>
										</div>
										<div className="grid gap-2">
											<Label>Major</Label>
											<MultiSelect
												options={majorOptions}
												selected={filters.majors}
												onChange={(selected) =>
													setFilters((prev) => ({ ...prev, majors: selected }))
												}
												placeholder="Select majors..."
											/>
										</div>
										<div className="grid gap-2">
											<Label>Academic Year</Label>
											<MultiSelect
												options={academicYearOptions}
												selected={filters.academicYears}
												onChange={(selected) =>
													setFilters((prev) => ({
														...prev,
														academicYears: selected,
													}))
												}
												placeholder="Select years..."
											/>
										</div>
									</div>
								</PopoverContent>
							</Popover>
						</div>

						<div className="space-y-2">
							{isLoading ? (
								[...Array(8)].map((_, i) => (
									<div
										key={i}
										className="flex items-center gap-4 p-3 rounded-lg bg-background shadow-sm"
									>
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
									<h3 className="mt-4 text-lg font-semibold">
										Failed to Load Data
									</h3>
								</div>
							) : filteredParticipants.length === 0 ? (
								<div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted bg-background py-12 text-center">
									<h3 className="text-lg font-semibold tracking-tight">
										No Results Found
									</h3>
									<p className="text-sm text-muted-foreground">
										Try adjusting your search or filters.
									</p>
								</div>
							) : (
								filteredParticipants.map((p) => (
									<div
										key={p.id}
										onClick={() => setSelectedUser(p)}
										className="flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors bg-background hover:bg-muted shadow-sm"
									>
										<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
											<User className="h-5 w-5" />
										</div>
										<div className="truncate">
											<p className="font-semibold text-sm truncate">{`${p.firstName} ${p.lastName}`}</p>
											<p className="text-xs text-muted-foreground truncate">
												{p.major}
											</p>
										</div>
									</div>
								))
							)}
						</div>
					</div>
				</main>
			</div>

			<SheetContent className="w-full sm:max-w-2xl lg:max-w-3xl flex flex-col p-0">
				{selectedUser && (
					<>
						<SheetHeader className="p-6 pb-4 border-b">
							<div className="flex items-center gap-4">
								<div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
									<User size={32} />
								</div>
								<div>
									<SheetTitle className="text-2xl">{`${selectedUser.firstName} ${selectedUser.lastName}`}</SheetTitle>
									<SheetDescription>{`${selectedUser.major} at ${selectedUser.university}`}</SheetDescription>
								</div>
							</div>
						</SheetHeader>
						<div className="flex-1 overflow-y-auto p-6 pt-4 space-y-8">
							<div>
								<h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
									Registration Details
								</h3>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
									<DetailItem
										icon={GraduationCap}
										label="Academic Year"
										value={selectedUser.academicYear}
									/>
									<DetailItem
										icon={BookOpen}
										label="Coding Experience"
										value={selectedUser.codingExperience}
									/>
									<DetailItem
										icon={Users}
										label="First Hackathon"
										value={selectedUser.firstHackathon}
									/>
									<DetailItem
										icon={Cake}
										label="Age"
										value={selectedUser.age}
									/>
									<DetailItem
										icon={Car}
										label="Travel Reimbursement"
										value={selectedUser.travelReimbursement}
									/>
									<DetailItem
										icon={Shield}
										label="Veteran"
										value={selectedUser.veteran}
									/>
								</div>
							</div>
							<div>
								<h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
									Contact & Personal Info
								</h3>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
									<DetailItem
										icon={Mail}
										label="Email"
										value={selectedUser.email}
									/>
									<DetailItem
										icon={Phone}
										label="Phone"
										value={selectedUser.phone}
									/>
									<DetailItem
										icon={Globe}
										label="Country"
										value={selectedUser.country}
									/>
									<DetailItem
										icon={Users}
										label="Gender"
										value={selectedUser.gender}
									/>
									<DetailItem
										icon={Shirt}
										label="Shirt Size"
										value={selectedUser.shirtSize}
									/>
									<DetailItem
										icon={Briefcase}
										label="Race"
										value={selectedUser.race}
									/>
									<DetailItem
										icon={Utensils}
										label="Dietary Restrictions"
										value={selectedUser.dietaryRestriction}
									/>
									<DetailItem
										icon={AlertTriangle}
										label="Allergies"
										value={selectedUser.allergies}
									/>
								</div>
							</div>
							<div className="flex flex-col h-full">
								<div className="flex justify-between items-center mb-4">
									<h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
										Resume
									</h3>
									{resumeUrl && (
										<Button variant="secondary" size="sm" asChild>
											<a
												href={resumeUrl}
												download={`${selectedUser.firstName}_${selectedUser.lastName}_Resume.pdf`}
											>
												<Download className="mr-2 h-4 w-4" />
												Download
											</a>
										</Button>
									)}
								</div>
								<div className="relative rounded-lg border bg-background flex-1 min-h-[50vh]">
									{!selectedUser.resume ? (
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
											className="w-full h-full rounded-md"
											title={`${selectedUser.firstName}'s Resume`}
										/>
									) : null}
								</div>
							</div>
						</div>
					</>
				)}
			</SheetContent>
		</Sheet>
	);
}

export default function ParticipantsPageWrapper() {
	return <ParticipantsDirectory />;
}

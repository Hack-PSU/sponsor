import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const tiers = [
	{
		name: "Bronze",
		price: "$1,500",
		color: "bg-orange-100/50 dark:bg-orange-900/20",
	},
	{
		name: "Silver",
		price: "$3,000",
		color: "bg-slate-200/50 dark:bg-slate-700/20",
	},
	{
		name: "Gold",
		price: "$5,000",
		color: "bg-amber-100/50 dark:bg-amber-900/20",
	},
	{
		name: "Platinum",
		price: "$8,000",
		color: "bg-sky-100/50 dark:bg-sky-900/20",
	},
];


const perks = {
	BRANDING: [
		{
			name: "Logos on all Platforms",
			values: ["Small", "Medium", "Large", "Large"],
		},
		{
			name: "Logos on T-Shirts",
			values: ["Small", "Medium", "Large", "Large"],
		},
		{
			name: "Distribution of Promotional Material",
			values: [true, true, true, true],
		},
		{
			name: "Spotlight Post Event Signage",
			values: [false, false, true, true],
		},
		{ name: "Promo Email Pre-Event", values: [false, false, false, true] },
	],
	RECRUITMENT: [
		{ name: "Access to Resume Book", values: [true, true, true, true] },
		{ name: "Send Mentors", values: [true, true, true, true] },
	],
	ENGAGEMENT: [
		{ name: "Company Table", values: [true, true, true, true] },
		{ name: "Host a Workshop", values: [false, true, true, true] },
		{
			name: "Present at Opening Ceremony",
			values: [false, false, "2 mins", "5 mins"],
		},
		{ name: "Sponsor a Challenge", values: [false, false, true, true] },
		{
			name: "Present Challenge and Prizes",
			values: [false, false, true, true],
		},
		{ name: "Keynote Speaker", values: [false, false, false, true] },
	],
};

const addOns = [
	{ name: "Sponsored Dinner", price: "$2,500" },
	{ name: "Host a Challenge", price: "$2,000" },
	{ name: "Sponsored Lunch", price: "$2,000" },
	{ name: "Host a Workshop", price: "$1,750" },
	{ name: "Keynote Speaker", price: "$1,250" },
	{ name: "Ice-cream Social", price: "$600" },
	{ name: "Sponsored Snack", price: "$400" },
];

const PerkCell = ({ value }: { value: string | boolean }) => {
	if (value === true) {
		return <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />;
	}
	if (value === false) {
		return <span className="text-muted-foreground">-</span>;
	}
	return <span className="font-medium">{value}</span>;
};

export function SponsorshipTiers() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-4xl font-bold">
					Sponsorship Packages
				</CardTitle>
				<CardDescription>
					Choose the package that best fits your company's goals. All packages
					are customizable.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[250px] sticky left-0 bg-background">
									Perks
								</TableHead>
								{tiers.map((tier) => (
									<TableHead
										key={tier.name}
										className={cn("text-center", tier.color)}
									>
										<div className="text-lg font-bold">{tier.name}</div>
										<div className="text-sm text-muted-foreground">
										    {tier.price}
										</div>
									</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{Object.entries(perks).map(([category, perkList]) => (
								<>
									<TableRow key={category}>
										<TableCell
											colSpan={tiers.length + 1}
											className="font-bold bg-muted/50 text-primary sticky left-0"
										>
											{category}
										</TableCell>
									</TableRow>
									{perkList.map((perk) => (
										<TableRow key={perk.name}>
											<TableCell className="sticky left-0 bg-background">
												{perk.name}
											</TableCell>
											{perk.values.map((value, index) => (
												<TableCell
													key={index}
													className={cn("text-center", tiers[index].color)}
												>
													<PerkCell value={value} />
												</TableCell>
											))}
										</TableRow>
									))}
								</>
							))}
						</TableBody>
					</Table>
				</div>
				<Separator className="my-8" />
				<div>
					<h3 className="text-2xl font-bold text-center mb-6">
						A La Carte Add-ons
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{addOns.map((addOn) => (
							<div
								key={addOn.name}
								className="flex items-center justify-between p-4 border rounded-lg"
							>
								<span className="font-medium">{addOn.name}</span>
								<span className="text-primary font-semibold">
									{addOn.price}
								</span>
							</div>
						))}
					</div>
					<div className="text-sm text-muted-foreground text-center mt-4">
						<h3>Prices May Vary</h3>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
	Menu,
	Home,
	Users,
	FolderOpen,
	Calendar,
	User,
	LogOut,
	X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useFirebase } from "@/common/context/FirebaseProvider";

const navigationItems = [
	{
		name: "Dashboard",
		href: "/dashboard",
		icon: Home,
	},
	{
		name: "Participants",
		href: "/participants",
		icon: Users,
	},
	{
		name: "Projects",
		href: "/projects",
		icon: FolderOpen,
	},
	{
		name: "Schedule",
		href: "/schedule",
		icon: Calendar,
	},
	// {
	// 	name: "Profile",
	// 	href: "/profile",
	// 	icon: User,
	// },
];

export function DashboardNavbar() {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();
	const router = useRouter();
	const { logout } = useFirebase();

	const handleLogout = () => {
		logout()
			.then(() => {
				router.replace("/");
			})
			.catch((error) => {
				console.error("Logout failed:", error);
			});
	};

	const isActiveLink = (href: string) => {
		if (href === "/dashboard") {
			return pathname === "/dashboard" || pathname === "/";
		}
		return pathname.startsWith(href);
	};

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 items-center justify-between px-4">
				{/* Logo */}
				<Link href="/dashboard" className="flex items-center space-x-2">
					<Image src="/logo.png" alt="HackPSU Logo" width={32} height={32} />
					<span className="font-bold text-lg">HackPSU</span>
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center space-x-6">
					{navigationItems.map((item) => {
						const Icon = item.icon;
						return (
							<Link
								key={item.name}
								href={item.href}
								className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary ${
									isActiveLink(item.href)
										? "text-primary"
										: "text-muted-foreground"
								}`}
							>
								<Icon className="h-4 w-4" />
								<span>{item.name}</span>
							</Link>
						);
					})}
				</nav>

				{/* Desktop Logout Button */}
				<Button
					onClick={handleLogout}
					variant="outline"
					size="sm"
					className="hidden md:flex items-center space-x-2 bg-transparent"
				>
					<LogOut className="h-4 w-4" />
					<span>Logout</span>
				</Button>

				{/* Mobile Menu */}
				<Sheet open={isOpen} onOpenChange={setIsOpen}>
					<SheetTrigger asChild>
						<Button variant="ghost" size="sm" className="md:hidden">
							<Menu className="h-5 w-5" />
							<span className="sr-only">Toggle menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="right" className="w-[300px] sm:w-[400px]">
						<div className="flex flex-col h-full">
							{/* Mobile Header */}
							<div className="flex items-center justify-between pb-4 border-b">
								<div className="flex items-center space-x-2">
									<Image
										src="/logo.png"
										alt="HackPSU Logo"
										width={24}
										height={24}
									/>
									<span className="font-bold">HackPSU Portal</span>
								</div>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => setIsOpen(false)}
								>
									<X className="h-4 w-4" />
								</Button>
							</div>

							{/* Mobile Navigation */}
							<nav className="flex-1 py-6">
								<div className="space-y-2">
									{navigationItems.map((item) => {
										const Icon = item.icon;
										return (
											<Link
												key={item.name}
												href={item.href}
												onClick={() => setIsOpen(false)}
												className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
													isActiveLink(item.href)
														? "bg-primary/10 text-primary"
														: "text-muted-foreground hover:text-foreground hover:bg-muted"
												}`}
											>
												<Icon className="h-5 w-5" />
												<span>{item.name}</span>
											</Link>
										);
									})}
								</div>
							</nav>

							{/* Mobile Logout */}
							<div className="border-t pt-4">
								<Button
									onClick={() => {
										handleLogout();
										setIsOpen(false);
									}}
									variant="outline"
									className="w-full flex items-center justify-center space-x-2"
								>
									<LogOut className="h-4 w-4" />
									<span>Logout</span>
								</Button>
							</div>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
}

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export function Navbar() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 items-center">
				<Link href="/" className="mr-6 flex items-center space-x-2">
					<Image src="/logo.png" alt="HackPSU Logo" width={40} height={40} />
					<span className="hidden font-bold sm:inline-block">HackPSU</span>
				</Link>
				<nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
					<Link
						href="/participants"
						className="text-foreground/60 transition-colors hover:text-foreground/80"
					>
						Participants
					</Link>
					<Link
						href="/#tiers"
						className="text-foreground/60 transition-colors hover:text-foreground/80"
					>
						Tiers
					</Link>
					<Link
						href="/#why-sponsor"
						className="text-foreground/60 transition-colors hover:text-foreground/80"
					>
						Why Sponsor?
					</Link>
					<Link
						href="https://hackpsu.org"
						target="_blank"
						rel="noopener noreferrer"
						className="hidden items-center text-foreground/60 transition-colors hover:text-foreground/80 lg:flex"
					>
						Main Site
						<ArrowUpRight className="ml-1 h-4 w-4" />
					</Link>
				</nav>
				<div className="flex items-center justify-end space-x-4">
					<Button
						asChild
						className="bg-gradient-to-b from-primary via-primary to-orange-600 shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/40"
					>
						<Link href="/#contact">Become a Sponsor</Link>
					</Button>
				</div>
			</div>
		</header>
	);
}

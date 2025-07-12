import Link from "next/link";
import Image from "next/image";
import {
	Twitter,
	Instagram,
	Facebook,
	Linkedin,
	ArrowUpRight,
} from "lucide-react";

export function Footer() {
	return (
		<footer className="bg-primary text-primary-foreground">
			<div className="container mx-auto px-4 md:px-6 py-12">
				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
					<div className="flex flex-col items-start">
						<Link href="/" className="flex items-center gap-2 mb-4">
							<Image
								src="/logo.png"
								alt="HackPSU Logo"
								width={50}
								height={50}
								className="bg-white rounded-md p-1"
							/>
							<span className="text-xl font-bold">HackPSU</span>
						</Link>
						<p className="text-primary-foreground/70">
							Empowering the next generation of innovators.
						</p>
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-4">Quick Links</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="#"
									className="text-primary-foreground/70 hover:text-primary-foreground"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									href="#tiers"
									className="text-primary-foreground/70 hover:text-primary-foreground"
								>
									Sponsorship Tiers
								</Link>
							</li>
							<li>
								<Link
									href="#why-sponsor"
									className="text-primary-foreground/70 hover:text-primary-foreground"
								>
									Why Sponsor?
								</Link>
							</li>
							<li>
								<Link
									href="https://hackpsu.org"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center text-primary-foreground/70 hover:text-primary-foreground"
								>
									Main Site
									<ArrowUpRight className="ml-1 h-4 w-4" />
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-4">Contact</h3>
						<ul className="space-y-2 text-primary-foreground/70">
							<li>
								Email:{" "}
								<a
									href="mailto:sponsorship@hackpsu.org"
									className="hover:text-primary-foreground"
								>
									sponsorship@hackpsu.org
								</a>
							</li>
							<li>State College, PA</li>
						</ul>
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-4">Follow Us</h3>
						<div className="flex space-x-4">
							<Link
								href="#"
								className="text-primary-foreground/70 hover:text-primary-foreground"
							>
								<Twitter />
							</Link>
							<Link
								href="#"
								className="text-primary-foreground/70 hover:text-primary-foreground"
							>
								<Instagram />
							</Link>
							<Link
								href="#"
								className="text-primary-foreground/70 hover:text-primary-foreground"
							>
								<Facebook />
							</Link>
							<Link
								href="#"
								className="text-primary-foreground/70 hover:text-primary-foreground"
							>
								<Linkedin />
							</Link>
						</div>
					</div>
				</div>
				<div className="mt-8 border-t border-primary-foreground/20 pt-6 text-center text-sm text-primary-foreground/70">
					<p>&copy; {new Date().getFullYear()} HackPSU. All Rights Reserved.</p>
				</div>
			</div>
		</footer>
	);
}

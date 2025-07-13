import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Users,
	Lightbulb,
	School,
	Award,
	Download,
	Mail,
	Target,
	Briefcase,
	Megaphone,
	TestTube2,
} from "lucide-react";
import Link from "next/link";
import { SponsorshipTiers } from "@/components/sponsorship-tiers";
import { Testimonials } from "@/components/testimonials";
import { PhotoGallery } from "@/components/photo-gallery";
import { PastSponsors } from "@/components/past-sponsors";
import { ContactForm } from "@/components/contact-form";

export default function SponsorsPage() {
	return (
		<div className="bg-background text-foreground">
			<main>
				{/* Hero Section */}
				<section id="hero" className="py-20 md:py-32 bg-muted/20">
					<div className="container mx-auto px-4 md:px-6 text-center">
						<h1 className="text-4xl md:text-6xl font-bold tracking-tight text-accent">
							Partner with HackPSU
						</h1>
						<p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
							Join our decade-long tradition of empowering student innovation at
							Penn State's largest hackathon.
						</p>
						<div className="mt-8 flex justify-center gap-4">
							<Button
								asChild
								size="lg"
								className="bg-gradient-to-b from-primary via-primary to-orange-600 shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/40"
							>
								<Link href="#contact">Become a Sponsor</Link>
							</Button>
							<Button asChild size="lg" variant="outline">
								<Link href="HackPSU_Sponsorship_Packet.pdf" download>
									<Download className="mr-2 h-5 w-5" />
									Download Prospectus
								</Link>
							</Button>
						</div>
					</div>
				</section>

				{/* Statistics Section */}
				<section id="statistics" className="py-16 md:py-24">
					<div className="container mx-auto px-4 md:px-6">
						<h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-accent">
							A Legacy of Innovation
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
							<Card className="text-center">
								<CardHeader>
									<div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
										<Award className="h-8 w-8 text-primary" />
									</div>
									<CardTitle className="mt-4 text-4xl font-bold">10+</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">Years of Hackathons</p>
								</CardContent>
							</Card>
							<Card className="text-center">
								<CardHeader>
									<div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
										<Users className="h-8 w-8 text-primary" />
									</div>
									<CardTitle className="mt-4 text-4xl font-bold">
										5,000+
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">Passionate Students</p>
								</CardContent>
							</Card>
							<Card className="text-center">
								<CardHeader>
									<div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
										<School className="h-8 w-8 text-primary" />
									</div>
									<CardTitle className="mt-4 text-4xl font-bold">40+</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">
										Universities Represented
									</p>
								</CardContent>
							</Card>
							<Card className="text-center">
								<CardHeader>
									<div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
										<Lightbulb className="h-8 w-8 text-primary" />
									</div>
									<CardTitle className="mt-4 text-4xl font-bold">20</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">Hackathons Hosted</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>

				{/* Sponsorship Tiers Section */}
				<section id="tiers" className="py-16 md:py-24 bg-muted/20">
					<div className="container mx-auto px-4 md:px-6">
						<SponsorshipTiers />
					</div>
				</section>

				{/* Why Sponsor Section */}
				<section id="why-sponsor" className="py-16 md:py-24">
					<div className="container mx-auto px-4 md:px-6">
						<h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-accent">
							Why Sponsor HackPSU?
						</h2>
						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
							<Card>
								<CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
									<div className="bg-primary/10 p-3 rounded-full">
										<Target className="h-6 w-6 text-primary" />
									</div>
									<CardTitle>Recruit Talent</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">
										Interact with hundreds of top students in person and get
										access to their resumes.
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
									<div className="bg-primary/10 p-3 rounded-full">
										<Megaphone className="h-6 w-6 text-primary" />
									</div>
									<CardTitle>Showcase Products</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">
										Display your technology to the next generation of
										developers, leaders, and consumers.
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
									<div className="bg-primary/10 p-3 rounded-full">
										<Briefcase className="h-6 w-6 text-primary" />
									</div>
									<CardTitle>Get Feedback</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">
										Observe how developers use your tech in their projects
										through challenges and workshops.
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
									<div className="bg-primary/10 p-3 rounded-full">
										<TestTube2 className="h-6 w-6 text-primary" />
									</div>
									<CardTitle>Drive Innovation</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">
										Present a challenge to prototype, validate, or expand on
										your company's latest initiatives.
									</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>

				{/* Testimonials Section */}

				{/* 				<section id="testimonials" className="py-16 md:py-24 bg-muted/20">
					<div className="container mx-auto px-4 md:px-6">
						<h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-accent">
							What Our Sponsors Say
						</h2>
						<Testimonials />
					</div>
				</section> */}

				{/* Past Sponsors Section */}
				<section id="past-sponsors" className="py-16 md:py-24">
					<div className="container mx-auto px-4 md:px-6">
						<h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-accent">
							Our Past Partners
						</h2>
						<PastSponsors />
					</div>
				</section>

				{/* Photo Gallery Section */}
				<section id="gallery" className="py-16 md:py-24 bg-muted/20">
					<div className="container mx-auto px-4 md:px-6">
						<h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-accent">
							Moments From Past Events
						</h2>
						<PhotoGallery />
					</div>
				</section>

				{/* Prospectus Section */}
				<section id="prospectus" className="py-16 md:py-24">
					<div className="container mx-auto px-4 md:px-6">
						<div className="bg-accent text-accent-foreground rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
							<div className="text-center md:text-left">
								<h2 className="text-3xl md:text-4xl font-bold">
									View the Full Packet
								</h2>
								<p className="mt-2 text-lg text-accent-foreground/80">
									Download our sponsorship prospectus for even more detail on
									our packages and benefits.
								</p>
							</div>
							<Button
								asChild
								size="lg"
								variant="secondary"
								className="flex-shrink-0 bg-white text-accent hover:bg-white/90"
							>
								<Link href="/HackPSU_Sponsorship_Packet.pdf" download>
									<Download className="mr-2 h-5 w-5" />
									Download Prospectus
								</Link>
							</Button>
						</div>
					</div>
				</section>

				{/* Contact Form Section */}
				<section id="contact" className="py-16 md:py-24 bg-muted/20">
					<div className="container mx-auto px-4 md:px-6">
						<div className="max-w-2xl mx-auto">
							<h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-accent">
								Get in Touch
							</h2>
							<p className="text-muted-foreground text-center mb-12">
								Have questions or want to discuss a custom partnership? We'd
								love to hear from you.
							</p>
							<ContactForm />
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	CheckCircle,
	MapPin,
	Clock,
	Users,
	Calendar,
	Gift,
	MessageSquare,
	Trophy,
	Presentation,
	Car,
	Mail,
	Phone,
	ExternalLink,
} from "lucide-react";
import Link from "next/link";

export default function OnboardingPage() {
	return (
		<div className="container mx-auto px-4 py-8 max-w-5xl">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-3xl md:text-4xl font-bold text-accent mb-4">
					Sponsor Onboarding Packet
				</h1>
				<div className="flex items-center gap-4 text-muted-foreground">
					<Badge variant="secondary" className="text-lg px-3 py-1">
						HackPSU Spring 2025
					</Badge>
				</div>
			</div>

			{/* Table of Contents */}
			<Card className="mb-8">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<CheckCircle className="h-5 w-5" />
						Table of Contents
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Link
								href="#getting-started"
								className="block hover:text-primary"
							>
								• Getting Started
							</Link>
							<Link
								href="#create-challenge"
								className="block hover:text-primary"
							>
								• Create a Challenge
							</Link>
							<Link href="#workshop-setup" className="block hover:text-primary">
								• Workshop Setup
							</Link>
							<Link href="#event-schedule" className="block hover:text-primary">
								• Event Schedule
							</Link>
						</div>
						<div className="space-y-2">
							<Link href="#discord-setup" className="block hover:text-primary">
								• Discord Setup
							</Link>
							<Link
								href="#things-to-bring"
								className="block hover:text-primary"
							>
								• Things to Bring
							</Link>
							<Link href="#places-to-stay" className="block hover:text-primary">
								• Places to Stay
							</Link>
							<Link href="#day-of-event" className="block hover:text-primary">
								• Day of the Event
							</Link>
							<Link href="#post-event" className="block hover:text-primary">
								• Post Event
							</Link>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Getting Started */}
			<Card className="mb-8" id="getting-started">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Users className="h-5 w-5" />
						Getting Started
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-muted-foreground leading-relaxed">
						Congratulations! On behalf of the HackPSU Sponsorship team, I want
						to thank you for sponsoring our event. We're excited to host you
						while you network, build, and share ideas with our participants. Our
						event is centered around fostering a productive and collaborative
						tech community, and we can't wait for you to see this first-hand.
					</p>
					<p className="text-muted-foreground leading-relaxed">
						There are a few key things we want you to be aware of prior to the
						event, so while it is a lengthy packet, it is very important. Please
						send this to all representatives attending the event!
					</p>
					<p className="text-muted-foreground leading-relaxed">
						We are very thankful for your organization's support as our Spring
						2025 Hackathon wouldn't be possible without it. We look forward to
						seeing you at the Business Building at pretty much the coolest event
						ever!
					</p>
					<div className="bg-muted/50 p-4 rounded-lg">
						<p className="font-medium">Best regards,</p>
						<p className="text-muted-foreground">Sakshi Jain</p>
					</div>
				</CardContent>
			</Card>

			{/* Create a Challenge */}
			<Card className="mb-8" id="create-challenge">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Trophy className="h-5 w-5" />
						Create a Challenge
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-muted-foreground leading-relaxed">
						Challenges are a unique opportunity for your company to discover
						talent as well as showcase your organization's mission and
						technology. A challenge's prompt should be intriguing and inclusive
						enough to encourage widespread participation. We encourage providing
						competitive prizes for hackers to incentivize participation.
					</p>
					<div>
						<h4 className="font-semibold mb-3">Past Examples</h4>
						<div className="space-y-3">
							<div className="border-l-4 border-primary pl-4">
								<p className="font-medium">Nittany AI Alliance</p>
								<p className="text-muted-foreground text-sm">
									Develop an AI-based solution to a real-world problem at Penn
									State, either to improve the student experience or University
									operations.
								</p>
							</div>
							<div className="border-l-4 border-primary pl-4">
								<p className="font-medium">AccuWeather</p>
								<p className="text-muted-foreground text-sm">
									Design a unique user experience using AccuWeather APIs.
								</p>
							</div>
							<div className="border-l-4 border-primary pl-4">
								<p className="font-medium">Capital One</p>
								<p className="text-muted-foreground text-sm">
									Financial challenge based on how students could reimagine
									banking.
								</p>
							</div>
							<div className="border-l-4 border-primary pl-4">
								<p className="font-medium">GM</p>
								<p className="text-muted-foreground text-sm">
									Create a system or feature to demonstrate and/or improve the
									utility of semi-autonomous or fully autonomous vehicles
									utilizing the RC car(s) that GM has provided.
								</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Workshop Setup */}
			<Card className="mb-8" id="workshop-setup">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Presentation className="h-5 w-5" />
						Workshop Setup
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-muted-foreground leading-relaxed">
						Each workshop lasts 60 minutes and can be about any topic that your
						organization is a leader in or a particular representative from your
						organization is passionate about.
					</p>
					<div>
						<h4 className="font-semibold mb-3">Past Workshop Topics</h4>
						<div className="grid md:grid-cols-2 gap-2">
							<Badge variant="outline">Cybersecurity</Badge>
							<Badge variant="outline">Machine Learning</Badge>
							<Badge variant="outline">Data Science</Badge>
							<Badge variant="outline">Blockchain</Badge>
							<Badge variant="outline">Cloud Software</Badge>
							<Badge variant="outline">...and more!</Badge>
						</div>
					</div>
					<div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
						<p className="text-sm">
							<strong>Note:</strong> Please let us know as soon as you can about
							your workshop topic and feel free to email any questions to{" "}
							<Link
								href="mailto:education@hackpsu.org"
								className="text-primary hover:underline"
							>
								education@hackpsu.org
							</Link>
						</p>
					</div>
				</CardContent>
			</Card>

			{/* Event Schedule */}
			<Card className="mb-8" id="event-schedule">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Calendar className="h-5 w-5" />
						Event Schedule
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid md:grid-cols-2 gap-6">
						<div>
							<h4 className="font-semibold mb-4 text-lg">Saturday</h4>
							<div className="space-y-3">
								<div className="flex items-center gap-3">
									<Badge variant="secondary" className="min-w-fit">
										9-11 AM
									</Badge>
									<span className="text-sm">Come and set up your table</span>
								</div>
								<div className="flex items-center gap-3">
									<Badge variant="secondary" className="min-w-fit">
										11 AM
									</Badge>
									<span className="text-sm">
										Participant Registration Opens
									</span>
								</div>
								<div className="flex items-center gap-3">
									<Badge variant="secondary" className="min-w-fit">
										12 PM
									</Badge>
									<span className="text-sm">Opening Ceremony</span>
								</div>
								<div className="flex items-center gap-3">
									<Badge variant="secondary" className="min-w-fit">
										1 PM
									</Badge>
									<span className="text-sm">Lunch</span>
								</div>
								<div className="flex items-center gap-3">
									<Badge variant="secondary" className="min-w-fit">
										2 PM
									</Badge>
									<span className="text-sm font-medium">Hacking Begins</span>
								</div>
								<div className="flex items-center gap-3">
									<Badge variant="secondary" className="min-w-fit">
										7 PM
									</Badge>
									<span className="text-sm">Dinner</span>
								</div>
							</div>
						</div>
						<div>
							<h4 className="font-semibold mb-4 text-lg">Sunday</h4>
							<div className="space-y-3">
								<div className="flex items-center gap-3">
									<Badge variant="secondary" className="min-w-fit">
										12 AM
									</Badge>
									<span className="text-sm">Midnight Snack</span>
								</div>
								<div className="flex items-center gap-3">
									<Badge variant="secondary" className="min-w-fit">
										10 AM
									</Badge>
									<span className="text-sm">Brunch</span>
								</div>
								<div className="flex items-center gap-3">
									<Badge variant="secondary" className="min-w-fit">
										2 PM
									</Badge>
									<span className="text-sm font-medium">
										Hacking Ends and Judging Expo
									</span>
								</div>
								<div className="flex items-center gap-3">
									<Badge variant="secondary" className="min-w-fit">
										4:30 PM
									</Badge>
									<span className="text-sm">Closing Ceremony</span>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Discord Setup */}
			<Card className="mb-8" id="discord-setup">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<MessageSquare className="h-5 w-5" />
						Discord Setup
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 p-4 rounded-lg border">
						<p className="font-medium mb-2">Join our Discord server:</p>
						<Link
							href="https://discord.hackpsu.org"
							className="inline-flex items-center gap-2 text-primary hover:underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							discord.hackpsu.org
							<ExternalLink className="h-4 w-4" />
						</Link>
					</div>
					<div className="space-y-3">
						<div>
							<h4 className="font-semibold mb-2">Making Announcements</h4>
							<p className="text-muted-foreground text-sm mb-2">
								For general announcements, post in <code>#sponsor-info</code>{" "}
								and add <code>@everyone</code> at the end of your message.
							</p>
						</div>
						<div>
							<h4 className="font-semibold mb-2">Event-Specific Information</h4>
							<p className="text-muted-foreground text-sm mb-2">
								Find your organization's channel under the "SPONSORS" category.
								For event notifications, add{" "}
								<code>&lt;@&amp;1201885067639783517&gt;</code> or{" "}
								<code>@Entertainment Notifications</code> to your message.
							</p>
						</div>
						<div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded border border-yellow-200 dark:border-yellow-800">
							<p className="text-sm">
								<strong>Need help?</strong> Contact Dylan at{" "}
								<Link
									href="mailto:communication@hackpsu.org"
									className="text-primary hover:underline"
								>
									communication@hackpsu.org
								</Link>{" "}
								or send them a direct message on Discord.
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Things to Bring */}
			<Card className="mb-8" id="things-to-bring">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Gift className="h-5 w-5" />
						Things to Bring
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-muted-foreground leading-relaxed">
						Many companies come to HackPSU to participate in the incredible
						recruiting opportunity it has to offer. One great way to capture the
						attention of college students is with branded materials or little
						gadgets. Also, please bring a company banner, backdrop, etc. for our
						participants to identify your table.
					</p>
					<div>
						<h4 className="font-semibold mb-3">Popular Giveaway Items</h4>
						<div className="grid md:grid-cols-3 gap-2">
							<Badge variant="outline">Stickers</Badge>
							<Badge variant="outline">Water bottles</Badge>
							<Badge variant="outline" className="bg-green-50 border-green-200">
								T-shirts*
							</Badge>
							<Badge variant="outline">Hats</Badge>
							<Badge variant="outline">Gloves</Badge>
							<Badge variant="outline">Mugs</Badge>
							<Badge variant="outline">Fidget spinners</Badge>
							<Badge variant="outline">Blankets and Pillows</Badge>
							<Badge variant="outline">Popsockets and rings</Badge>
						</div>
						<p className="text-sm text-muted-foreground mt-3">
							<strong>*</strong> T-shirts have been the most successful giveaway
							item in past years - highly recommended!
						</p>
					</div>
					<div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
						<h4 className="font-semibold mb-2">Shipping Information</h4>
						<p className="text-sm mb-2">
							If you need to ship materials in advance, send to:
						</p>
						<address className="text-sm not-italic">
							412 W College Ave, Unit/Apartment 709
							<br />
							State College, PA 16801
							<br />
							Attn: Sakshi Jain
						</address>
					</div>
				</CardContent>
			</Card>

			{/* Places to Stay */}
			<Card className="mb-8" id="places-to-stay">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<MapPin className="h-5 w-5" />
						Places to Stay
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
						<p className="text-sm font-medium mb-2">⚠️ Important Notice</p>
						<p className="text-sm">
							Hotels are mostly, if not entirely, booked. Please let us know
							immediately if you haven't booked accommodation yet.
						</p>
					</div>
					<div className="grid gap-4">
						<Card>
							<CardContent className="p-6">
								<div className="flex items-start gap-4">
									<div className="flex-shrink-0">
										<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
											<MapPin className="h-6 w-6 text-primary" />
										</div>
									</div>
									<div className="flex-1">
										<h4 className="font-semibold text-lg mb-1 text-foreground">
											Nittany Lion Inn
										</h4>
										<p className="text-sm text-muted-foreground mb-3">
											Penn State's on-campus hotel
										</p>
										<div className="space-y-2">
											<p className="flex items-center gap-2 text-foreground">
												<MapPin className="h-4 w-4 text-muted-foreground" />
												<span className="text-sm">
													200 W Park Ave, State College, PA 16803
												</span>
											</p>
											<p className="flex items-center gap-2 text-foreground">
												<Phone className="h-4 w-4 text-muted-foreground" />
												<span className="text-sm">(814) 865-8500</span>
											</p>
											<Link
												href="https://thenittanylioninn.com/"
												className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
												target="_blank"
												rel="noopener noreferrer"
											>
												thenittanylioninn.com
												<ExternalLink className="h-4 w-4" />
											</Link>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-6">
								<div className="flex items-start gap-4">
									<div className="flex-shrink-0">
										<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
											<MapPin className="h-6 w-6 text-primary" />
										</div>
									</div>
									<div className="flex-1">
										<h4 className="font-semibold text-lg mb-1 text-foreground">
											The Atherton Hotel
										</h4>
										<p className="text-sm text-muted-foreground mb-3">
											Boutique downtown hotel
										</p>
										<div className="space-y-2">
											<p className="flex items-center gap-2 text-foreground">
												<MapPin className="h-4 w-4 text-muted-foreground" />
												<span className="text-sm">
													125 S Atherton St, State College, PA 16801
												</span>
											</p>
											<p className="flex items-center gap-2 text-foreground">
												<Phone className="h-4 w-4 text-muted-foreground" />
												<span className="text-sm">(814) 231-2100</span>
											</p>
											<Link
												href="https://www.athertonhotel.net"
												className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
												target="_blank"
												rel="noopener noreferrer"
											>
												athertonhotel.net
												<ExternalLink className="h-4 w-4" />
											</Link>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-6">
								<div className="flex items-start gap-4">
									<div className="flex-shrink-0">
										<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
											<MapPin className="h-6 w-6 text-primary" />
										</div>
									</div>
									<div className="flex-1">
										<h4 className="font-semibold text-lg mb-1 text-foreground">
											Hyatt Place State College
										</h4>
										<p className="text-sm text-muted-foreground mb-3">
											Modern business hotel
										</p>
										<div className="space-y-2">
											<p className="flex items-center gap-2 text-foreground">
												<MapPin className="h-4 w-4 text-muted-foreground" />
												<span className="text-sm">
													219 W Beaver Ave, State College, PA 16801
												</span>
											</p>
											<p className="flex items-center gap-2 text-foreground">
												<Phone className="h-4 w-4 text-muted-foreground" />
												<span className="text-sm">(814) 862-9808</span>
											</p>
											<Link
												href="https://www.hyatt.com/en-US/hotel/pennsylvania/hyatt-place-state-college/scezs"
												className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
												target="_blank"
												rel="noopener noreferrer"
											>
												hyatt.com/hyatt-place-state-college
												<ExternalLink className="h-4 w-4" />
											</Link>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-6">
								<div className="flex items-start gap-4">
									<div className="flex-shrink-0">
										<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
											<MapPin className="h-6 w-6 text-primary" />
										</div>
									</div>
									<div className="flex-1">
										<h4 className="font-semibold text-lg mb-1 text-foreground">
											Hampton Inn State College
										</h4>
										<p className="text-sm text-muted-foreground mb-3">
											Reliable chain hotel
										</p>
										<div className="space-y-2">
											<p className="flex items-center gap-2 text-foreground">
												<MapPin className="h-4 w-4 text-muted-foreground" />
												<span className="text-sm">
													1101 E College Ave, State College, PA 16801
												</span>
											</p>
											<p className="flex items-center gap-2 text-foreground">
												<Phone className="h-4 w-4 text-muted-foreground" />
												<span className="text-sm">(814) 231-1590</span>
											</p>
											<Link
												href="https://www.hilton.com/en/hotels/sceclhx-hampton-state-college/"
												className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
												target="_blank"
												rel="noopener noreferrer"
											>
												hilton.com/hampton-state-college
												<ExternalLink className="h-4 w-4" />
											</Link>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</CardContent>
			</Card>

			{/* Day of the Event */}
			<Card className="mb-8" id="day-of-event">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Clock className="h-5 w-5" />
						Day of the Event
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid md:grid-cols-2 gap-4">
						<Card className="border-primary/20">
							<CardContent className="p-4">
								<h4 className="font-semibold mb-2 flex items-center gap-2">
									<MapPin className="h-4 w-4" />
									Event Location
								</h4>
								<p className="text-sm text-muted-foreground">
									Business Building
									<br />
									University Park, PA 16802
								</p>
							</CardContent>
						</Card>

						<Card className="border-primary/20">
							<CardContent className="p-4">
								<h4 className="font-semibold mb-2 flex items-center gap-2">
									<Car className="h-4 w-4" />
									Parking
								</h4>
								<p className="text-sm text-muted-foreground">
									East Parking Deck
									<br />
									1965 Bigler Rd, State College, PA 16802
									<br />
									<span className="font-medium">
										Keep ticket stubs for reimbursement!
									</span>
								</p>
							</CardContent>
						</Card>
					</div>

					<div>
						<h4 className="font-semibold mb-3">Sponsor Perks</h4>
						<div className="space-y-2 text-sm text-muted-foreground">
							<div className="flex items-start gap-2">
								<CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
								<span>
									Exclusive "Sponsor Room" with snacks and refreshments for your
									team
								</span>
							</div>
							<div className="flex items-start gap-2">
								<CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
								<span>
									Dedicated Sponsorship Team member assigned to help throughout
									the event
								</span>
							</div>
							<div className="flex items-start gap-2">
								<CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
								<span>
									Priority access to complimentary meals with dietary
									accommodations
								</span>
							</div>
							<div className="flex items-start gap-2">
								<CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
								<span>
									Access to entertainment: Giant Jenga, video games, cornhole,
									and more
								</span>
							</div>
							<div className="flex items-start gap-2">
								<CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
								<span>
									Workshops available all day Saturday - feel free to take
									breaks!
								</span>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Post Event */}
			<Card className="mb-8" id="post-event">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Mail className="h-5 w-5" />
						Post Event
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-muted-foreground leading-relaxed">
						Thank you for making it this far! With regards to the end of the
						event, please make sure that your organization takes all materials
						that were originally brought. If you shipped something to us, please
						make sure that you repackage the boxes and provide us with the
						return labels so that we can ship the boxes back.
					</p>
					<p className="text-muted-foreground leading-relaxed">
						We hope everything will run smoothly and you return to our Hackathon
						next Spring! If you have any questions between now and then, please
						feel free to email us.
					</p>
					<div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-lg border">
						<h4 className="font-semibold mb-2">Contact Information</h4>
						<div className="space-y-1 text-sm">
							<p>
								Sakshi Jain:{" "}
								<Link
									href="mailto:sbj5481@psu.edu"
									className="text-primary hover:underline"
								>
									sbj5481@psu.edu
								</Link>
							</p>
							<p>
								General Sponsorship:{" "}
								<Link
									href="mailto:sponsorship@hackpsu.org"
									className="text-primary hover:underline"
								>
									sponsorship@hackpsu.org
								</Link>
							</p>
						</div>
					</div>
					<div className="text-center p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg">
						<p className="text-lg font-medium text-accent">
							Thank you so much for sponsoring HackPSU!
						</p>
						<p className="text-muted-foreground mt-2">
							We look forward to seeing you at the event! 🚀
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

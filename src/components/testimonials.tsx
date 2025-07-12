import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const testimonials = [
	{
		quote:
			"Partnering with HackPSU is always a pleasure. The caliber of talent they attract is exceptional - we’ve even hired interns we first met at their events. If you want a high-impact hackathon experience, HackPSU delivers.",
		name: "Jane Doe",
		title: "Lead Recruiter, TechCorp",
		logo: "/placeholder.svg?width=140&height=40",
	},
	{
		quote:
			"HackPSU attracts top-talent future leaders. As a loyal sponsor, I would not miss this event to attract and recruit talent and put our technology to its critical tests for hackers to break them.",
		name: "John Smith",
		title: "CTO, Innovate Inc.",
		logo: "/placeholder.svg?width=140&height=40",
	},
	{
		quote:
			"We were astounded by both the creativity and resolve demonstrated at HackPSU. We wish we could have given all of our API integrations an award. A truly fantastic event for engaging with bright minds.",
		name: "Emily White",
		title: "DevRel Lead, API Solutions",
		logo: "/placeholder.svg?width=140&height=40",
	},
];

export function Testimonials() {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
			{testimonials.map((testimonial, index) => (
				<Card key={index} className="flex flex-col">
					<CardContent className="pt-6 flex-grow flex flex-col">
						<p className="text-muted-foreground flex-grow">
							"{testimonial.quote}"
						</p>
						<div className="mt-6 flex items-center gap-4">
							<div className="w-16 h-10 relative">
								<Image
									src={testimonial.logo || "/placeholder.svg"}
									alt={`${testimonial.name}'s company logo`}
									layout="fill"
									objectFit="contain"
									className="grayscale"
								/>
							</div>
							<div>
								<p className="font-semibold">{testimonial.name}</p>
								<p className="text-sm text-muted-foreground">
									{testimonial.title}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}

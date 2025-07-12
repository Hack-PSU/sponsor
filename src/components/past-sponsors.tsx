import Image from "next/image";

const sponsors = [
	{ name: "Capital One", logo: "/placeholder.svg?width=150&height=60" },
	{ name: "Microsoft", logo: "/placeholder.svg?width=150&height=60" },
	{ name: "Google", logo: "/placeholder.svg?width=150&height=60" },
	{ name: "Amazon Web Services", logo: "/placeholder.svg?width=150&height=60" },
	{ name: "Vanguard", logo: "/placeholder.svg?width=150&height=60" },
	{ name: "Ciena", logo: "/placeholder.svg?width=150&height=60" },
	{ name: "Lockheed Martin", logo: "/placeholder.svg?width=150&height=60" },
	{ name: "Johnson & Johnson", logo: "/placeholder.svg?width=150&height=60" },
];

const sponsorsRow2 = [
	{ name: "CrowdStrike", logo: "/placeholder.svg?width=150&height=60" },
	{ name: "Comcast", logo: "/placeholder.svg?width=150&height=60" },
	{ name: "RTX", logo: "/placeholder.svg?width=150&height=60" },
	{ name: "PNC", logo: "/placeholder.svg?width=150&height=60" },
	{ name: "General Motors", logo: "/placeholder.svg?width=150&height=60" },
	{ name: "Ford", logo: "/placeholder.svg?width=150&height=60" },
	{ name: "Accenture", logo: "/placeholder.svg?width=150&height=60" },
	{ name: "Deloitte", logo: "/placeholder.svg?width=150&height=60" },
];

const MarqueeRow = ({
	sponsors,
	reverse = false,
}: {
	sponsors: { name: string; logo: string }[];
	reverse?: boolean;
}) => {
	const extendedSponsors = [...sponsors, ...sponsors];
	return (
		<div
			className={`flex ${reverse ? "animate-marquee-slow-reverse" : "animate-marquee-slow"}`}
		>
			{extendedSponsors.map((sponsor, index) => (
				<div
					key={`${sponsor.name}-${index}`}
					className="mx-8 flex-shrink-0 py-2"
				>
					<Image
						src={sponsor.logo || "/placeholder.svg"}
						alt={sponsor.name}
						width={150}
						height={60}
						className="h-12 w-auto object-contain grayscale transition-all hover:grayscale-0"
					/>
				</div>
			))}
		</div>
	);
};

export function PastSponsors() {
	return (
		<div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
			<MarqueeRow sponsors={sponsors} />
			<MarqueeRow sponsors={sponsorsRow2} reverse />
		</div>
	);
}

import Image from "next/image";
import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";

const logos = [
	{ name: "AccuWeather", src: "/logo/AccuWeather.png" },
	{ name: "Amazon", src: "/logo/Amazon.png" },
	{ name: "ANSYS", src: "/logo/ANSYS.png" },
	{ name: "Apple", src: "/logo/Apple.png" },
	{ name: "BNY Mellon", src: "/logo/BNY_Mellon.png" },
	{ name: "Capital One", src: "/logo/Capital_One.png" },
	{ name: "Comcast", src: "/logo/Comcast.png" },
	{ name: "Deloitte", src: "/logo/Deloitte.png" },
	{ name: "Dicks", src: "/logo/dicks.png" },
	{ name: "Echo AR", src: "/logo/echo_ar.png" },
	{ name: "Element 84", src: "/logo/element_84.png" },
	{ name: "EY", src: "/logo/EY.png" },
	{ name: "Geico", src: "/logo/geico.png" },
	{ name: "GM", src: "/logo/GM.png" },
	{ name: "Google", src: "/logo/google.png" },
	{ name: "GSK", src: "/logo/GSK.png" },
	{ name: "HV Launch Box", src: "/logo/HV_launch_box.png" },
	{ name: "HVC", src: "/logo/HVC.png" },
	{ name: "IBM", src: "/logo/IBM.png" },
	{ name: "Instructure", src: "/logo/instructure.png" },
	{ name: "INVENT PSU", src: "/logo/INVENT_PSU.png" },
	{ name: "IPsoft", src: "/logo/IPsoft.png" },
	{ name: "Jet Brains", src: "/logo/jetbrains.png" },
	{ name: "JPMC", src: "/logo/JPMC.png" },
	{ name: "KCF", src: "/logo/KCF.png" },
	{ name: "Leidos", src: "/logo/leidos.png" },
	{ name: "Linode", src: "/logo/linode.png" },
	{ name: "Loop", src: "/logo/loop.png" },
	{ name: "Lutron", src: "/logo/lutron.png" },
	{ name: "M&T", src: "/logo/m&t.png" },
	{ name: "Microsoft", src: "/logo/microsoft.png" },
	{ name: "MLH", src: "/logo/mlh.png" },
	{ name: "NAISS", src: "/logo/NAISS.png" },
	{ name: "Namecheap", src: "/logo/namecheap.png" },
	{ name: "OSIsoft", src: "/logo/OSIsoft.png" },
	{ name: "Pariveda", src: "/logo/pariveda.png" },
	{ name: "Peraton", src: "/logo/peraton.png" },
	{ name: "PSU EECS", src: "/logo/PSU_EECS.png" },
	{ name: "PSU ICDS", src: "/logo/PSU_ICDS.png" },
	{ name: "PSU IST", src: "/logo/PSU_IST.png" },
	{ name: "PwC", src: "/logo/pwc.png" },
	{ name: "Raytheon", src: "/logo/raytheon.png.png" },
	{ name: "Sentry", src: "/logo/sentry.png" },
	{ name: "Smaeal", src: "/logo/smaeal.png" },
	{ name: "Snap", src: "/logo/snap.png" },
	{ name: "StickerMule", src: "/logo/stickermule.png" },
	{ name: "TE", src: "/logo/te.png.png" },
	{ name: "Textron", src: "/logo/textron.png" },
	{ name: "Unity", src: "/logo/unity.png" },
	{ name: "Vanguard", src: "/logo/vanguard.png" },
	{ name: "Wolfram", src: "/logo/wolfram.png" },
];

const LogoCard = ({ src, name }: { src: string; name: string }) => (
	<figure
		className={cn(
			// make the figure the sized container for Image fill:
			"relative w-48 h-24 cursor-pointer overflow-hidden rounded-xl border p-4",
			// light mode
			"border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
			// dark mode
			"dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
		)}
	>
		{/* Now Image fill fills this 12rem × 6rem box */}
		<Image src={src} alt={name} fill className="object-contain" />
	</figure>
);

export function PastSponsors() {
	/* 	const firstRow = logos.slice(0, logos.length / 3);
	const secondRow = logos.slice(logos.length / 3, (logos.length / 3) * 2);
	const thirdRow = logos.slice((logos.length / 3) * 2); */

	// pick 3 rows randomly from the logos array
	let rows: { name: string; src: string }[][] = [[], [], []];
	for (let i = 0; i < logos.length; i++) {
		const rowIndex = i % 3;
		rows[rowIndex].push(logos[i]);
	}
	const firstRow = rows[0];
	const secondRow = rows[1];
	const thirdRow = rows[2];

	return (
		<div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
			<Marquee pauseOnHover className="[--duration:60s]">
				{firstRow.map((logo) => (
					<LogoCard key={logo.name} {...logo} />
				))}
			</Marquee>
			<Marquee pauseOnHover className="[--duration:60s]">
				{secondRow.map((logo) => (
					<LogoCard key={logo.name} {...logo} />
				))}
			</Marquee>
			<Marquee pauseOnHover className="[--duration:60s]">
				{thirdRow.map((logo) => (
					<LogoCard key={logo.name} {...logo} />
				))}
			</Marquee>
			<div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background" />
			<div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background" />
		</div>
	);
}

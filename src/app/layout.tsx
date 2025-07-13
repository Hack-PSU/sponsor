import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LayoutProvider } from "@/common/context";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		default: "HackPSU Sponsor Portal - Partner with Innovation",
		template: "%s | HackPSU Sponsor Portal",
	},
	description:
		"Join HackPSU as a sponsor and connect with talented students, innovative projects, and the next generation of tech leaders.:",
	keywords: [
		"HackPSU",
		"hackathon sponsor",
		"Penn State hackathon",
		"student innovation",
		"tech recruitment",
		"sponsor portal",
		"hackathon partnership",
		"student projects",
		"tech talent",
		"university hackathon",
		"coding competition",
		"software development",
		"student developers",
		"tech networking",
		"innovation showcase",
	],
	authors: [
		{
			name: "HackPSU Team",
			url: "https://hackpsu.org",
		},
	],
	creator: "HackPSU",
	publisher: "HackPSU",
	formatDetection: {
		email: true,
		address: false,
		telephone: false,
	},
	metadataBase: new URL("https://sponsor.hackpsu.org"),
	alternates: {
		canonical: "/",
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://sponsor.hackpsu.org",
		siteName: "HackPSU Sponsor Portal",
		title: "HackPSU Sponsor Portal - Partner with Innovation",
		description:
			"Connect with talented students and innovative projects at Penn State's premier hackathon.",
	},
	robots: {
		index: true,
		follow: true,
		nocache: true,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: false,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	category: "technology",
	classification: "Education, Technology, Events",
	referrer: "origin-when-cross-origin",
	colorScheme: "light dark",
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#0f172a" },
	],
	viewport: {
		width: "device-width",
		initialScale: 1,
		maximumScale: 5,
		userScalable: true,
	},
	verification: {
		//google: "your-google-verification-code", // Replace with actual verification code
	},
};
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} antialiased`}>
				<LayoutProvider>{children}</LayoutProvider>
				<Analytics />
			</body>
		</html>
	);
}

import { DashboardNavbar } from "@/components/dashboard-navbar";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			{" "}
			<Navbar />
			{children}
			<Footer />
		</>
	);
}

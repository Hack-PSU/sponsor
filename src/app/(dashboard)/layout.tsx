import { AuthGuard, Role } from "@/common/context/AuthGuard";
import { DashboardNavbar } from "@/components/dashboard-navbar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			{" "}
			<AuthGuard
				config={{
					minimumRole: Role.TECH,
					authServerUrl: process.env.NEXT_PUBLIC_AUTH_SERVICE_URL,
				}}
			>
				<DashboardNavbar />
				{children}
			</AuthGuard>{" "}
		</>
	);
}

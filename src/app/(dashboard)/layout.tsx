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
			<AuthGuard config={{ minimumRole: Role.TECH }}>
				<DashboardNavbar />
				{children}
			</AuthGuard>{" "}
		</>
	);
}

import {
  AuthGuard,
  Role,
} from "@hackpsu/react-sdk";
import { DashboardNavbar } from "@/components/dashboard-navbar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			{" "}
			<AuthGuard minimumRole={Role.TECH}>
				<DashboardNavbar />
				{children}
			</AuthGuard>{" "}
		</>
	);
}

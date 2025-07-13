import React, { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useFirebase } from "@/common/context";

type AuthGuardProps = {
	children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
	const router = useRouter();
	const pathname = usePathname();
	const { isLoading, isAuthenticated } = useFirebase();

	useEffect(() => {
		if (isLoading) return;

		// allow access to / and /auth without authentication
		if (!isAuthenticated && (pathname === "/" || pathname === "/login")) {
			return;
		}
	}, [isLoading, isAuthenticated, pathname, router]);

	if (isLoading) {
		return null;
	}

	if (isAuthenticated || pathname === "/login") {
		return <>{children}</>;
	}

	// Otherwise, nothing (redirect is in flight)
	return null;
}

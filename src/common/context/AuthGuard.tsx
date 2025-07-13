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

	// Always run this hook; only redirect if on a protected route
	useEffect(() => {
		const isPublicRoute = pathname === "/" || pathname === "/login";
		if (!isLoading && !isAuthenticated && !isPublicRoute) {
			router.push("/login");
		}
	}, [pathname, isLoading, isAuthenticated, router]);

	// Public routes are always accessible
	if (pathname === "/" || pathname === "/login") {
		return <>{children}</>;
	}

	// While we're checking auth status, show nothing (or a loader)
	if (isLoading) {
		return null;
	}

	// If not authenticated, don’t render protected content
	if (!isAuthenticated) {
		return null;
	}

	// Authenticated & not on a public route → render the protected children
	return <>{children}</>;
}

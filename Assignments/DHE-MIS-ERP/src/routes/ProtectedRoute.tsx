import React from "react";
import { Navigate } from "react-router-dom";
import type { UserRole } from "../types/userRole";

type ProtectedRouteProps = {
	children: React.ReactNode;
	allowedRoles?: UserRole[];
};

/**
 * Simple ProtectedRoute component.
 * - Checks for a stored `user` in localStorage to determine authentication.
 * - If `allowedRoles` is provided, verifies the stored `role` (from localStorage) is allowed.
 * - Redirects to `/login` when unauthenticated. Shows a simple unauthorized message when role is not allowed.
 *
 * Assumptions:
 * - Login stores a `user` object in localStorage under the key `user` and a `role` string under `role` (this repository's Login does that).
 */
export default function ProtectedRoute({
	children,
	allowedRoles,
}: ProtectedRouteProps) {
	const userRaw = localStorage.getItem("user");
	if (!userRaw) {
		// Not authenticated
		return <Navigate to="/login" replace />;
	}

	if (allowedRoles && allowedRoles.length > 0) {
		const role = (localStorage.getItem("role") || undefined) as UserRole | undefined;
		if (!role || !allowedRoles.includes(role)) {
			return (
				<div style={{ padding: 24 }}>
					<h2>Unauthorized</h2>
					<p>You do not have permission to view this page.</p>
				</div>
			);
		}
	}

	return <>{children}</>;
}

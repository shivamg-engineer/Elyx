import { Navigate, useLocation } from "react-router-dom";
import type { UserRole } from "../types/userRole";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) 
{

  const location = useLocation();
  
  const role = localStorage.getItem("role") as UserRole | null;
  const user = localStorage.getItem("user");

  // Check if user is authenticated
  if (!user || !role) {
    return <Navigate to="/" replace  state={{ from: location }}/>;
  }

  // Check role-based access if roles are specified
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

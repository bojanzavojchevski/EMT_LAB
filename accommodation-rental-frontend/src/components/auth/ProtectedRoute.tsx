import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import tokenStorage from "../../api/tokenStorage";

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const location = useLocation();

    if (!tokenStorage.isAuthenticated()) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    if (allowedRoles && !allowedRoles.includes(tokenStorage.getRole() ?? "")) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
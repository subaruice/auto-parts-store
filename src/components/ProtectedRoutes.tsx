import { useContext } from "react";
import { authContext } from "../AuthContext";
import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = () => {
    const { user } = useContext(authContext);

    if (!user) {
        return <Navigate to={"/login"} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;

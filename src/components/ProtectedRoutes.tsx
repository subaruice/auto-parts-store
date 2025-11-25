import { useContext } from "react";
import { authContext } from "../AuthContext";
import { Navigate, Outlet } from "react-router";
import Skeleton from "./UI/Skeleton";

const ProtectedRoutes = () => {
    const { user } = useContext(authContext);

    if(user === null) return <Skeleton/>

    if (!user) {
        return <Navigate to={"/login"} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;

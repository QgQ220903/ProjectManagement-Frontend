import { useLocation, Navigate, Outlet } from "react-router-dom";
import {useAuth} from "@/hooks/use-auth";
import { Infinity } from "lucide-react";

const RequireAuth = ({ allowedRoles, children  }) => {
    const { auth, features } = useAuth();
    const authStorage = JSON.parse(localStorage.getItem("auth"));
    const location = useLocation();

    // console.log("RequireAuth",auth)
    if (Object.keys(auth).length === 0) {
        console.log("authStorage",authStorage)
        if(!authStorage){

            return <Navigate to="/login" state={{ from: location }} replace />;
        }
    }

    


    return children;
}

export default RequireAuth;
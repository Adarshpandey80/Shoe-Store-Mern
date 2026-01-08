import React from 'react'
import { Navigate, useLocation } from "react-router-dom";


function ProtectSellerRoute({children}) {
    const token = localStorage.getItem("sellertoken");
    const location = useLocation();

    // Not logged in → redirect to login
    if (!token) {
        return (
            <Navigate
                to="/adminSeller/login"
                replace
                state={{ from: location.pathname }}
            />
        );
    }

    // Logged in → allow access
    return children;


}

export default ProtectSellerRoute
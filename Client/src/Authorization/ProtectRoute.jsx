import { Navigate, useLocation } from "react-router-dom";

const ProtectRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  // Not logged in → redirect to login
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // Logged in → allow access
  return children;
};

export default ProtectRoute;

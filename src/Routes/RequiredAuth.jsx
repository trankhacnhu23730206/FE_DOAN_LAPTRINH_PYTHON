import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "../Utils/auth";

export default function RequireAuth() {
  const location = useLocation();
  if (!isAuthenticated()) {
    // nhớ state.from để login xong quay lại
    return <Navigate to="/login-user" replace state={{ from: location }} />;
  }
  return <Outlet />;
}

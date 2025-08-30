import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "../Utils/auth";

export default function PublicOnly() {
  const location = useLocation();
  if (isAuthenticated()) {
    // đã đăng nhập thì không vào /login, /register nữa
    const back = location.state?.from?.pathname || "/";
    return <Navigate to={back} replace />;
  }
  return <Outlet />;
}

// file: /page/RegisterSwitchPage.js
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";
export default function RegisterSwitchPage() {
  const auth = useAuth();
  return <>{auth.user?.username ? <Navigate to="/" replace /> : <Outlet />}</>;
}

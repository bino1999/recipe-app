import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "./useAuthStore";

const PrivateRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoute;

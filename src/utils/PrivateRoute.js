import { Navigate, Outlet } from "react-router-dom";
import { UserAuth } from "../lib/Auth";

function PrivateRoute({ children, redirectPath = "/login" }) {
  const { currentUser } = UserAuth();

  if (!currentUser) return <Navigate to={redirectPath} replace />;
  return children ? children : <Outlet />;
}

export function LoggedOutUser({ children }) {
  const { currentUser } = UserAuth();
  if (currentUser) return <Navigate to="/account" replace />;
  return children;
}

export default PrivateRoute;

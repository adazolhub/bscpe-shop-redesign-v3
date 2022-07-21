import { Navigate, Outlet } from "react-router-dom";
import { TypeJSX } from "../../types";
import { UserAuth } from "../lib/Auth";

//TODOS: need to fix children type on Route interface
interface Route {
    children?: any;
    redirectPath?: string,
}

// TODOS: Need to fix types on each current user

function PrivateRoute({ children, redirectPath = "/login" } : Route) {
  const { currentUser } : any = UserAuth();

  if (!currentUser) return <Navigate to={redirectPath} replace />;
  return children ? children : <Outlet />;
}

export function LoggedOutUser({ children } : any) {
  const { currentUser } : any = UserAuth();
  if (currentUser) return <Navigate to="/account" replace />;
  return children;
}

export default PrivateRoute;

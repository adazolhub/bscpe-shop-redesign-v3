import { Navigate } from "react-router-dom";
import { UserAuth } from "../lib/Auth";

function PrivateRoute({ children }) {
  const { currentUser } = UserAuth();
  // console.log(currentUser);

  if (!currentUser) return <Navigate to="/login" />;
  return children;
}

export function LoggedOutUser({ children }) {
  const { currentUser } = UserAuth();
  if (currentUser) return <Navigate to="/" />;
  return children;
}

export default PrivateRoute;

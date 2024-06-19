import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {

  const { currentUser } = useSelector((state) => state.user);

  const isLoggedIn = currentUser !== null && currentUser !== "User has been logged out!!";

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}

import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  // const newPath = location.search === "?auth=logout" ? "/?auth=logout" : "/";
   const { currentUser } = useSelector((state) => state.user);
   return currentUser && currentUser?._id ? <Outlet /> : <Navigate to={"/"} />;
}

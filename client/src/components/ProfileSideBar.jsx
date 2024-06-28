import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  deleteUserFaliure,
  deleteUserStart,
  deleteUserSuccess,
  signOutFaliure,
  signOutSuccess,
  signOutUser,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { LuPower } from "react-icons/lu";

import { config } from "../../config";

export default function ProfileSideBar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      
      dispatch(signOutUser());

      const res = await fetch(`${config.baseUrl}/api/auth/signout`);

      const data = await res.json();

      dispatch(signOutSuccess(data));

      // persistor.purge()
      navigate("/", {replace:true });
      navigate("/", { replace: true });

    } catch (error) {
      dispatch(signOutFaliure("Error signing out"));
    } finally {
      // persistor.purge()
      localStorage.removeItem("persist:root")
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(
        `${config.baseUrl}/api/user/delete/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFaliure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(deleteUserFaliure(error.message));
    }
  };

  return (
    <div className="hidden rounded w-64 flex-shrink-0 md:flex flex-col bg-[#FFFFFF]">
      <h1 className="font-bold text-xl mb-4 border-b  p-5 py-4 ">Profile</h1>
      <div className="flex flex-col gap-2 px-3">
        <Link
          to={"/add-product"}
          className={`${
            currentPath === "/add-product"
              ? "bg-blue-100 text-black"
              : "text-gray-500"
          }  text-left py-3 px-4 hover:bg-blue-50 focus:outline-none focus:ring-blue-200 rounded transition-all duration-75 ease-in-out`}
        >
          Add Product
        </Link>

        <Link
          to={"/profile"}
          className={`${
            currentPath === "/profile"
              ? "bg-blue-100 text-black"
              : "text-gray-500"
          }  text-left py-3 px-4 hover:bg-blue-50 focus:outline-none focus:ring-blue-200 rounded transition-all duration-75 ease-in-out`}
        >
          Personal Details
        </Link>

        <Link
          to={"/shop-details"}
          className={`${
            currentPath === "/shop-details"
              ? "bg-blue-100 text-black"
              : "text-gray-500"
          } text-left py-3 px-4 hover:bg-blue-50 focus:outline-none focus:ring-blue-200 rounded transition-all duration-75 ease-in-out`}
        >
          Shop details
        </Link>

        <Link
          to={"/seller-review"}
          className={`${
            currentPath === "/seller-review"
              ? "bg-blue-100 text-black"
              : "text-gray-500"
          } text-left py-3 px-4 hover:bg-blue-50 focus:outline-none focus:ring-blue-200 rounded transition-all duration-75 ease-in-out`}
        >
          Reviews
        </Link>
      </div>
      <div className="p-3 py-4 mt-auto flex flex-col gap-3 ">
        <div className=" border-t mt-3" />
        <button
          className="text-red-600 hover:bg-red-50 py-3 rounded-md duration-300 px-3 text-left flex items-center justify-between"
          onClick={handleSignOut}
        >
          <span>Log out</span>
          <LuPower className="text-red-600 rotate-90" />
        </button>
        <button
          className="text-red-600 hover:underline text-left px-3"
          onClick={handleDeleteUser}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

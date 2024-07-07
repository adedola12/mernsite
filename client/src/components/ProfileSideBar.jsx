import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteUserFaliure,
  deleteUserStart,
  deleteUserSuccess,
  signOutFaliure,
  signOutSuccess,
  signOutUser,
} from "../redux/user/userSlice";
import { LuArrowLeftSquare, LuPower } from "react-icons/lu";
import { config } from "../../config";
import toast from 'react-hot-toast';


export default function ProfileSideBar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [userProducts, setUserProducts] = useState([]);
  const [showListingError, setShowListingError] = useState(false);
  const [showProductError, setShowProductError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      
      dispatch(signOutUser());

      const res = await fetch(`${config.baseUrl}/api/auth/signout`);

      const data = await res.json();

      if(!res.ok) {
        toast.error(data?.message);
        return;
      }

      dispatch(signOutSuccess(data));
      navigate("/", { replace: true });
      navigate(0);

    } catch (error) {
      dispatch(signOutFaliure("Error signing out"));
    } finally {
      localStorage.removeItem("persist:root");
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

  const handleShowListing = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(
        `${config.baseUrl}/api/user/listings/${currentUser._id}`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();

      setUserListings(data);
    } catch (error) {
      setShowListingError(true);
    }
  };

  const handleShowProduct = async () => {
    try {
      setShowProductError(false);

      const res = await fetch(
        `${config.baseUrl}/api/user/products/${currentUser._id}`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();

      setUserProducts(data);
    } catch (error) {
      setShowProductError(true);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (currentPath === "/shop-details") {
      handleShowProduct();
      handleShowListing();
    }
  }, [currentPath]);

  return (
    <div className="">
      {/* Desktop Sidebar */}
      <div className="hidden rounded w-64 flex-shrink-0 md:flex flex-col bg-[#FFFFFF]">
        <button
          className="text-black text-lg font-bold p-4 md:hidden"
          onClick={toggleMobileMenu}
        >
          <LuArrowLeftSquare />
        </button>
        <h1 className="font-bold text-xl mb-4 border-b p-5 py-4">Profile</h1>
        <div className="flex flex-col gap-2 px-3">
          <Link
            to={"/add-product"}
            className={`${
              currentPath === "/add-product"
                ? "bg-blue-100 text-black"
                : "text-gray-500"
            } text-left py-3 px-4 hover:bg-blue-50 focus:outline-none focus:ring-blue-200 rounded transition-all duration-75 ease-in-out`}
          >
            Add Product
          </Link>

          <Link
            to={"/profile"}
            className={`${
              currentPath === "/profile"
                ? "bg-blue-100 text-black"
                : "text-gray-500"
            } text-left py-3 px-4 hover:bg-blue-50 focus:outline-none focus:ring-blue-200 rounded transition-all duration-75 ease-in-out`}
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
            onClick={() => changeActiveView(views.Shop_Details)}
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
        <div className="p-3 py-4 mt-auto flex flex-col gap-3">
          <div className="border-t mt-3" />
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

      {/* Mobile Sidebar */}
      <div className="md:hidden ">
        <button className="self-start text-2xl mb-4" onClick={toggleMobileMenu}>
          <LuArrowLeftSquare />
        </button>
        {isMobileMenuOpen && (
          <div className="fixed inset-0z-50 flex flex-col p-5  bg-white ">
            <h1 className="font-bold text-xl mb-4 border-b p-5 py-4">
              Profile
            </h1>
            <div className="flex flex-col gap-2 px-3">
              <Link
                to={"/add-product"}
                className={`${
                  currentPath === "/add-product"
                    ? "bg-blue-100 text-black"
                    : "text-gray-500"
                } text-left py-3 px-4 hover:bg-blue-50 focus:outline-none focus:ring-blue-200 rounded transition-all duration-75 ease-in-out`}
                onClick={toggleMobileMenu}
              >
                Add Product
              </Link>

              <Link
                to={"/profile"}
                className={`${
                  currentPath === "/profile"
                    ? "bg-blue-100 text-black"
                    : "text-gray-500"
                } text-left py-3 px-4 hover:bg-blue-50 focus:outline-none focus:ring-blue-200 rounded transition-all duration-75 ease-in-out`}
                onClick={toggleMobileMenu}
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
                onClick={toggleMobileMenu}
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
                onClick={toggleMobileMenu}
              >
                Reviews
              </Link>
            </div>
            <div className="p-3 py-4 mt-auto flex flex-col gap-3">
              <div className="border-t mt-3" />
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
        )}
      </div>
    </div>
  );
}

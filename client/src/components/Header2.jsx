import React, { useCallback, useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteUserFaliure,
  deleteUserStart,
  deleteUserSuccess,
  signOutFaliure,
  signOutSuccess,
  signOutUser,
} from "../redux/user/userSlice";
import { config } from "../../config";

const Header2 = ({ toggleModal }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState(" ");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [windowSize, setWindowSize] = useState(window.innerWidth ?? 0);

  const closeNavMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleNavMenu = useCallback(
    () => setIsMenuOpen((prevState) => !prevState),
    []
  );

  const smallScreen = () => windowSize < 1024;

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleMouseEnter = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(isDropdownOpen);
  };

  const handleToggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUser());

      const res = await fetch(`${config.baseUrl}/api/auth/signout`);

      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutFaliure(data.message));
        return;
      }

      dispatch(signOutSuccess(data));

      navigate("/");
    } catch (error) {
      dispatch(signOutFaliure(error.message));
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

  useEffect(() => {
    const handleScreenResize = () => {
      if (windowSize > 10) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleScreenResize);

    return () => window.removeEventListener("resize", handleScreenResize);
  }, [smallScreen]);

  return (
    <header className="bg-white relative">
      <div className="contain mx-auto px-4 flex items-center justify-between ">
        <div className="">
          <Link to="/" className="object-contain">
            <img
              src="..\logo\ADLM Studio Logo PNG-07.png"
              alt="adlmlogo"
              className="w-16 h-16 lg:w-[95px] lg:h-[95px]"
            />
          </Link>
        </div>
        <nav className="hidden bg-white md:flex">
          <ul className="flex items-center text-white justify-center font-semibold ">
            <li onClick={closeNavMenu} className="relative group px-1 py-2">
              <Link
                to="/HomeA"
                className="hover:opacity-50 duration-300 text-[#00263D] px-2 py-2"
              >
                Home
              </Link>
            </li>

            <li onClick={closeNavMenu} className="relative group px-1 py-2">
              <Link
                to="/marketplace"
                className="hover:opacity-50 duration-300 text-[#00263D] px-2 py-2"
              >
                Marketplace
              </Link>
            </li>

            <li onClick={closeNavMenu} className="relative group px-3 py-2">
              <div className="flex items-center cursor-pointer h-full">
                <span className="flex items-center hover:opacity-50 cursor-pointer text-[#00263D] transition-colors duration-300 px-1">
                  Product{" "}
                  <IoIosArrowForward className="ml-1 mt-1 text-sm text-[#00263D] group-hover:rotate-90 group-hover:duration-300 " />
                </span>
              </div>
              <div
                className="absolute top-0 -left-12 duration-500 ease-in-out transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                            group-hover:transform z-50 min-w-max transform "
              >
                <div className="relative  top-6 p-6 bg-white rounded-xl border shadow w-full">
                  <div className="relative z-10">
                    <ul className="text-[15px]">
                      <li>
                        <Link
                          to={"/planswift-plugin"}
                          className="text-gray-600 hover:text-gray-800 py-1 block font-normal"
                        >
                          Planswift Plugin
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/rate-gen"}
                          className="text-gray-600 hover:text-gray-800 py-1 block font-normal"
                        >
                          Rate Generator
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/bim-course"}
                          className="text-gray-600 hover:text-gray-800 py-1 block font-normal"
                        >
                          BIM Course
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/ms-project"}
                          className="text-gray-600 hover:text-gray-800 py-1 block font-normal"
                        >
                          Microsoft Project Course
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/mat-lab-gen"}
                          className="text-gray-600 hover:text-gray-800 py-1 block font-normal"
                        >
                          Material and Labour Generator
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/revit-plugin"}
                          className="text-gray-600 hover:text-gray-800 py-1 block font-normal"
                        >
                          Revit Plugin
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="">
            <ul className="flex items-center justify-between gap-2">
              {currentUser == "User has been logged out!!" && (
                <>
                  <li onClick={() => toggleModal("signIn")}>
                    <Link className="rounded-full px-1 py-2 font-semibold text-[#00263D] hover:text-opacity-70 duration-300 bg-opacity-10 flex items-center group">
                      <span className="">Sign In</span>
                    </Link>
                  </li>
                  <li onClick={() => toggleModal("signUp")}>
                    <Link className="rounded-full px-3 py-2 font-semibold text-[#00263D] bg-gray-900 bg-opacity-10 flex items-center group">
                      <span className="">Sign Up</span>
                      <MdKeyboardArrowRight className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition ease-in-out duration-200 mt-1" />
                    </Link>
                  </li>
                </>
              )}
              {currentUser !== "User has been logged out!!" && (
                <>
                  <Link to="/profile" className="">
                    <img
                      src={
                        (currentUser?.avatar && currentUser?.avatar) ||
                        "https://placehold.jp/150x150.png"
                      }
                      alt="pp"
                      className="rounded-full h-7 w-7 object-cover"
                    />
                  </Link>
                </>
              )}
            </ul>
          </div>

          <div className="md:hidden">
            <button onClick={toggleNavMenu} className="text-white">
              {isMenuOpen ? (
                <IoCloseSharp size={20} className="text-blue-950" />
              ) : (
                <RxHamburgerMenu size={20} className="text-blue-950" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      {isMenuOpen && (
        <nav className="absolute h-screen w-full top-16 z-50  bg-white left-0 flex flex-col md:hidden ">
          <ul className="flex flex-col items-start text-white font-semibold ">
            <li onClick={closeNavMenu} className="relative group px-1 py-2">
              <Link
                to="/HomeA"
                className="hover:opacity-50 duration-300 text-[#00263D] px-2 py-2"
              >
                Home
              </Link>
            </li>

            <li onClick={closeNavMenu} className="relative group px-1 py-2">
              <Link
                to="/marketplace"
                className="hover:opacity-50 duration-300 text-[#00263D] px-2 py-2"
              >
                Marketplace
              </Link>
            </li>

            <li
              onClick={closeNavMenu}
              className="relative group px-3 py-2 bg-white"
            >
              <div className="flex items-center cursor-pointer h-full">
                <span className="flex items-center hover:opacity-80 cursor-pointer text-[#00263D] transition-colors duration-300 px-1">
                  Product{" "}
                  <IoIosArrowForward className="ml-1 text-sm text-[#00263D] group-hover:rotate-90 group-hover:duration-300 " />
                </span>
              </div>
              <div
                className="absolute top-0 left-0 duration-500 ease-in-out transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                            group-hover:transform z-50 min-w-max h-auto transform "
              >
                <div className="relative  top-5 p-6 py-2 bg-white ml-2 border-l-2 border-l-blue-950 w-full h-full">
                  <div className="relative z-10">
                    <ul className="text-[15px]">
                      <li>
                        <Link
                          to={"/planswift-plugin"}
                          className="text-gray-600 hover:text-gray-800 py-1 block font-normal"
                        >
                          Planswift Plugin
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/rate-gen"}
                          className="text-gray-600 hover:text-gray-800 py-1 block font-normal"
                        >
                          Rate Generator
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/bim-course"}
                          className="text-gray-600 hover:text-gray-800 py-1 block font-normal"
                        >
                          BIM Course
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/ms-project"}
                          className="text-gray-600 hover:text-gray-800 py-1 block font-normal"
                        >
                          Microsoft Project Course
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/mat-lab-gen"}
                          className="text-gray-600 hover:text-gray-800 py-1 block font-normal"
                        >
                          Material and Labour Generator
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/revit-plugin"}
                          className="text-gray-600 hover:text-gray-800 py-1 block font-normal"
                        >
                          Revit Plugin
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>

            {currentUser !== "User has been logged out!!" && (
              <div className="w-full mt-6 flex flex-col gap-y-3 px-5 ">
                <button
                  className="bg-red-500 hover:bg-red-400 duration-300 px-5 py-3 rounded-md text-white  text-center"
                  onClick={() => {
                    handleSignOut(), closeNavMenu();
                  }}
                >
                  Log Out
                </button>
                <button
                  className="border-red-500 hover:bg-red-200 text-center duration-300 bg-red-100 border-2  px-5 py-3 rounded-md text-black"
                  onClick={handleDeleteUser}
                >
                  Delete Account
                </button>
              </div>
            )}

            {/* <li onClick={closeNavMenu} className='relative group px-1 py-2'> 
                    </li> */}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header2;

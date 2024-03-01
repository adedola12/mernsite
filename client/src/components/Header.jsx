import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-blue-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-blue-800 ">ADLM</span>
            <span className="text-blue-600 ">Cost</span>
          </h1>
        </Link>

        <form className="bg-blue-100 p-3 rounded-lg flex justify-center">
          <input
            type="text"
            placeholder="search"
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-blue-500" />
        </form>

        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-blue-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-blue-700 hover:underline">
              About
            </li>
          </Link>

          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="pp"
                className="rounded-full h-7 w-7 object-cover"
              />
            ) : (
              <li className="sm:inline text-blue-700 hover:underline">
                Sign Up
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

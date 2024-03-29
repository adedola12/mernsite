import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState(" ");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-white shadow-md">
      <div className="flex justify-between items-center max-w-8xl mx-auto p-4">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap ml-5">
            <span className="text-blue-800 ">ADLM</span>
            <span className="text-blue-600 ">Cost</span>
          </h1>
        </Link>

        <ul className="flex gap-4 max-w-5">
          <Link to="/">
            <li className="hidden sm:inline text-gray-600 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/marketplace">
            <li className="hidden sm:inline text-gray-600  hover:underline">
              Marketplace
            </li>
          </Link>
          <Link to="/pricing">
            <li className="hidden sm:inline text-gray-600  hover:underline">
              Pricing
            </li>
          </Link>
          <Link to="/services">
            <li className="hidden sm:inline text-gray-600  hover:underline">
              Services
            </li>
          </Link>
          <Link to="/product">
            <li className="hidden sm:inline text-gray-600  hover:underline">
              Product
            </li>
          </Link>
          <Link to="/newsletter">
            <li className="hidden sm:inline text-gray-600  hover:underline">
              Newsletter
            </li>
          </Link>
        </ul>

        <form
          className="bg-gray-50 p-3 rounded-lg flex justify-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-15 sm:w-30"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-gray-75" />
          </button>
        </form>

        <Link to="/profile">
          {currentUser ? (
            <img
              src={currentUser.avatar}
              alt="pp"
              className="rounded-full h-7 w-7 object-cover"
            />
          ) : (
            <li className="sm:inline text-blue-700 hover:underline">Sign Up</li>
          )}
        </Link>
      </div>
    </header>
  );
}

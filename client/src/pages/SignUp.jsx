import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth.jsx";
import SignInModal from "./SignIn.jsx";
import { MdClose } from "react-icons/md";
import { config } from "../../config/index.js";

export default function SignUpModal({ onClose }) {
  const [formData, setFormData] = useState({});

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`${config.baseUrl}/api/auth/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
  
      if (data.success === false) {
        // setLoading(false);
        setError(data.message);

        setShowSignInModal(false);
        return;
      }

      // setLoading(false);
      setError(null);
      onClose();
      navigate("/");
    } catch (error) {
      // setLoading(false);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleSignInModal = () => {
    setShowSignInModal(!showSignInModal);
  };
  const handleShowModal = (event) => {
    if(event.target.id === 'signup-modal') {
      onClose()
    }
  }

  return (
    <div id="signup-modal" onClick={handleShowModal} className="fixed px-2 z-50 inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-sm overflow-y-auto h-full w-full">
      <div onClick={event => event.stopPropagation()} className="relative top-10 mx-auto p-5 border w-full md:max-w-96 shadow-lg rounded-md bg-white">
        <button onClick={onClose} className="absolute group top-2 right-2 h-8 w-8 flex items-center justify-center text-lg rounded-full hover:bg-gray-200 duration-300">
          <MdClose className="text-gray-500 group-hover:text-gray-600" />
        </button>
        <div className="flex flex-col items-center justify-center">
          <img
            src="..\logo\ADLM Studio Logo PNG-07.png"
            alt="ADLM Logo"
            className="w-20 mx-auto"
          />
          <h1 className="font-bold text-3xl text-center my-7">Sign Up</h1>
          <p className="text-sm text-gray-500">Sign up to sell on ADLM</p>

          <form className="mt-2" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              className="mt-2 p-3 w-full border rounded"
              id="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              className="mt-2 p-3 w-full border rounded"
              autoComplete="off"
              id="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              autoComplete="off"
              className="mt-2 p-3 w-full border rounded"
              id="password"
              onChange={handleChange}
            />

            <button
              disabled={loading}
              className="mt-2 p-3 w-full bg-[#00263D] text-white rounded"
            >
              {loading ? "Please wait..." : "SIGN UP"}
            </button>
            <OAuth />
          </form>

          <div className="flex my-5 mx-auto max-w-lg gap-2">
            <p>Have an account?</p>
            <button onClick={toggleSignInModal}>
              <span className="text-blue-600">Sign in</span>
            </button>
          </div>

          {showSignInModal && <SignInModal onClose={toggleSignInModal} />}
          {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
      </div>
    </div>
  );
}

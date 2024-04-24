import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth.jsx";
import SignInModal from "./SignIn.jsx";

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
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }

      setLoading(false);
      setError(null);

      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const toggleSignInModal = () => {
    setShowSignInModal(!showSignInModal);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <button onClick={onClose} className="absolute top-2 right-2 text-lg">
          &times;
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
              id="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              className="mt-2 p-3 w-full border rounded"
              id="password"
              onChange={handleChange}
            />

            <button
              disabled={loading}
              className="mt-2 p-3 w-full bg-[#00263D] text-white rounded"
            >
              {loading ? "LOADING..." : "SIGN UP"}
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

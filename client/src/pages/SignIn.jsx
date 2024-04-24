import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFaliure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";
import SignUpModal from "./SignUp.jsx";

export default function SignInModal({ onClose }) {
  const [formData, setFormData] = useState({});
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const { loading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();

    console.log("Forgotr Password for: ", formData.email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        dispatch(signInFaliure(data.message));
        return;
      }

      dispatch(signInSuccess(data));

      navigate("/");
    } catch (error) {
      dispatch(signInFaliure(error.message));
    }
  };

  const toggleSignUpModal = () => {
    setShowSignUpModal(!showSignUpModal);
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
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Sign In
          </h3>
          <p className="text-sm text-gray-500">Welcome Back</p>

          <form className="mt-2" onSubmit={handleSubmit}>
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
            {showForgotPassword ? (
              <form onSubmit={handleForgotPassword}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="mt-2 p-3 w-full border rounded"
                  id="email"
                  onChange={handleChange}
                  required
                />
                <button
                  type="submit"
                  className="mt-2 p-3 w-full bg-red-600 text-white rounded"
                >
                  Reset Password
                </button>
              </form>
            ) : (
              <button
                type="button"
                className="text-sm text-blue-600 mt-3 hover:underline"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot Password?
              </button>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 p-3 w-full bg-[#00263D] text-white rounded"
            >
              {loading ? "LOADING..." : "SIGN IN"}
            </button>
            <OAuth />
            <div className="mt-3 text-center">
              <button onClick={toggleSignUpModal} className="text-[#828282]">
                Create account
              </button>
            </div>
          </form>
          {showSignUpModal && <SignUpModal onClose={toggleSignUpModal} />}
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="items-center justify-center p-3 max-w-lg mx-auto">
      <h1 className="font-bold text-3xl text-center my-7">Sign Up</h1>

      <form className="flex flex-col gap-4 ">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
        />

        <button className="bg-blue-300 text-white text-bold rounded-lg max-w-auto p-3 hover:opacity-80 disabled:opacity-70">
          Sign Up
        </button>
      </form>
      <div className="flex my-5 mx-auto max-w-lg gap-2">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-600">Sign in</span>
        </Link>
      </div>
    </div>
  );
}

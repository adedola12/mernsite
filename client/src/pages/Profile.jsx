import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="items-center justify-center p-3 max-w-lg mx-auto">
      <h1 className="font-bold text-3xl text-center my-7">Profile</h1>

      <form className="flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          alt="profileImage"
          className="rounded-full h-32 w-32 self-center object-cover cursor-pointer"
        />

        <input
          type="text"
          value={currentUser.username}
          id="username"
          className="border p-3 rounded-lg"
          disabled
        />
        <input
          type="email"
          value={currentUser.email}
          id="email"
          className="border p-3 rounded-lg"
          disabled
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg"
        />

        <button className="bg-blue-400 text-white text-bold rounded-lg max-w-auto p-3 hover:opacity-80">
          UPDATE
        </button>
        <button className="bg-blue-800 text-white text-bold rounded-lg max-w-auto p-3 hover:opacity-80">
          CREATE LISTING
        </button>

        <div className="flex gap-5 justify-between my-3">
          <Link>
            <p className="text-red-600">Delete Account</p>
          </Link>
          <Link>
            <p className="text-red-600">Sign out</p>
          </Link>
        </div>
      </form>
    </div>
  );
}

import React from "react";

const views = {
  Personal_Details: "PersonalDetails",
  Shop_Details: "ShopDetails",
  Reviews: "Reviews",
  Password: "Password",
};

export default function ProfileSideBar({
  activeView,
  changeActiveView,
  handleSignOut,
  handleDeleteUser,
  handleShowShopDetails,
}) {
  return (
    <div className="w-64 flex-shrink-0 p-5 flex flex-col bg-[#FFFFFF]">
      <h1 className="font-bold text-xl mb-4 border-b pb-4">Profile</h1>
      <div className="flex flex-col gap-2">
        <button
          type="button"
          className={`text-left py-2 px-4 ${
            activeView === views.Personal_Details
              ? "bg-blue-100"
              : "bg-[#ECECEC]"
          }  hover:bg-blue-50 focus:outline-none focus:ring-blue-200 rounded transition-all duration-75 ease-in-out`}
          onClick={() => changeActiveView(views.Personal_Details)}
        >
          Personal Details
        </button>
        <button
          type="button"
          className={`text-left py-2 px-4 ${
            activeView === views.Shop_Details ? "bg-blue-100" : "bg-[#ECECEC]"
          }  hover:bg-blue-50 focus:outline-none focus:ring-blue-200 rounded transition-all duration-75 ease-in-out`}
          onClick={handleShowShopDetails}
        >
          Shop details
        </button>
        <button
          type="button"
          className={`text-left py-2 px-4 ${
            activeView === views.Reviews ? "bg-blue-100" : "bg-[#ECECEC]"
          }  hover:bg-blue-50 focus:outline-none focus:ring-blue-200 rounded transition-all duration-75 ease-in-out`}
          onClick={() => changeActiveView(views.Reviews)}
        >
          Reviews
        </button>
        <button
          type="button"
          className={`text-left py-2 px-4 ${
            activeView === views.Password ? "bg-blue-100" : "bg-[#ECECEC]"
          }  hover:bg-blue-50 focus:outline-none focus:ring-blue-200 rounded transition-all duration-75 ease-in-out`}
          onClick={() => changeActiveView(views.Password)}
        >
          Password
        </button>
      </div>

      <button
        className="text-red-600 mt-auto hover:underline text-left"
        onClick={handleSignOut}
      >
        Log Out
      </button>
      <button
        className="text-red-600 mt-4 hover:underline text-left"
        onClick={handleDeleteUser}
      >
        Delete Account
      </button>
    </div>
  );
}

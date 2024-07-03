import React from "react";
import { Outlet } from "react-router-dom";
import ProfileSideBar from "../../components/ProfileSideBar";

const DashboardDefault = () => {
  return (
    <div className="flex justify-center w-full lg:max-w-[80%] mx-auto p-8 px-5 mt-5">
      <div className="flex gap-6 rounded-lg w-full ">
        <ProfileSideBar />
        <div className="bg-[#FFFFFF] rounded  w-full flex-grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardDefault;

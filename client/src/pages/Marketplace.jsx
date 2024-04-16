import React from "react";

export default function Marketplace() {
  return (
    <div className="">
      <div className="">
        <div
          className="bg-cover bg-center h-[200px]"
          style={{ backgroundImage: `url("background image/Mp1.jpg")` }}
        >
          <h1 className="">Explore Marketplace</h1>
          <form className="flex gap-4">
            <input type="text" className="" />
            <input type="text" className="" />
            <input type="text" className="" />
            <button type="button">Search</button>
          </form>
        </div>
      </div>
      <div className="">
        <div className="">Left Selector</div>
        <div className="">Market Place Items</div>
      </div>
    </div>
  );
}

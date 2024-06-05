// Marketplace.js
import React, { useEffect, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import StateSelector from "../components/StateSelector";
import TypeSelector from "../components/TypeSelector";
import ProductItem from "./productItem";

export default function Marketplace() {
  const [categoryData, setCategoryData] = useState({
    categoryTerm: "",
    location: "",
    type: "",
  });
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    const urlParams = new URLSearchParams(location.search);
    if (category) {
      urlParams.set("categories", category);
    } else {
      urlParams.delete("categories");
    }
    navigate(`?${urlParams.toString()}`, { replace: true });
  };

  const handleStateSelected = (newState) => {
    const urlParams = new URLSearchParams(location.search);
    if (newState) {
      urlParams.set("location", newState);
    } else {
      urlParams.delete("location");
    }
    navigate(`?${urlParams.toString()}`, { replace: true });
  };

  const handleTypeSelected = (newType) => {
    const urlParams = new URLSearchParams(location.search);
    if (newType) {
      urlParams.set("type", newType);
    } else {
      urlParams.delete("type");
    }
    navigate(`?${urlParams.toString()}`, { replace: true });
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const categoryTermUrl = urlParams.get("categories");
    const locationTermUrl = urlParams.get("location");
    const typeTermUrl = urlParams.get("type");

    if (categoryTermUrl || locationTermUrl || typeTermUrl) {
      setCategoryData({
        categoryTerm: categoryTermUrl || "",
        location: locationTermUrl || "",
        type: typeTermUrl || "",
      });
    }

    const fetchCategory = async () => {
      const searchQuery = urlParams.toString();
      try {
        const res = await fetch(`/api/product/getCat?${searchQuery}`);

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("There is an error fetching products:", error);
      }
    };

    fetchCategory();
  }, [location.search]);

  return (
    <div className="bg-[#F5F5F5] flex gap-4 ">
      <div className="pl-[102px] w-full">
        <h2 className="font-semibold text-6xl pt-4 font-[DMSans]">
          Explore Marketplace
        </h2>
        <div className="flex md:flex-row flex-col gap-4 my-5">
          <div className="">
            <div className="w-[80px] h-[80px]">
              <img
                src="..\logo\ADLM Studio Logo PNG-07.png"
                alt="ADLM Logo"
                className="object-contain"
              />
            </div>
            <div>
              {/* CATEGORY LIST SIDE BAR ITEM */}
              <SideBar onCategorySelect={handleCategorySelect} />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="font-semibold text-3xl pt-4">ADLM Marketplace</h2>
            <div className="m-4 flex gap-4 w-full">
              <div className="border bg-[#F1F1F1] rounded-lg p-5 flex gap-6 items-center w-[205px] justify-between">
                <p className="text-[#CFCFCF] font-semibold">Location</p>
                <MdLocationOn className="text-[#CFCFCF] h-[16px] w-[16px]" />
              </div>
              {/* SELECT A STATE TO BE USED TO SEARCH FOR PRODUCT */}
              <StateSelector onStateSelected={handleStateSelected} />
              <TypeSelector onTypeSelected={handleTypeSelected} />
            </div>
            <div className="flex gap-4 flex-wrap p-8 w-full ">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductItem key={product._id} product={product} />
                ))
              ) : (
                <p>No products found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

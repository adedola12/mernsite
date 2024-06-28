// Marketplace.js
import React, { useEffect, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import SideBar from "../components/SideBar";
import StateSelector from "../components/StateSelector";
import TypeSelector from "../components/TypeSelector";
import ProductItem from "./productItem";
import { PiSpinnerBold } from "react-icons/pi";
import useSearchParams from "../hooks/useSearchParams";
import { config } from "../../config";

const MAX_LIMIT = 10;

export default function Marketplace() {
  const [products, setProducts] = useState([]);

  const [isProductLoading, setIsLoadingProduct] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const [params, setParams, queryString] = useSearchParams();

  const handleCategorySelect = (category) => {
    setParams({ ...params, category });
  };

  const handleSubCategorySelect = (subCategory) => {
    setParams({ ...params, subCategory });
  };

  const handleStateSelected = (location) => {
    setParams({ ...params, location });
  };

  const handleTypeSelected = (type) => {
    setParams({ ...params, type });
  };

  useEffect(() => {
    const fetchCategory = async () => {
      const fetchUrl = queryString
        ? `${config.baseUrl}/api/product/getCat?${queryString}&page=${page}&limit=${MAX_LIMIT}`
        : `${config.baseUrl}/api/product/getCat?page=${page}&limit=${MAX_LIMIT}`;

      try {
        setIsLoadingProduct(true);

        const res = await fetch(fetchUrl, {
          credentials: "include"
        });

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();
        setProducts(data?.products);

        if (page >= data.pagination.pages) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("There is an error fetching products:", error);
      } finally {
        setIsLoadingProduct(false);
      }
    };

    fetchCategory();
  }, [queryString]);

  const loadMore = async () => {
    if (!hasMore) return;

    try {
      setIsLoadingProduct(true);

      const fetchUrl = `${config.baseUrl}/api/product/getCat?page=${page}&limit=${MAX_LIMIT}`;
      const res = await fetch(fetchUrl, { credentials: "include"});

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();

      setProducts((prevData) => [...prevData, ...data?.products]);

      if (page >= data.pagination.pages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("There is an error fetching products:", error);
    } finally {
      setIsLoadingProduct(false);
    }
  };

  const handleLoadMoreButton = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (page > 1) {
      loadMore();
    }
  }, [page]);

  return (
    <div className="bg-[#F5F5F5]">
      <div className="w-full lg:max-w-[90%] mx-auto px-2 md:p-5">
        <h2 className="font-semibold text-6xl pt-4 font-[DMSans]">
          Explore Marketplace
        </h2>
        <div className=" gap-4 my-5 grid grid-cols-1 lg:grid-cols-[300px_1fr] w-full">
          <div className="bg-white py-5 px-2 rounded-md">
            <div className="flex flex-col">
              <div className="w-[80px] h-[80px]">
                <img
                  src="..\logo\ADLM Studio Logo PNG-07.png"
                  alt="ADLM Logo"
                  className="object-contain"
                />
              </div>
              <div className="w-full">
                {/* CATEGORY LIST SIDE BAR ITEM */}
                <SideBar
                  onSubCategorySelect={handleSubCategorySelect}
                  onCategorySelect={handleCategorySelect}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 bg-white p-5 rounded-md">
            <h2 className="font-semibold text-3xl ">ADLM Marketplace</h2>
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="border p-2 bg-[#F1F1F1] rounded-lg flex gap-6 items-center md:w-[205px] justify-between">
                <p className="text-[#CFCFCF] font-semibold">Location</p>
                <MdLocationOn className="text-[#CFCFCF] h-[16px] w-[16px]" />
              </div>
              {/* SELECT A STATE TO BE USED TO SEARCH FOR PRODUCT */}
              <StateSelector onStateSelected={handleStateSelected} />
              <TypeSelector onTypeSelected={handleTypeSelected} />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-5  w-full">
              {isProductLoading ? (
                <h2 className="text-center col-span-3  text-lg font-semibold text-slate-500">
                  Loading...
                </h2>
              ) : products.length == 0 ? (
                <p className="text-center col-span-3 text-lg font-semibold text-slate-500">
                  No product found
                </p>
              ) : (
                products.map((product) => (
                  <ProductItem key={product._id} product={product} />
                ))
              )}
            </div>

            {hasMore && (
              <div className="w-full text-center py-10">
                <button
                  disabled={isProductLoading}
                  type="button"
                  onClick={handleLoadMoreButton}
                  className="disabled:cursor-not-allowed px-4 py-3 duration-300 rounded-md bg-black text-white/90 hover:bg-black/80 hover:text-white/80"
                >
                  {isProductLoading ? (
                    <PiSpinnerBold size={18} />
                  ) : (
                    "Explore Marketplace"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Marketplace.js
import React, { useCallback, useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import StateSelector from "../components/StateSelector";
import TypeSelector from "../components/TypeSelector";
import ProductItem from "./productItem";
import { PiSpinnerBold } from "react-icons/pi";
import useSearchParams from "../hooks/useSearchParams";
import _ from "lodash";

import { config } from "../../config";

const MAX_LIMIT = 10;

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isProductLoading, setIsLoadingProduct] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const [params, setParams, queryString] = useSearchParams();

  const handleCategorySelect = (category) => {
    setParams({ category });
  };

  const handleSubCategorySelect = (subCategory) => {
    setParams({ subCategory });
  };

  const handleStateSelected = (location) => {
    setParams({location });
  };

  const handleTypeSelected = (type) => {
    setParams({ type });
  };

  const handleLocationInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const debounceSearch = useCallback(
    _.debounce((query) => {
      setParams({ name: query });
    }, 500),

    []
  );

  useEffect(() => {
    if (searchTerm) {
      debounceSearch(searchTerm);
    } else {
      setSearchTerm("");

      debounceSearch.cancel();
      setParams({ name: null });
    }
  }, [searchTerm, debounceSearch]);

  useEffect(() => {
    console.log(queryString)
    const fetchCategory = async () => {
      const fetchUrl = queryString
        ? `${config.baseUrl}/api/product/getCat?${queryString}&page=${page}&limit=${MAX_LIMIT}`
        : `${config.baseUrl}/api/product/getCat?page=${page}&limit=${MAX_LIMIT}`;

      try {
        setIsLoadingProduct(true);

        const res = await fetch(fetchUrl, {
          credentials: "include",
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

      const res = await fetch(fetchUrl, { credentials: "include" });

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
        <h2 className="font-semibold text-4xl md:text-5xl px-2 pt-4 font-[DMSans]">
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
          <div className="flex flex-col gap-6 bg-white p-5 rounded-md ">
            <h2 className="font-semibold text-3xl ">ADLM Marketplace</h2>
            <div className="flex flex-col md:flex-row gap-4 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 w-full">
                  <input
                    name="name"
                    onChange={handleLocationInput}
                    type="text"
                    placeholder="Product name"
                    className="px-2 py-5 border rounded-md text-[#818181] font-semibold size-full"
                  />

                  <StateSelector onStateSelected={handleStateSelected} />
                  <TypeSelector onTypeSelected={handleTypeSelected} />
                </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-5 w-full">
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

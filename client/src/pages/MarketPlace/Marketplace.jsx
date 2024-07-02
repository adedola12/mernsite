// Marketplace.js
import React, { useCallback, useEffect, useState } from "react";

import { config } from "../../../config";
import ProductItem from "../../components/productItem";
import useSearchParams from "../../hooks/useSearchParams";
import LocationSelector from "../../components/LocationSelector";
import CategorySelector from "../../components/CategorySelector";
import _ from 'lodash';


const MAX_LIMIT = 12;

export default function Marketplace() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")
  const [isloading, setIsLoading] = useState(true);

  const [params, setParams, queryString] = useSearchParams();

  const handleSearchWithQuery = async () => {
    try {
      setIsLoading(true);
      const fetchUrl = queryString
        ? `${config.baseUrl}/api/product/search?${queryString}`
        : `${config.baseUrl}/api/product/search`;

      const response = await fetch(fetchUrl);

      if (!response.ok) {
        throw new Error("Unable to fetch products");
      }

      const { data } = await response.json();
      setSearchResults([...data.products]);
    } catch (error) {
      console.error("Failed to fetch subCategories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const debounceSearch = useCallback(
    _.debounce((query) => {
      setParams({ ...params, name: query });
    }, 500),
  []);


  const handleLocationInput = (event) => {
      setSearchTerm(event.target.value)
  };

  const handleChange = (type, value) => {
    if (type == "location") setParams({ ...params, location: value });
    if (type == "category") setParams({ ...params, category: value });
  };

  useEffect(() => {
    handleSearchWithQuery();
  }, [queryString]);

  useEffect(() => {
    if (searchTerm) {
      debounceSearch(searchTerm);
    } else {
      setSearchTerm("");
      debounceSearch.cancel();
      setParams({ ...params, name: null });
    }
  }, [searchTerm, debounceSearch]);

  return (
    <div className="w-full">
      <div className="w-full">
        <div
          className="relative bg-cover bg-center flex w-full justify-center h-[490px] items-center"
          style={{ backgroundImage: `url("background image/Mp1.jpg")` }}
        >
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="z-10 w-full px-2 md:px-0 max-w-3xl mx-auto">
            <h1 className="font-semibold text-4xl items-center text-white text-center mb-4">
              Explore Marketplace
            </h1>
            <div className="w-full max-w-[959px]">
              <div className="grid md:grid-cols-[auto_1fr_auto] w-full gap-3 bg-white p-4 rounded-lg shadow-md">
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  onChange={handleLocationInput}
                  className="border-2 border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring-1
                  focus:ring-blue-500"
                />
                <div className="grid grid-col-1 md:grid-cols-2 gap-4 w-full">
                  <LocationSelector onStateSelected={handleChange} />
                  <CategorySelector onCategorySelected={handleChange} />
                </div>

                {/* Show Categories and Select Categories */}
                <button
                  type="button"
                  className="bg-[#212121] place-self-end w-full md:w-[129px] place-items-end-end px-0 hover:bg-blue-700 text-white font-bold py-2 rounded-lg"
                  onClick={handleSearchWithQuery}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-center w-full lg:max-w-6xl mx-auto  px-3">
        {/* TODO: ADD SIDEBAR FUNCTIONALITY AND CODE FUNCIONALITY */}
        <div className="bg-white w-full flex-1 rounded-lg lg:p-6 mt-4">
          <div className="p-3 w-full">
            <h2 className="text-2xl font-semibold mb-4 inline-block">
              ADLM Marketplace
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 place-items-center gap-5  w-full">
              {isloading ? (
                <h2 className="text-center col-span-1 sm:col-span-2 lg:col-span-4  text-lg font-semibold text-slate-500">
                  Loading...
                </h2>
              ) : searchResults.length == 0 ? (
                <p className="text-center col-span-1 sm:col-span-2 lg:col-span-4 text-lg font-semibold text-slate-500">
                  No product found
                </p>
              ) : (
                searchResults?.map((product) => (
                  <ProductItem key={product._id} product={product} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

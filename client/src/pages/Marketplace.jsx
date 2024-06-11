import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import ProductItem from "../components/productItem";
import CategorySelector from "../components/CategorySelector";
import LocationSelector from "../components/LocationSelector";

export default function Marketplace() {
 

  const [searchResults, setSearchResults] = useState([]);

  const [isloading, setIsLoading] = useState(true);

  let [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState({});
  const location = useLocation();


  const handleSearchWithQuery = useCallback(async() => {
    try {
      
      let fetchUrl = '/api/product/search';

      if(Object.keys(queryParams).length > 0) {
        const queryString = new URLSearchParams(queryParams).toString();
        fetchUrl = `/api/product/search?${queryString}`;
      }

      setIsLoading(true)
      const response = await fetch(fetchUrl);
      if(!response.ok) {
        throw new Error("")
      }

      const {data} = await response.json();

      setSearchResults([...data.products]);

  } catch (error) {
    console.error("Failed to fetch subCategories:", error);
  } finally {
    setIsLoading(false)
  }
  }, [queryParams])

    useEffect(() => {
    handleSearchWithQuery()
  }, [handleSearchWithQuery])


  const handleLocationInput = (event) => {
    
    const {name, value} = event.target;

    // if(value) {
    //   searchParams.set("location", value)
    //   setSearchParams(searchParams, { replace: true })
    // } else {
    //   searchParams.delete("location");
    //   setSearchParams(searchParams, { replace: true })
    //   return;
    // }
    // setSelectedState(location);
  };

  const handleLocationSelected = (location) => {

    if(location) {
      searchParams.set("location", location)
      setSearchParams(searchParams, { replace: true })
    } else if(location == "City") {
      searchParams.delete("location");
      setSearchParams(searchParams)
      return;
    } else {
      searchParams.delete("location");
      setSearchParams(searchParams)
      return;
    }
    setSelectedState(location);
  };

  const handleCategorySelect = useCallback((category) => {

    if(category) {
      searchParams.set("category", category)
      setSearchParams(searchParams, { replace: true });

    } else if(category == "Categories") {
      searchParams.delete("category")
      setSearchParams(searchParams)
      return;

    } else {
      searchParams.delete("category")
      setSearchParams(searchParams)
      return;
    }
    setSelectedState(location);
  }, []);


  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const params = {};
    for (let [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    setQueryParams(params);
  }, [location.search]);

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
            <div className="w-full max-w-[959px] px-2">
              <div className="grid md:grid-cols-[auto_1fr_auto] w-full gap-3 bg-white p-4 rounded-lg shadow-md">
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  onChange={handleLocationInput}
                  className="border-2 border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring-1
                  focus:ring-blue-500"                  
                />
                 <div className="grid grid-col-2 md:grid-cols-2 gap-4 ">
                    <LocationSelector onStateSelected={handleLocationSelected} />
                    <CategorySelector onCategorySelected={handleCategorySelect} />
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
      <div className="flex flex-col md:flex-row gap-4 items-center max-w-6xl mx-auto ">
        {/* TODO: ADD SIDEBAR FUNCTIONALITY AND CODE FUNCIONALITY */}
        <div className="bg-white flex-1 rounded-lg lg:p-6 mt-4">
          <div className="p-3">
            <h2 className="text-2xl font-semibold mb-4 inline-block">ADLM Marketplace</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 place-items-center gap-5  w-full">           
                {
                  isloading 
                  ? <h2 className="text-center col-span-4  text-lg font-semibold text-slate-500">Loading...</h2>
                  : searchResults.length == 0
                  ?  <p className="text-center col-span-4 text-lg font-semibold text-slate-500">No product found</p>
                  :  searchResults?.map((product) => (
                    <ProductItem key={product._id} product={product} />
                  ))
                }

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

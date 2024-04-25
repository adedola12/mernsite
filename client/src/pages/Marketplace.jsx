import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductItem from "../components/productItem";
import StateSelector from "../components/StateSelector";
import CategorySelector from "../components/CategorySelector";
import LocationSelector from "../components/LocationSelector";

export default function Marketplace() {
  const [categoryData, setCategoryData] = useState({
    locationTerm: "",
    categoryTerm: "",
    priceTerm: "",
    subCategoryTerm: "",
  });

  const [selectedState, setSelectedState] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [triggerSearch, setTriggerSearch] = useState(false);

  const searchArray = searchResults.data;

  console.log(searchArray);

  const location = useLocation();

  const [products, setProducts] = useState([]);
  console.log(products);

  const [categoryList, setCategoryList] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);
  const [categoryUnit, setCategoryUnit] = useState([]);
  const [itemPriceRange, setImagePriceRange] = useState([]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleLocationSelected = (location) => {
    setSelectedState(location);
  };

  const handleSearch = () => {
    setTriggerSearch((prev) => !prev);
  };

  const handlePriceSelected = () => {};

  const handleMaterialSelected = () => {};

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const categoryTermUrl = urlParams.get("categories");
    const priceTermUrl = urlParams.get("price");
    const locationTermUrl = urlParams.get("location");
    const subCategoryTermUrl = urlParams.get("subCategories");

    console.log(categoryTermUrl);

    if (
      categoryTermUrl ||
      priceTermUrl ||
      locationTermUrl ||
      subCategoryTermUrl
    ) {
      setCategoryData({
        categoryTerm: categoryTermUrl || "",
        priceTerm: priceTermUrl || "",
        locationTerm: locationTermUrl || "",
        subCategoryTerm: subCategoryTermUrl || "",
      });
    }

    const fetchCategory = async () => {
      const searchQuery = urlParams.toString();

      console.log(searchQuery);

      try {
        const res = await fetch(`/api/product/getCat?${searchQuery}`);

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();

        setProducts(data);
      } catch (error) {
        console.error("There is an error fetching the product", error);
      }
    };

    fetchCategory();
  }, [location.search]);

  useEffect(() => {
    if (triggerSearch) {
      const performSearch = async () => {
        const urlParams = new URLSearchParams();
        if (selectedState) {
          urlParams.append("location", selectedState);
        }
        if (selectedCategory) {
          urlParams.append("categories", selectedCategory);
        }

        try {
          const res = await fetch(
            `/api/product/search?${urlParams.toString()}`
          );

          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }

          const data = await res.json();
          setSearchResults(data);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };

      performSearch();
    }
    return () => setTriggerSearch(false);
  }, [triggerSearch, selectedState, selectedCategory]);

  return (
    <div className="">
      <div className="">
        <div
          className="relative bg-cover bg-center flex justify-center h-[490px] items-center"
          style={{ backgroundImage: `url("background image/Mp1.jpg")` }}
        >
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="z-10">
            <h1 className="font-semibold text-4xl items-center text-white text-center mb-4">
              Explore Marketplace
            </h1>
            <div className="flex justify-center">
              <div className="flex gap-2 bg-white p-4 rounded-lg shadow-md">
                <input
                  type="text"
                  placeholder="Location"
                  className="border-2 border-gray-300 rounded-lg p-2 mr-2 focus:border-blue-500 focus:ring-1
                  focus:ring-blue-500"
                  disabled
                />
                <LocationSelector onStateSelected={handleLocationSelected} />
                <CategorySelector onCategorySelected={handleCategorySelect} />
                {/* Show Categories and Select Categories */}

                <button
                  type="button"
                  className="bg-[#212121] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row p-4 gap-4 ml-[80px]">
        <div className="bg-white rounded-lg shadow-md p-2 w-full md:w-60">
          <p className="font-semibold text-xl p-3 border-b">
            {/* Category Name */}
            Concrete /m3
          </p>
          <div className="p-3">
            <div className="flex">
              <input
                type="checkbox"
                name="Cement"
                id="matName"
                className="h-5 w-5 text-gray-600 rounded-lg"
              />
              <label htmlFor="matName" className="ml-2 text-gray-700">
                {/* Categogy Breakdown From API  */}
                Cement
              </label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="Sharpsand"
                id="sharpsand"
                className="h-5 w-5 text-gray-600 rounded-lg"
              />
              <label htmlFor="sharpsand" className=" text-gray-700">
                Sharpsand
              </label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="Granite"
                id="granite"
                className="h-5 w-5 text-gray-600 rounded-lg"
              />
              <label htmlFor="granite" className=" text-gray-700">
                Granite
              </label>
            </div>
          </div>
        </div>
        <div className="bg-white flex-1 rounded-lg">
          <div className="p-3">
            <h2 className="text-2xl font-semibold mb-4">ADLM Marketplace</h2>
            <div className="flex gap-4 flex-wrap p-8 w-full">
              {/* {searchResults &&
                searchResults.map((product) => (
                  <ProductItem key={product._id} product={product} />
                ))} */}
              {/* {searchArray.length > 0
                ? searchArray.map((product) => (
                    <ProductItem key={product._id} product={product} />
                  ))
                : products.map((product) => (
                    <ProductItem key={product._id} product={product} />
                  ))} */}

              {searchArray ? (
                searchArray.map((product) => (
                  <ProductItem key={product._id} product={product} />
                ))
              ) : (
                <p>Product not found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

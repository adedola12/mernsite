import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import ProductItem from "../components/productItem";
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

  let [searchParams, setSearchParams] = useSearchParams();

  const searchArray = searchResults.data;

  const location = useLocation();

  const [products, setProducts] = useState([]);

  const [categoryList, setCategoryList] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);
  const [categoryUnit, setCategoryUnit] = useState([]);
  const [itemPriceRange, setImagePriceRange] = useState([]);

  const [subCategories, setSubCategories] = useState([]);

  const handleCategorySelect = async (category) => {

    if(category) {
      searchParams.set("categories", category)
      setSearchParams(searchParams)
    } else {
      searchParams.delete("categories")
      setSearchParams(searchParams)
    }

    setSelectedCategory(category);

    try {
      const response = await fetch(`/api/product/${category}/subcategories`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setSubCategories(result.subCategories); // Assuming the API returns an array of subcategory names
    } catch (error) {
      console.error("Failed to fetch subCategories:", error);
    }
  };

  const handleLocationSelected = (location) => {
    if(!location) {
      searchParams.delete("location");
      setSearchParams(searchParams)
    }else {
      searchParams.set("location", location)
      setSearchParams(searchParams)
    }
    setSelectedState(location);
  };

  const handleSearch = () => {
    setTriggerSearch((prev) => !prev);
  };

  const handlePriceSelected = () => {};

  const handleMaterialSelected = () => {};

  const handleSidebarSearch = async () => {
    const searchParams = new URLSearchParams();
    if (selectedState) {
      searchParams.append("location", selectedState);
    }
    if (selectedCategory) {
      searchParams.append("categories", selectedCategory);
    }
    if (categoryData.subCategoryTerm) {
      searchParams.append("subCategories", categoryData.subCategoryTerm);
    }

    try {
      const response = await fetch(
        `/api/product/search?${searchParams.toString()}`
      );
      const result = await response.json();
      setSearchResults(result.products); // Assuming the API returns the products
    } catch (error) {
      console.error("Error during the search:", error);
    }
  };

  useEffect(() => {
    
    const urlParams = new URLSearchParams(location.search);

    const categoryTermUrl = urlParams.get("categories");
    const priceTermUrl = urlParams.get("price");
    const locationTermUrl = urlParams.get("location");
    const subCategoryTermUrl = urlParams.get("subCategories");


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
        const urlParams = new URLSearchParams(location.search);
        
        if (selectedState) {
          searchParams.set("location", selectedState)
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
  }, [triggerSearch, searchParams, selectedState, selectedCategory]);

  useEffect(() => {
    const fetchProductsBySubCategory = async () => {
      if (!selectedCategory || !categoryData.subCategoryTerm) {
        return; // Do not fetch if no subcategory is selected
      }
      try {
        const response = await fetch(
          `/api/product?category=${selectedCategory}&subCategory=${categoryData.subCategoryTerm}`
        );
        const result = await response.json();
        setProducts(result.products); // Assuming the API returns the products
      } catch (error) {
        console.error("Failed to fetch products by subcategory:", error);
      }
    };

    fetchProductsBySubCategory();
  }, [selectedCategory, categoryData.subCategoryTerm]); // Dependencies array includes the selectedCategory and the subCategoryTerm from the state

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
        {/* TODO: ADD SIDEBAR FUNCTIONALITY AND CODE FUNCIONALITY */}
        <div className="bg-white flex-1 rounded-lg">
          <div className="p-3">
            <h2 className="text-2xl font-semibold mb-4">ADLM Marketplace</h2>
            <div className="flex gap-4 flex-wrap p-8 w-full">
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

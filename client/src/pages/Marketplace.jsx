import React, { useCallback, useEffect, useState } from "react";
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

  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  let [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState({});

  const searchArray = searchResults

  const location = useLocation();

  const [products, setProducts] = useState([]);

  const [categoryList, setCategoryList] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);
  const [categoryUnit, setCategoryUnit] = useState([]);
  const [itemPriceRange, setImagePriceRange] = useState([]);

  const [subCategories, setSubCategories] = useState([]);


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
      setSubCategories([...data.subCategories]);

  } catch (error) {
    console.error("Failed to fetch subCategories:", error);
  } finally {
    setIsLoading(false)
  }
  }, [queryParams])

    useEffect(() => {
    handleSearchWithQuery()
  }, [handleSearchWithQuery])


  const handleLocationSelected = (location) => {

    if(location) {
      searchParams.set("location", location)
      setSearchParams(searchParams, { replace: true })
    } else {
      searchParams.delete("location");
      setSearchParams(searchParams, { replace: true })
      return;
    }
    setSelectedState(location);
  };

  const handleCategorySelect = useCallback(async (category) => {
 
    if(category) {
      searchParams.set("categories", category)
      setSearchParams(searchParams, { replace: true })
    } else {
      searchParams.delete("categories")
      setSearchParams(searchParams, { replace: true })
      return;
    }

  }, [])

  // const handleSearch = () => {
  //   setTriggerSearch((prev) => !prev);
  // };

  // const handlePriceSelected = () => {};

  // const handleMaterialSelected = () => {};

  // const handleSidebarSearch = async () => {
  //   const searchParams = new URLSearchParams();
  //   if (selectedState) {
  //     searchParams.append("location", selectedState);
  //   }
  //   if (selectedCategory) {
  //     searchParams.append("categories", selectedCategory);
  //   }
  //   if (categoryData.subCategoryTerm) {
  //     searchParams.append("subCategories", categoryData.subCategoryTerm);
  //   }

  //   try {
  //     const response = await fetch(
  //       `/api/product/search?${searchParams.toString()}`
  //     );
  //     const result = await response.json();
  //     setSearchResults(result.products); // Assuming the API returns the products
     
  //   } catch (error) {
  //     console.error("Error during the search:", error);
  //   }
  // };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const params = {};
    for (let [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    setQueryParams(params);
  }, [location.search]);

  // const fetchWithQueryParams = async () => {
  //   try {

  //     if(Object.keys(queryParams).length > 0) {
  //       const queryString = new URLSearchParams(queryParams).toString();
        
  //       const fetchUrl = `/api/product/search?${queryString}`;

  //       const response = await fetch(fetchUrl);
  //       if(!response.ok) {
  //         throw new Error("")
  //       }

  //       const data = await response.json();
  //       setSearchResults(data.subCategories);

  //     } else {
  //       const response = await fetch('/api/product/search');
  //       if(!response.ok) {
  //         throw new Error("")
  //       }
  //       const {data} = await response.json();

  //       // setSearchResults(data.products);
  //     }


  //   } catch (error) {
  //     console.error("Error fetching data: ", error);
  //   }
  // }

  // useEffect(() => {
  //   fetchWithQueryParams();
  // }, []);


  // useEffect(() => {
    
  //   const urlParams = new URLSearchParams(location.search);

  //   const categoryTermUrl = urlParams.get("categories");
  //   const priceTermUrl = urlParams.get("price");
  //   const locationTermUrl = urlParams.get("location");
  //   const subCategoryTermUrl = urlParams.get("subCategories");


  //   if (
  //     categoryTermUrl ||
  //     priceTermUrl ||
  //     locationTermUrl ||
  //     subCategoryTermUrl
  //   ) {

  //     setCategoryData({
  //       categoryTerm: categoryTermUrl || "",
  //       priceTerm: priceTermUrl || "",
  //       locationTerm: locationTermUrl || "",
  //       subCategoryTerm: subCategoryTermUrl || "",
  //     });
  //   }

  //   const fetchCategory = async () => {
  //     const searchQuery = urlParams.toString();

  //     try {
  //       const res = await fetch(`/api/product/getCat?${searchQuery}`);

  //       if (!res.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       const data = await res.json();

  //       setProducts(data);
  //       // setSearchResults(data.products);
  //     } catch (error) {
  //       console.error("There is an error fetching the product", error);
  //     }
  //   };

  //   fetchCategory();
  // }, [location.search]);

  // useEffect(() => {
  //   if (triggerSearch) {
  //     const performSearch = async () => {
  //       const urlParams = new URLSearchParams(location.search);
  //       try {
  //         const  url =  `/api/product/search?${urlParams.toString()}`;
  //         const res = await fetch(url);
  //         if (!res.ok) {
  //           throw new Error(`HTTP error! Status: ${res.status}`);
  //         }

  //         const data = await res.json();
  //         setSearchResults(data.data);
  //         // console.log({searchResults})
  //       } catch (error) {
  //         console.error("Error fetching data: ", error);
  //       }
  //     };

  //     performSearch();
  //   }
  //   return () => setTriggerSearch(false);
  // }, [triggerSearch, searchParams, selectedState, selectedCategory]);

  // useEffect(() => {
  //   const fetchProductsBySubCategory = async () => {
  //     if (!selectedCategory || !categoryData.subCategoryTerm) {
  //       return; // Do not fetch if no subcategory is selected
  //     }
  //     try {
  //       const response = await fetch(
  //         `/api/product?category=${selectedCategory}&subCategory=${categoryData.subCategoryTerm}`
  //       );
  //       const result = await response.json();
  //       setProducts(result.products); // Assuming the API returns the products
  //     } catch (error) {
  //       console.error("Failed to fetch products by subcategory:", error);
  //     }
  //   };

  //   fetchProductsBySubCategory();
  // }, [selectedCategory, categoryData.subCategoryTerm]); // Dependencies array includes the selectedCategory and the subCategoryTerm from the state



  return (
    <div className="w-full">
      <div className="w-full">
        <div
          className="relative bg-cover bg-center flex w-full justify-center h-[490px] items-center"
          style={{ backgroundImage: `url("background image/Mp1.jpg")` }}
        >
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="z-10 w-full max-w-3xl mx-auto">
            <h1 className="font-semibold text-4xl items-center text-white text-center mb-4">
              Explore Marketplace
            </h1>
            <div className="flex w-full">
              <div className="flex flex-col md:flex-row w-full flex-wrap gap-2 bg-white p-4 rounded-lg shadow-md">
                <input
                  type="text"
                  placeholder="Location"
                  className="border-2 flex-1 border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring-1
                  focus:ring-blue-500"
                  disabled
                />
                 <div className="flex flex-col md:flex-row gap-4">
                    <LocationSelector onStateSelected={handleLocationSelected} />
                    <CategorySelector onCategorySelected={handleCategorySelect} />
                 </div>

                 {/* Show Categories and Select Categories */}
                <button
                  type="button"
                  className="bg-[#212121] flex-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-5  w-full">
{/* flex items-center gap-4 flex-wrap justify-center */}
             
                {
                  isloading 
                  ? <h2 className="text-center col-span-3  text-lg font-semibold text-slate-500">Loading...</h2>
                  : searchResults.length == 0
                  ?  <p className="text-center col-span-3 text-lg font-semibold text-slate-500">Product not found</p>
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

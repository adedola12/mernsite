// Marketplace.js
import React, { useEffect, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import StateSelector from "../components/StateSelector";
import TypeSelector from "../components/TypeSelector";
import ProductItem from "./productItem";
import { PiSpinnerBold } from "react-icons/pi";

const MAX_LIMIT = 10;

export default function Marketplace() {
  const [categoryData, setCategoryData] = useState({
    categoryTerm: "",
    location: "",
    type: "",
  });

  const [products, setProducts] = useState([]);

  const [isProductLoading, setIsLoadingProduct] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();

  let [urlParams, setUrlParams] = useSearchParams();

  const [queryParams, setQueryParams] = useState({});

  const handleCategorySelect = (category) => {

    if (category) {
      urlParams.set("category", category);
      setUrlParams(urlParams, { replace: true })
    } else {
      urlParams.delete("category");
      setUrlParams(urlParams, { replace: true })
    }
  };

  const handleSubCategorySelect = (subCategory) => {

    if (subCategory) {
      urlParams.set("subCategory", subCategory)
      setUrlParams(urlParams, { replace: true })
    } else {
      urlParams.delete("subCategory");
      setUrlParams(urlParams, { replace: true })
      return;
    }
  };

  const handleStateSelected = (newState) => {
    if (newState) {
      urlParams.set("location", newState)
      setUrlParams(urlParams, { replace: true })
    } else {
      urlParams.delete("location");
      setUrlParams(urlParams, { replace: true })
      return;
    }
  };

  const handleTypeSelected = (newType) => {
    if (newType) {
      urlParams.set("type", newType)
      setUrlParams(urlParams, { replace: true })
    } else {
      urlParams.delete("type");
      setUrlParams(urlParams, { replace: true })
      return;
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const params = {};
    for (let [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    setQueryParams(params);
  }, [location.search]);

  useEffect(() => {

    const fetchCategory = async () => {

      let fetchUrl = `/api/product/getCat?page=${page}&limit=${MAX_LIMIT}`;

      if(Object.keys(queryParams).length > 0) {
        const queryString = new URLSearchParams(queryParams).toString();
        
        fetchUrl = `/api/product/getCat?${queryString}&page=${page}&limit=${MAX_LIMIT}`;
      }
  
      try {

        setIsLoadingProduct(true)

        const res = await fetch(fetchUrl);

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();
        setProducts(data?.products);

        if (page  >= data.pagination.pages) {
          // setPage(Number(data.pagination.page))
          setHasMore(false)
        }

      } catch (error) {
        console.error("There is an error fetching products:", error);
      } finally {
        setIsLoadingProduct(false)
      }
    };

    fetchCategory();
  }, [queryParams]);


  const loadMore = async () => {
  
    if(!hasMore) return;
    
    try {
      console.log("LOAD MORE")
      setIsLoadingProduct(true)
      let fetchUrl = '';
      
      fetchUrl = `/api/product/getCat?page=${page}&limit=${MAX_LIMIT}`;
      const res = await fetch(fetchUrl);

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
 
      setProducts((prevData) => ([...prevData, ...data?.products]));

      if (page >= data.pagination.pages) {
        setHasMore(false);
      }

    } catch (error) {
      console.error("There is an error fetching products:", error);
    } finally {
      setIsLoadingProduct(false)
    }
  }

  const handleLoadMoreButton = () => {
    setPage((prevPage) => prevPage + 1);
  }

  useEffect(() => {
    if(page > 1) {
      loadMore();
    }
  }, [page]);

  return (
    <div className="bg-[#F5F5F5] flex gap-4 ">
      <div className="w-full max-w-[90%] mx-auto ">
        <h2 className="font-semibold text-6xl pt-4  font-[DMSans]">
          Explore Marketplace
        </h2>
        <div className="flex lg:flex-row flex-col gap-4 my-5">
          <div className="bg-white p-5 px-3 rounded-md">
            <div className="w-[80px] h-[80px]">
              <img
                src="..\logo\ADLM Studio Logo PNG-07.png"
                alt="ADLM Logo"
                className="object-contain"
              />
            </div>
            <div >
              {/* CATEGORY LIST SIDE BAR ITEM */}
              <SideBar 
                onSubCategorySelect={handleSubCategorySelect} 
                onCategorySelect={handleCategorySelect} 
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 bg-white p-5 rounded-md">
            <h2 className="font-semibold text-3xl ">ADLM Marketplace</h2>
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="border p-4 bg-[#F1F1F1] rounded-lg flex gap-6 items-center md:w-[205px] justify-between">
                <p className="text-[#CFCFCF] font-semibold">Location</p>
                <MdLocationOn className="text-[#CFCFCF] h-[16px] w-[16px]" />
              </div>
              {/* SELECT A STATE TO BE USED TO SEARCH FOR PRODUCT */}
              <StateSelector onStateSelected={handleStateSelected} />
              <TypeSelector onTypeSelected={handleTypeSelected} />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-5  w-full">
            {
                  isProductLoading
                  ? <h2 className="text-center col-span-3  text-lg font-semibold text-slate-500">Loading...</h2>
                  : products.length == 0
                  ? <p className="text-center col-span-3 text-lg font-semibold text-slate-500">No product found</p>
                  : products.map((product) => <ProductItem key={product._id} product={product} />)
            }
          </div>

          {
            hasMore && (
                <div className="w-full text-center py-10">
                  <button disabled={isProductLoading} type="button" onClick={handleLoadMoreButton} className="disabled:cursor-not-allowed px-4 py-3 duration-300 rounded-md bg-black text-white/90 hover:bg-black/80 hover:text-white/80">
                    { isProductLoading 
                    ? <PiSpinnerBold size={18} />
                    :"Explore Marketplace"
                    }
                  </button>
                </div>
            )
          }

          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

export default function SideBar({ onCategorySelect, onSubCategorySelect }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [activeCategory, setActiveCategory] = useState([]);
  const [subCategory, setSubCategories] = useState([])

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await fetch(`/api/product/getCategories`);

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, []);

  const handleClick = (item) => {
    const tempItem = activeCategory?.includes(item) ? [] : [item];
    setActiveCategory(tempItem);
    onCategorySelect(tempItem[0]);
  };

  const handleSubCategoryClick = (subCategoryName) => {
    const tempItem = subCategory?.includes(subCategoryName) ? [] : [subCategoryName];
    onSubCategorySelect(tempItem[0]);
    setSubCategories(tempItem[0]);
  };



  return (
    <aside className="w-full">
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!!</p>
      )}
      {categories?.length > 0 && !error && (
        <div className="flex flex-col gap-y-2">
          
          {categories?.map((item) => (

            <div className="w-full" key={item.id}>
              <div    
                onClick={() => handleClick(item.category)}
                className={`px-4 py-2 flex items-center justify-between rounded-lg ${
                  activeCategory.includes(item.category)
                    ? "bg-blue-500 text-white"
                    : "bg-[#ECECEC]"
                } hover:opacity-70 cursor-pointer`}
              >
                <p className="mr-20">{item.category}</p>
                <FaArrowRight className="font-normal ml-auto" />
              </div>
                  
              <div
                className={`overflow-hidden duration-300 flex flex-col gap-1 transition-all max-h-0 ${activeCategory.includes(item.category) ? "transition-all duration-300 py-2 max-h-max " : "" } `}
              >
                {
                activeCategory &&
                activeCategory.includes(item.category) &&
                item?.subCategories?.map((sub, index) => (
                    <div                    
                    onClick={() => handleSubCategoryClick(sub)}
                    key={index} className="px-2 py-1 cursor-pointer duration-300 hover:bg-gray-200 rounded-md ">
                      {sub}
                    </div>
                  ))
                }
              </div>
            </div>
          ))}



        </div>
      )}
    </aside>
  );
}

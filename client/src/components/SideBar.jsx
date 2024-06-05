import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

export default function SideBar({ onCategorySelect }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        setError(false); // Reset error state

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
    setActiveCategory(item);
    onCategorySelect(item);
  };

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!!</p>
      )}
      {categories.length > 0 && !error && (
        <div className="my-3">
          {categories.map((item, index) => (
            <div
              key={index}
              onClick={() => handleClick(item)}
              className={`flex items-center justify-between p-4 rounded-lg ${
                activeCategory === item
                  ? "bg-blue-500 text-white"
                  : "bg-[#ECECEC]"
              } gap-5 my-4 hover:opacity-70 cursor-pointer`}
            >
              <p className="mr-[50px]">{item}</p>
              <FaArrowRight className="font-normal" />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function SideBar() {
  const [category, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  console.log(category);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/product/getCategories`);

        const data = await res.json();

        setCategories(data);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchCategory();
  }, []);
  return (
    <main>
      {/* {loading && <p className="text-center my-7 text-2xl">ADLMStudio...</p>} */}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!!</p>
      )}
      {category && !error && (
        <div className="my-3">
          {category.length > 0 &&
            category.map((item, index) => (
              <div
                key={index}
                onClick={() => setActiveCategory(item)}
                className={`flex items-center p-4 rounded-lg ${
                  activeCategory === item
                    ? "bg-blue-500 text-white"
                    : "bg-[#ECECEC] "
                } gap-5 my-4 hover:opacity-70`}
              >
                <p key={index} className="mr-[50px]">
                  {item}
                </p>
                <FaArrowRight className="font-normal" />
              </div>
            ))}
        </div>
      )}
    </main>
  );
}

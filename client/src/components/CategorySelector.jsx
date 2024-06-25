import React, { useEffect, useState } from "react";


export default function CategorySelector({ onCategorySelected }) {
  const [error, setError] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(`/api/product/getCategories`);

        const data = await res.json();
        setCategoryList(data);
      } catch (error) {
        setError(true);
      }
    };

    fetchCategory();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    onCategorySelected("category", e.target.value);
  };

  return (
    <select
      name="categorySelector"
      id="type-selector"
      value={selectedCategory}
      onChange={handleCategoryChange}
      className="border-2 border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring-1
        focus:ring-blue-500"
    >
      <option value="">Categories</option>
      {categoryList?.length &&
        categoryList?.map((category) => (
          <option key={category.category} value={category.category}>
            {category.category}
          </option>
        ))}
    </select>
  );
}

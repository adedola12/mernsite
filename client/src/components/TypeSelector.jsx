import React, { useState } from "react";

export default function TypeSelector({ onTypeSelected }) {
  const Product_Type = ["Material", "Labour"];

  const [selectedType, setSelectedType] = useState("");

  const handleTypeChanged = (e) => {
    setSelectedType(e.target.value);
    onTypeSelected(e.target.value);
  };

  return (
    <div>
      <select
        name="stateSelector"
        id="state-selector"
        value={selectedType}
        onChange={handleTypeChanged}
        className="border bg-[#FFFFFF] rounded-lg p-5 flex gap-6 items-center justify-between w-full"
      >
        <option value="">--Select a product type: </option>
        {Product_Type.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}

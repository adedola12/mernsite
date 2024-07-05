import React, { useState } from "react";

export default function StateSelector({ onStateSelected }) {
  const NIGERIAN_STATES = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
    "FCT",
  ];

  const [selectedState, setSelectedState] = useState("");

  const handleStateChanged = (e) => {
    setSelectedState(e.target.value);
    onStateSelected(e.target.value);
  };

  return (
    <div>
      <select
        name="stateSelector"
        id="state-selector"
        value={selectedState}
        onChange={handleStateChanged}
        className="border bg-[#FFFFFF] rounded-lg p-5 flex gap-6 items-center justify-between w-full"
      >
        <option value="" className="text-gray-600 text-sm">
          City{" "}
        </option>
        {NIGERIAN_STATES.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>
  );
}

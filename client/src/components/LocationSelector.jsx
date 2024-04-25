import React, { useState } from "react";

export default function LocationSelector({ onStateSelected }) {
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
    "Federal Capital Territory || FCT",
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
        className="border-2 border-gray-300 rounded-lg p-2 mr-2 focus:border-blue-500 focus:ring-1
        focus:ring-blue-500"
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

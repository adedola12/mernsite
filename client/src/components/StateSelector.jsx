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
        className="border bg-[#FFFFFF] rounded-lg p-5 mr-2 flex gap-6 items-center w-full justify-between"
      >
        <option value="">--Select a State in Nigeria: </option>
        {NIGERIAN_STATES.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>
  );
}

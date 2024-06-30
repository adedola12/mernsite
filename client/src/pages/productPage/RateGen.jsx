import React from "react";

export default function RateGen() {
  return (
    <div className="bg-white">
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 p-4">
            <h1 className="text-stone-950 text-4xl md:text-6xl font-bold leading-tight">
              Swift Building Estimation with
              <span className="text-yellow-600"> Rate Generator</span>
            </h1>
            <p className="text-zinc-500 text-lg md:text-xl mt-4">
              Rate Generator assists with generating rates or pricing related to
              construction projects. These tools are essential for contractors,
              estimators, and construction companies to streamline the process
              of creating accurate estimates and bids.
            </p>
            <button className="mt-6 px-4 py-3 bg-neutral-800 text-white text-base font-normal rounded-lg">
              Get Started Now
            </button>
          </div>
          <div className="md:w-1/2 p-4">
            <img
              className="w-full h-auto rounded-lg"
              src="https://via.placeholder.com/655x501"
              alt="Rate Generator"
            />
          </div>
        </div>
      </div>

      <div className="bg-cyan-950 py-16">
        <div className="max-w-screen-xl mx-auto p-4 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold">
            Outstanding Features
          </h2>
          <p className="text-zinc-300 text-lg md:text-xl mt-4">
            Rate Generator assists with generating rates or pricing related to
            construction projects. These tools are essential for contractors,
            estimators, and construction companies to streamline the process of
            creating accurate estimates and bids.
          </p>
          <div className="mt-8 flex flex-col md:flex-row justify-center gap-8">
            <FeatureItem title="Cost Estimation" />
            <FeatureItem title="Database Integration" />
            <FeatureItem title="Reports" />
            <FeatureItem title="Material schedule for measured works" />
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto p-4 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow">
          <h2 className="text-4xl font-bold">Reviews</h2>
          <button className="mt-6 px-4 py-3 bg-neutral-800 text-white text-base font-normal rounded-lg">
            Request a demo
          </button>
        </div>
        <div className="w-full md:w-1/2 bg-gray-200 p-8 rounded-lg shadow">
          <h2 className="text-4xl font-bold">Reviews</h2>
          <div className="w-24 h-24 bg-zinc-300 rounded-full mt-4"></div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto p-4 py-16 bg-white">
        <h2 className="text-2xl font-bold mb-8">Other Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProductCard title="Planswift Plugin" />
          <ProductCard title="Planswift Plugin" />
          <ProductCard title="Planswift Plugin" />
          <ProductCard title="Planswift Plugin" />
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <div className="w-16 h-16 border border-gray-200 rounded-full flex items-center justify-center"></div>
          <div className="w-16 h-16 border border-gray-200 rounded-full flex items-center justify-center"></div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ title }) {
  return (
    <div className="flex items-center gap-4">
      <div className="p-4 bg-yellow-600 rounded-full">
        <span className="w-5 h-5 block"></span>
      </div>
      <p className="text-zinc-300 text-base">{title}</p>
    </div>
  );
}

function ProductCard({ title }) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-md">
      <div className="bg-zinc-100 h-48 rounded-lg mb-4"></div>
      <h3 className="text-xl font-normal mb-4">{title}</h3>
      <button className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-zinc-500 text-sm">
        Learn More
      </button>
    </div>
  );
}

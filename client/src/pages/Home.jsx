import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import { config } from "../../config";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(
          `${config.baseUrl}/api/listing/get?offer=true&limit=4`
        );
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch(
          `${config.baseUrl}/api/listing/get?type=rent&limit=4`
        );
        const data = await res.json();
        setRentListings(data);
        fetchSaleListing();
      } catch (error) {}
    };
    const fetchSaleListing = async () => {
      try {
        const res = await fetch(
          `${config.baseUrl}/api/listing/get?type=sale&limit=4`
        );
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {}
    };

    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* Top Section */}
      <div className="flex flex-col gap-6 p-28 px-6 md:px-20 max-w-6xl">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span> <br />{" "}
          place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          ADLM Studio is the best place to find your next dream home fast, easy
          and comfortable.
          <br />
          Our Exper Support are always available
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Lets Start now...
        </Link>
      </div>

      {/* Mid Section */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "contain md:cover",
                }}
                className="h-[100px] md:h-[500px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Listing Result for offer, sale and rent */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className=" ">
            <div className="">
              <h2 className="font-semibold text-2xl text-slate-600">
                Recent offers
              </h2>
              <Link
                to={"/search?offer=true"}
                className="text-blue-700 hover:underline text-sm"
              >
                Show more offers
              </Link>
            </div>
            <div className="flex gap-4 flex-wrap">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=" ">
            <div className="">
              <h2 className="font-semibold text-2xl text-slate-600">
                Recent Sale offers
              </h2>
              <Link
                to={"/search?type=sale"}
                className="text-blue-700 hover:underline text-sm"
              >
                Show more places for sales
              </Link>
            </div>
            <div className="flex gap-4 flex-wrap">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=" ">
            <div className="">
              <h2 className="font-semibold text-2xl text-slate-600">
                Recent Rent offers
              </h2>
              <Link
                to={"/search?type=rent"}
                className="text-blue-700 hover:underline text-sm"
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex gap-4 flex-wrap">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Section */}
    </div>
  );
}

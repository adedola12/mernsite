import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-white mt-3 p-5 ">
      <div className="flex gap-6 p-10 ">
        <div className="flex flex-col gap-3 items-start">
          <img
            src="..\logo\ADLM Studio Logo PNG-07.png"
            alt=""
            className="w-24 h-24 mb-4"
          />
          <span className="text-gray-500 text-sm mb-4 ">
            Be the first to receive all the recent updates, articles, and
            valuable materials.
          </span>
          <div className="">
            <form action="" className="w-full">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email address"
                  id="emailAddress"
                  className="border px-4 py-2"
                />
                <button className="bg-[#00263D] text-white text-center rounded-lg px-6 py-2">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-3 w-full">
          <div className="flex flex-wrap justify-between px-10 py-8">
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h2 className="font-bold text-md mb-2">Product</h2>
              <ul className="list-none mb-0">
                <li>
                  <Link
                    to="/planswift-plugin"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Planswift Plugin
                  </Link>
                </li>
                <li>
                  <Link
                    to="/rate-generator"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Rate Generator
                  </Link>
                </li>
                <li>
                  <Link
                    to="/bim-course"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    BIM Course
                  </Link>
                </li>
                <li>
                  <Link
                    to="/bim-course-mep"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    BIM Course on MEP
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ms-project-course"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    MS Project Course
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h2 className="font-bold text-md mb-2">Support</h2>
              <ul className="list-none mb-0">
                <li>
                  <Link
                    to="/blog"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about-us"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/help"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Help
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/training"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Training
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h2 className="font-bold text-md mb-2">Legal</h2>
              <ul className="list-none mb-0">
                <li>
                  <Link
                    to="/terms-of-service"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Terms of service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/why-adlm"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Why ADLM Studio
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h2 className="font-bold text-md mb-2">Contact</h2>
              <ul className="list-none mb-0">
                <li>
                  <a
                    href="tel:+2348106503524"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    +234-81-0650-3524
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:admin@adlmstudio.net"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    admin@adlmstudio.net
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:help@adlmstudio.com"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    help@adlmstudio.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="border border-y-2 border-x-0 py-5 flex justify-between">
          <h3 className="font-semibold text-[18px]">Connect with us</h3>
          <div className="">
            <ul className="list-none mb-0 flex flex-row gap-5">
              <li>
                <a
                  href="https://twitter.com/Adlm_studio"
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/adlm_studio/?hl=en"
                  className="text-pink-600 hover:text-gray-800 text-sm"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/message/HS7PK467KV53I1"
                  className="text-green-600 hover:text-gray-800 text-sm"
                >
                  Whatsapp
                </a>
              </li>
              <li>
                <a
                  href="https://web.facebook.com/ADLMStudio"
                  className="text-blue-600 hover:text-gray-800 text-sm"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/c/DLMStudiosBIMTrainer?sub_confirmation=1"
                  className="text-red-600 hover:text-gray-800 text-sm"
                >
                  Youtube
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between my-5 items-center">
          <ul className="list-none  flex gap-6">
            <li>
              <Link
                to="/terms-of-service"
                className="text-gray-600 hover:text-gray-800 text-sm"
              >
                Terms of service
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="text-gray-600 hover:text-gray-800 text-sm"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/why-adlm"
                className="text-gray-600 hover:text-gray-800 text-sm"
              >
                Why ADLM Studio
              </Link>
            </li>
          </ul>

          <span className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
            {" "}
            C 2024 ADLM All rights reserved
          </span>
        </div>
      </div>
    </div>
  );
}

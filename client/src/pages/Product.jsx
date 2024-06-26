import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductItem from "../components/productItem";
import { FaCar, FaPhone } from "react-icons/fa";
import { MdAddLocation } from "react-icons/md";
import { config } from "../../config";

export default function Product() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState(null);
  const [allProduct, setAllProduct] = useState([]);
  const [showNumber, setShowNumber] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchProductandUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${config.baseUrl}/api/product/get/${params.productId}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await res.json();

        if (data.success === false) {
          setError(true);
          return;
        } else {
          setProduct(data.product);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProductandUser();
  }, [params.productId]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!product || !product.categories) {
        return;
      }

      try {
        const response = await fetch(
          `${config.baseUrl}/api/product/getProduct/category/${product._id}`, {
            credentials: "include"
          }
        );
        if (!response.ok) {
          throw new Error("Related Categories cannot be fetched");
        }
        const data = await response.json();

        setAllProduct(data.products);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
      }
    };

    fetchRelatedProducts();
  }, [product]);

  const showMobile = () => {
    setShowNumber((prevState) => !prevState);
    console.log(product.userRef.mobileNumber);
  };

  // if (loading) return <div>Loading...</div>;
  if (loading)
    return <div className="h-full text-center p-4 md:px-10">Loading...</div>;
  if (!product)
    return (
      <div className="h-full text-center p-4 md:px-10">No product found.</div>
    );
  if (error)
    return (
      <div className="h-full text-center p-4 md:px-10">
        Error loading product details
      </div>
    );

  return (
    <main className="min-h-screen">
      <div className="m-5 md:m-20 lg:m-[100px] text-2xl">
        <div className="flex gap-4 flex-col lg:flex-row justify-between">
          <div className="flex flex-col  gap-4 w-full lg:w-2/3">
            <div className="bg-[#FFFFFF]  p-4 rounded-lg">
              <h1 className="my-5 font-normal text-xl">Product Details</h1>
              <div className="flex flex-col-reverse md:flex-row gap-3">
                <div className="flex flex-row flex-wrap md:flex-col gap-3">
                  {product.imageUrls.slice(0, 3).map((url, index) => (
                    <div
                      key={index}
                      className="w-[120px] h-[120px] border-2 border-gray-200 overflow-hidden"
                    >
                      <img
                        src={url}
                        alt={`product image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex-grow border-2 border-gray-200 overflow-hidden">
                  <img
                    src={product.imageUrls[0]}
                    alt="main product"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="my-5">
                <h1 className="font-bold text-2xl text-gray-900">
                  {product.name}
                </h1>

                {product?.subCategories?.length && (
                  <div className="flex flex-col gap-2 mb-4">
                    <h2 className="text-base font-semibold text-gray-700">
                      Sub Categories:
                    </h2>
                    <div className="flex items-center flex-wrap gap-2 ">
                      {product.subCategories.map((sub, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-600 p-1 px-1.5 rounded-md"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <p className="text-sm">Review</p>
              </div>
            </div>
            <div className="bg-[#FFFFFF] p-4 rounded-lg">
              <h1 className="text-[18px] font-semibold">Description</h1>
              <p className="font-normal text-wrap flex-wrap text-[14px] text-[#828282] mb-5">
                {product.description}
              </p>
            </div>
          </div>
          <div className="flex  flex-col gap-4 w-full lg:w-1/3">
            <div className="bg-[#FFFFFF] p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold">Seller Profile</h2>
              <div className="flex items-center mb-4 mt-3">
                <img
                  src={product.userRef.avatar}
                  alt={product.userRef.username}
                  className="rounded-full h-16 w-16 object-cover mr-4"
                />
                <Link to={`/sellerShop/${product.userRef._id}`} className="">
                  <p className="text-md font-semibold text-[#828282] text-xl">
                    {product.userRef.username}
                  </p>
                  <span className="bg-green-100 text-green-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                    Verified
                  </span>
                </Link>
              </div>
              <div className="flex gap-2 flex-col">
                <Link
                  to={`https://wa.me/+2340${product.userRef.mobileNumber}?text=I am intrested in your product ${product.name} listed on the ADLM Marketplace`}
                  className="bg-[#00263D] text-[#FFFFFF] p-3 text-[14px] text-center  text-sm rounded-lg font-medium"
                >
                  Text on Whatsapp
                </Link>

                <button
                  type="button"
                  className="bg-gray-300 text-black py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center"
                  onClick={showMobile}
                >
                  {showNumber ? (
                    `${
                      product?.userRef?.mobileNumber
                        ? "+2340" + product?.userRef?.mobileNumber
                        : "No number"
                    }`
                  ) : (
                    <>
                      <FaPhone className="mr-2" /> See Number
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="bg-[#FFFFFF] p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold pb-4">Location</h2>
              <div className="flex gap-2 flex-col">
                <div className="flex justify-between items-center border rounded-lg p-3 text-sm ">
                  <p className="text-gray-700 w-full outline-none">
                    {product.location}
                  </p>
                  <MdAddLocation className="text-gray-400" />
                </div>

                <div className="flex justify-between items-center border rounded-lg p-3 text-sm">
                  <p className="text-gray-700 w-full outline-none">
                    {product.storeAddress}
                  </p>
                  <MdAddLocation className="text-gray-400" />
                </div>

                <div className="flex items-center gap-4">
                  <div className="border p-3 rounded-lg">
                    <MdAddLocation className="text-gray-400 " />
                  </div>
                  <div className="">
                    <p className="text-sm font-medium">Store Address</p>
                    <span className="text-sm">
                      {product.storeAddress || "Address not available"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="border p-3 rounded-lg">
                    <FaCar className="text-gray-400" />
                  </div>
                  <div className="">
                    <p className="text-sm font-medium">Delivery</p>
                    <span className="text-[14px] flex-wrap">
                      Delivery takes place upon buyer request
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-3 bg-[#FFFFFF] w-full p-8">
        <h2 className="font-bold text-[24px]">Product like this</h2>
        <div className="my-6 overflow-hidden grid grid-cols-1 grid-rows-2 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4">
          {allProduct &&
            allProduct.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
        </div>
      </div>
    </main>
  );
}

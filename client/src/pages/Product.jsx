import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductItem from "../components/productItem";
import { FaCar, FaPhone } from "react-icons/fa";
import { MdAddLocation } from "react-icons/md";

export default function Product() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState(null);
  const [allProduct, setAllProduct] = useState([]);
  const [showNumber, setShowNumber] = useState(false);

  console.log(product);
  console.log(allProduct);

  const params = useParams();

  useEffect(() => {
    const fetchProductandUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/product/get/${params.productId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        } else {
          setProduct(data.product);
        }
      } catch (error) {
        setError(true);
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
          `/api/product/getProduct/category/${product.categories}`
        );
        if (!response.ok) {
          throw new Error("Related Categories cannot be fetched");
        }
        const data = await response.json();

        setAllProduct(data.products);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchRelatedProducts();
  }, [product]);

  const showMobile = () => {
    setShowNumber(!showNumber);
    console.log(product.userRef.mobileNumber);
  };

  // if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading product details</div>;
  if (!product) return <div>No product found.</div>;

  return (
    <main className="min-h-screen">
      <div className="m-[100px] text-2xl">
        <div className=" flex gap-4 justify-between">
          <div className="flex flex-col gap-4">
            <div className="bg-[#FFFFFF] p-4 rounded-lg">
              <h1 className="my-5 font-normal text-xl">Product Details</h1>
              <div className=" flex gap-3">
                <div className="flex flex-col gap-3">
                  <div className="w-[120px] h-[120px] border-2 border-gray-200 overflow-hidden">
                    <img
                      src={product.imageUrls[0]}
                      alt="product image 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-[120px] h-[120px] border-2 border-gray-200 overflow-hidden">
                    <img
                      src={product.imageUrls[1]}
                      alt="product image 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-[120px] h-[120px] border-2 border-gray-200 overflow-hidden">
                    <img
                      src={product.imageUrls[2]}
                      alt="product image 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-grow border-2 border-gray-200 overflow-hidden">
                  <img
                    src={product.imageUrls[0]}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="my-5">
                <h1 className="font-bold text-3xl">{product.name}</h1>
                {/* Create the number of star rating */}
                <p className="text-sm">Review</p>
              </div>
            </div>
            <div className="bg-[#FFFFFF] p-4 rounded-lg">
              <h1 className="text-[18px] my-5 font-semibold">Description</h1>
              <p className="font-normal text-wrap flex-wrap text-[14px] text-[#828282] mb-5">
                {product.description}
              </p>
            </div>
          </div>
          <div className="md:flex flex-col gap-4 hidden">
            <div className="bg-[#FFFFFF] p-4 rounded-lg shadow-sm md:w-[330px]">
              <h2 className="text-lg font-semibold">Seller Profile</h2>
              <div className="flex items-center mb-4 mt-3">
                <img
                  src={product.userRef.avatar}
                  alt={product.userRef.username}
                  className="rounded-full h-16 w-16 object-cover mr-4"
                />
                <div className="">
                  <p className="text-md font-semibold text-[#828282] text-xl">
                    {product.userRef.username}
                  </p>
                  <span className="bg-green-100 text-green-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                    Verified
                  </span>
                </div>
              </div>
              <div className="flex gap-2 flex-col">
                <Link
                  to={`https://wa.me/+2340${product.userRef.mobileNumber}?text=I am intrested in your product ${product.name} listed on the ADLM Marketplace`}
                  className="bg-[#00263D] text-[#FFFFFF] p-3 text-[14px] text-center  text-sm rounded-lg font-medium"
                >
                  Text on Whatsapp
                </Link>

                <button
                  className="bg-gray-300 text-black py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center"
                  onClick={showMobile}
                >
                  {showNumber ? (
                    `+2340${product.userRef.mobileNumber}`
                  ) : (
                    <>
                      <FaPhone className="mr-2" /> See Number
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="bg-[#FFFFFF] p-4 rounded-lg shadow-sm md:w-[330px]">
              <h2 className="text-lg font-semibold pb-4">Location</h2>
              <div className="flex gap-2 flex-col">
                <div className="flex justify-between items-center border rounded-lg p-3 text-sm ">
                  <p className="text-gray-700 w-full outline-none">
                    {product.location}
                  </p>
                  <MdAddLocation className="text-gray-400" />
                </div>

                <div className="flex justify-between items-center border rounded-lg p-3 text-sm">
                  <p className="text-gray-700 w-full outline-none">City</p>
                  <MdAddLocation className="text-gray-400" />
                </div>

                <div className="flex items-center gap-4">
                  <div className=" border p-3 rounded-lg">
                    <MdAddLocation className="text-gray-400 " />
                  </div>
                  <div className="">
                    <p className="text-sm font-medium">Store Address</p>
                    <span className="text-sm">
                      {product.userRef.storeAddress || "Address not available"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className=" border p-3 rounded-lg">
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
        <Link className="my-6 flex gap-4">
          {allProduct &&
            allProduct.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
        </Link>
      </div>
    </main>
  );
}

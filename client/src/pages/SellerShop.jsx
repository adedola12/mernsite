import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductItem from "../components/productItem";
import { FaPhone } from "react-icons/fa";

export default function SellerShop() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [allProduct, setAllProduct] = useState([]);
  const [showNumber, setShowNumber] = useState(false);
  const { userId } = useParams();

  console.log(products);
  console.log(allProduct);
  console.log(userId);
  console.log(user);

  useEffect(() => {
    const fetchProductsByUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/product/user/${userId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        } else {
          setProducts(data.products);
          setLoading(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/user/${userId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }
        const data = await res.json();

        console.log(data);

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        } else {
          setUser(data);
          setLoading(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchProductsByUser();
    fetchUserInfo();
  }, [userId]);

  const showMobile = () => {
    setShowNumber(!showNumber);
  };

  return (
    <main className="min-h-screen">
      <div className="m-[100px] text-2xl">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <div className="bg-[#FFFFFF] p-4 rounded-lg shadow-sm md:w-[330px]">
              <h2 className="text-3xl font-semibold">Seller Profile</h2>

              <div className="flex items-center mb-3">
                <img
                  src={user?.avatar ?? "default-avatar-url.jpg"}
                  alt="NA"
                  className="rounded-full h-16 w-16 object-cover mr-4"
                />
                <div className="">
                  <p className="text-lg font-semibold text-[#828282]">
                    {user?.username ?? "Store Owner"}
                  </p>
                  <span className="bg-green-100 text-green-700 text-lg font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                    Verified
                  </span>
                </div>
              </div>

              <div className="flex gap-2 flex-col mt-10">
                <Link
                  to={`https://wa.me/+2340${user?.mobileNumber}?text=I am intrested in your product in your store ${user?.username} listed on the ADLM Marketplace`}
                  className="bg-[#00263D] text-[#FFFFFF] p-3 text-[14px] text-center  text-lg rounded-lg font-medium"
                >
                  Text on Whatsapp
                </Link>
                <button
                  className="bg-gray-300 text-black py-2 px-4 rounded-lg text-lg font-medium flex items-center justify-center"
                  onClick={showNumber}
                >
                  Show Number
                </button>
              </div>
            </div>

            <div class="w-[740px] h-[334px] relative bg-white rounded-lg">
              <div class="left-[23px] top-[85px] absolute flex-col justify-start items-start gap-4 inline-flex">
                <div class="justify-center items-center gap-4 inline-flex">
                  <div class="h-12 px-4 pt-4 pb-[15px] rounded-xl border border-stone-300 justify-center items-center flex">
                    <div class="grow shrink basis-0 self-stretch justify-between items-center inline-flex">
                      <div class="text-stone-300 text-sm font-normal font-['Calibri']">
                        Location
                      </div>
                      <div class="w-4 h-4 px-0.5 py-[1.33px] justify-center items-center flex">
                        <div class="w-3 h-[13.33px] relative"></div>
                      </div>
                    </div>
                  </div>
                  <div class="h-12 px-4 pt-4 pb-[15px] rounded-xl border border-stone-300 justify-center items-center flex">
                    <div class="grow shrink basis-0 self-stretch justify-between items-center inline-flex">
                      <div class="text-stone-300 text-sm font-normal font-['Calibri']">
                        {/* <TODO>ADD DYNAMIC SELLER CITY</TODO> */}
                        City
                      </div>
                      <div class="w-4 h-4 px-1 justify-center items-center flex"></div>
                    </div>
                  </div>
                </div>
                <div class="w-[237px] px-4 pt-4 pb-[15px] rounded-xl border border-stone-300 justify-center items-center inline-flex">
                  <div class="grow shrink basis-0 self-stretch justify-between items-start inline-flex">
                    <div class="text-stone-300 text-sm font-normal font-['Calibri']">
                      Categories
                    </div>
                    <div class="w-4 h-4 px-1 justify-center items-center flex"></div>
                  </div>
                </div>
                <div class="w-[129px] h-12 bg-neutral-800 rounded-lg justify-start items-start inline-flex">
                  <div class="w-[129px] h-12 px-5 py-3 bg-neutral-800 rounded-lg shadow border justify-center items-center gap-2 flex">
                    <div class="text-white text-sm font-normal font-['DM Sans'] leading-[16.80px]">
                      Search
                    </div>
                  </div>
                </div>
              </div>
              <div class="p-4 left-0 top-0 absolute border-b border-gray-200 justify-start items-center gap-2.5 inline-flex">
                <div class="text-neutral-800 text-lg font-medium font-['DM Sans'] leading-snug">
                  Product Categories
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div class="h-[931px] relative bg-white">
              <div class="w-[1061px] p-4 left-0 top-0 absolute border-b border-gray-200 justify-start items-center gap-2.5 inline-flex">
                <div class="text-neutral-800 text-lg font-medium font-['DM Sans'] leading-snug">
                  Shop
                </div>
              </div>

              <div className="left-[16px] top-[82px] absolute flex flex-wrap gap-4 p-8 w-full">
                {products &&
                  products.map((product) => (
                    <ProductItem key={product._id} product={product} />
                  ))}
              </div>

              <div class="h-[77px] py-2 left-0 top-[854px] absolute bg-white flex-col justify-center items-center gap-2 inline-flex">
                <div class="w-[1059px] h-px justify-center items-center inline-flex">
                  <div class="w-[1059px] self-stretch bg-gray-100"></div>
                </div>
                <div class="self-stretch py-2 bg-white justify-center items-center gap-6 inline-flex">
                  <div class="justify-start items-center gap-6 flex">
                    <div class="w-[87px] h-5 pl-[5px] pr-2 pt-0.5 pb-px justify-center items-center flex">
                      <div class="text-center text-black text-sm font-normal font-['DM Sans'] leading-[16.80px]">
                        Page 1 of 30
                      </div>
                    </div>
                  </div>
                  <div class="justify-center items-center gap-4 flex">
                    <div class="flex-col justify-start items-start inline-flex">
                      <div class="px-3 py-2 bg-white rounded-lg border border-gray-300 flex-col justify-center items-center gap-2.5 flex">
                        <div class="justify-center items-center gap-2 inline-flex">
                          <div class="w-5 h-5 relative"></div>
                          <div class="text-center text-slate-700 text-sm font-normal font-['DM Sans'] leading-[16.80px]">
                            Previous
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="flex-col justify-start items-start inline-flex">
                      <div class="h-9 px-3 py-2 bg-white rounded-lg border border-gray-300 flex-col justify-center items-center gap-2.5 flex">
                        <div class="justify-center items-center gap-2 inline-flex">
                          <div class="text-center text-slate-700 text-sm font-normal font-['DM Sans'] leading-[16.80px]">
                            Next
                          </div>
                          <div class="w-5 h-5 relative"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div class="h-[695px] px-[202px] pt-[77px] pb-[76.04px] bg-white rounded-lg justify-center items-center inline-flex">
              <div class="self-stretch flex-col justify-start items-start gap-8 inline-flex">
                <div class="border-b border-zinc-600 justify-center items-center gap-10 inline-flex">
                  <div class="text-center text-zinc-600 text-base font-normal font-['DM Sans'] leading-tight">
                    Reviews
                  </div>
                  <div class="pb-1.5 border-b border-orange-600 justify-center items-center gap-2.5 flex">
                    <div class="text-center text-orange-600 text-base font-normal font-['DM Sans'] leading-tight">
                      Add a review
                    </div>
                  </div>
                </div>
                <div class="flex-col justify-start items-start gap-4 flex">
                  <div class="flex-col justify-start items-start gap-2 flex">
                    <div class="text-center text-neutral-800 text-base font-normal font-['DM Sans'] leading-tight">
                      Rating
                    </div>
                    <div class="justify-start items-start gap-2 inline-flex">
                      <div class="w-[26.83px] h-[26.96px] relative"></div>
                      <div class="w-[26.83px] h-[26.96px] relative"></div>
                      <div class="w-[26.83px] h-[26.96px] relative"></div>
                      <div class="w-[26.83px] h-[26.96px] relative"></div>
                      <div class="w-[26.83px] h-[26.96px] relative"></div>
                    </div>
                  </div>
                  <div class="flex-col justify-start items-start gap-8 flex">
                    <div class="flex-col justify-start items-start gap-10 flex">
                      <div class="flex-col justify-start items-start gap-8 flex">
                        <div class="justify-start items-start gap-5 inline-flex">
                          <div class="flex-col justify-start items-start gap-4 inline-flex">
                            <div class="text-center text-neutral-800 text-base font-normal font-['DM Sans'] leading-tight">
                              Name
                            </div>
                            <div className="">
                              <input
                                type="text"
                                className="w-80 h-16 pl-[13px] pr-[270px] rounded-2xl border border-stone-300 justify-start items-center inline-flex   self-stretch text-stone-300 text-normal font-normal font-['Calibri']"
                                placeholder="Name"
                              />
                            </div>
                          </div>
                          <div class="flex-col justify-start items-start gap-4 inline-flex">
                            <div class="text-center text-neutral-800 text-base font-normal font-['DM Sans'] leading-tight">
                              Email
                            </div>
                            <div className="">
                              <input
                                type="email"
                                name=""
                                id=""
                                className="w-80 h-16 pl-[13px] pr-[270px] rounded-2xl border border-stone-300 justify-start items-center inline-flex   self-stretch text-stone-300 text-normal font-normal font-['Calibri']"
                                placeholder="Email"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="flex-col justify-start items-start gap-4 flex">
                          <div class="text-center text-neutral-800 text-base font-normal font-['DM Sans'] leading-tight">
                            Your Review
                          </div>
                          <div className="">
                            <input
                              type="text"
                              className="w-[659px] h-[161px] pl-[19px] pr-[576px] pt-4 pb-32 rounded-2xl border border-stone-300 justify-start items-center inline-flex text-stone-300 text-normal font-normal font-['Calibri']"
                              placeholder="Your Review"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="h-12 px-6 py-[14.50px] bg-cyan-950 rounded-lg flex-col justify-center items-center gap-2.5 flex">
                        <div class="justify-center items-center gap-2 inline-flex">
                          <button class="text-center text-white text-base font-lg font-['DM Sans'] leading-tight">
                            Submit Reviews
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
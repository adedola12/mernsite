import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SellerShop() {
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
          throw new Error("Fetch to fetch");
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
  return (
    <main className="min-h-screen">
      <div className="m-[100px] text-2xl">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <div className="w-[305px] h-[334px] relative bg-white rounded-lg border">
              <div className="w-[305px] p-4 left-0 top-0 absolute border-b border-gray-200 justify-start items-center gap-2.5 inline-flex">
                <div className="text-neutral-800 text-lg font-medium font-['DM Sans'] leading-snug">
                  Seller Profile
                </div>
              </div>
              <div className="left-[16px] top-[71px] absolute justify-start items-center gap-2 inline-flex">
                <img
                  src=""
                  alt=""
                  className="w-14 h-14 rounded-[200px] border border-white"
                />
                <div className="flex-col justify-start items-start gap-1 inline-flex">
                  <div className="text-zinc-500 text-lg font-normal font-['DM Sans'] leading-snug">
                    Store Name
                  </div>
                  <div className="px-3 py-1 bg-emerald-50 rounded-xl flex-col justify-center items-center gap-2 flex">
                    <div className="justify-center items-center gap-1 inline-flex">
                      <div className="text-center text-green-800 text-sm font-normal font-['DM Sans'] leading-[16.80px]">
                        Verified
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="left-[16px] top-[191px] absolute flex-col justify-start items-start gap-2 inline-flex">
                <div className="w-[273px] justify-start items-start gap-2 inline-flex">
                  <div className="pl-[90px] pr-[70px] pt-4 pb-[15px] bg-cyan-950 rounded-lg justify-end items-center flex">
                    <div className="text-white text-sm font-normal font-['DM Sans'] leading-[16.80px]">
                      Text on Whatsapp
                    </div>
                  </div>
                </div>
                <div className="px-[88px] pt-4 pb-[15px] bg-neutral-100 rounded-lg border border-gray-200 justify-center items-center inline-flex">
                  <div className="self-stretch justify-start items-start gap-[3px] inline-flex">
                    <div className="w-4 h-4 p-[1.33px] justify-center items-center flex"></div>
                    <div className="text-neutral-800 text-sm font-normal font-['DM Sans'] leading-[16.80px]">
                      See Number
                    </div>
                  </div>
                </div>
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
              <div class="w-[740px] p-4 left-0 top-0 absolute border-b border-gray-200 justify-start items-center gap-2.5 inline-flex">
                <div class="text-neutral-800 text-lg font-medium font-['DM Sans'] leading-snug">
                  Product Categories
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div class="w-[1059px] h-[931px] relative bg-white">
              <div class="w-[1061px] p-4 left-0 top-0 absolute border-b border-gray-200 justify-start items-center gap-2.5 inline-flex">
                <div class="text-neutral-800 text-lg font-medium font-['DM Sans'] leading-snug">
                  Shop
                </div>
              </div>
              <div class="left-[16px] top-[82px] absolute justify-start items-start gap-4 inline-flex">
                <div class="w-[331px] pt-3 pb-[25px] bg-white rounded-lg shadow border flex-col justify-start items-center gap-[34px] inline-flex">
                  <div class="w-[299px] h-[212px] relative bg-black/opacity-20 rounded-tl rounded-tr rounded-bl rounded-br-md"></div>
                  <div class="self-stretch h-[65px] flex-col justify-start items-start gap-4 inline-flex">
                    {/* PRODUCTITEM  CARD */}
                  </div>
                </div>
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
            <div class="w-[1064px] h-[695px] px-[202px] pt-[77px] pb-[76.04px] bg-white rounded-lg justify-center items-center inline-flex">
              <div class="self-stretch flex-col justify-start items-start gap-8 inline-flex">
                <div class="w-[660px] border-b border-zinc-600 justify-center items-center gap-10 inline-flex">
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
                                className="w-80 h-16 pl-[13px] pr-[270px] rounded-2xl border border-stone-300 justify-start items-center inline-flex   self-stretch text-stone-300 text-sm font-normal font-['Calibri']"
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
                                className="w-80 h-16 pl-[13px] pr-[270px] rounded-2xl border border-stone-300 justify-start items-center inline-flex   self-stretch text-stone-300 text-sm font-normal font-['Calibri']"
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
                              className="w-[659px] h-[161px] pl-[19px] pr-[576px] pt-4 pb-32 rounded-2xl border border-stone-300 justify-start items-center inline-flex text-stone-300 text-sm font-normal font-['Calibri']"
                              placeholder="Your Review"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="h-12 px-6 py-[14.50px] bg-cyan-950 rounded-lg flex-col justify-center items-center gap-2.5 flex">
                        <div class="justify-center items-center gap-2 inline-flex">
                          <button class="text-center text-white text-base font-normal font-['DM Sans'] leading-tight">
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

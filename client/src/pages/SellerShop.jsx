import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductItem from "../components/productItem";
import { FaPhone, FaStar } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import StarRating from "../components/Rating";
import { useSelector } from "react-redux";
import { config } from "../../config";

const reviewTabs = [
  { id: 0, name: "Reviews"},
  { id: 1, name: "Add Review"},
];

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


export default function SellerShop() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [allProduct, setAllProduct] = useState([]);
  const [showNumber, setShowNumber] = useState(false);
  const { userId } = useParams();

  const [selectedTab, setSelectedTab] = useState(1);
  const [rating, setRating] = useState(0);
  

  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [category, setCategory] = useState({
    location: "",
    city: "",
    category: "",
  });
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleCategoryFormInputChange = (event) => {
    const {name, value} = event.target;
    setCategory((prevState) => ({...prevState, [name]: value}));
  }

  const handleSubmitReview = async (event) => {

    event.preventDefault();

    const reviewFormData = {
      ...reviewForm,
      rating,
      seller:userId,
    }

    if(!currentUser?._id) {
      alert("Please sign in");
      return;
    }


    try {

        setLoading(true);
        const response = await fetch(`${config.baseUrl}/api/review/create-review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewFormData),
       credentials: 'include'
      });

      const data = await response.json();

      if(!response.ok) {
        setError(data.message);
      }

      setReviewForm({ name: "", email: "", message: "", });
      setRating(0)

    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleReviewFormInputChange = (event) => {
    const {name, value} = event.target;
    setReviewForm((prevState) => ({...prevState, [name]: value}));
  }

  const handleSubmitCategory = (event) => {
    event.preventDefault();
    try {
    } catch (error) {
    }
  }




  useEffect(() => {
    const fetchProductsByUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${config.baseUrl}/api/product/user/${userId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();

        if (data.success === false) {
          setError(true);
          return;
        } else {
          console.log(data.products)
          setProducts(data.products);
        }
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false);
      }
    };
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${config.baseUrl}/api/user/${userId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }
        const data = await res.json();

        if (data.success === false) {
          setError(true);
          return;
        } else {
          setUser(data);
        }
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByUser();
    fetchUserInfo();
  }, [userId]);

  const handleShowNumber = () => {
    setShowNumber((prevState) => !prevState);
  };

  return (
    <main className="min-h-screen">
      <div className="text-2xl max-w-screen-lg mx-auto my-10">
        <div className="flex flex-col gap-4 w-full px-4">

        <div className="grid grid-cols-1 lg:grid-cols-[300px,_1fr] gap-3">
              <div className="bg-white pb-3 rounded-lg shadow-sm">

                <div className="border-b py-4">
                    <h2 className="text-neutral-800 px-4 text-lg font-medium font-['DM Sans'] leading-snug">
                    Seller Profile
                    </h2>
                  </div>

                <div className="flex items-center mb-3 p-3 gap-x-2">
                  <img
                    src={user?.avatar ?? "default-avatar-url.jpg"}
                    alt="NA"
                    className="rounded-full h-16 w-16 object-cover"
                  />
                  <div className="">
                    <p className="text-base font-semibold leading-none text-[#828282]">
                      {user?.username ?? "Store Owner"}
                    </p>
                    <span className="bg-green-100 text-green-700 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                      Verified
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 flex-col mt-10 px-3">
                  <Link
                    to={`https://wa.me/+2340${user?.mobileNumber}?text=I am intrested in your product in your store ${user?.username} listed on the ADLM Marketplace`}
                    className="bg-[#00263D] text-[#FFFFFF] p-3 text-[14px] text-center  text-lg rounded-lg font-medium"
                  >
                    Text on Whatsapp
                  </Link>

                  <button
                    type="button"
                      className="bg-gray-300 text-black py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center"
                      onClick={handleShowNumber} >
                      {showNumber ? (
                        `${products[0]?.userRef?.mobileNumber ? "+2340"+products[0]?.userRef?.mobileNumber : "No number"}`
                      ) : (
                        <>
                          <FaPhone className="mr-2" /> See Number
                        </>
                      )}
                    </button>

                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm">
                <div className="border-b py-4">
                    <h2 className="text-neutral-800 px-4 text-lg font-medium font-['DM Sans'] leading-snug">
                      Product Categories
                    </h2>
                  </div>
                  <form onSubmit={handleSubmitCategory} className="w-full">
                    <div className="p-4 grid md:grid-cols-2 gap-4">
                      <div className="relative">
                          <input type="text" value={category.location} onChange={handleCategoryFormInputChange} name="location" placeholder="location" className="border rounded-md py-2 focus:outline-none text-stone-500 text-base font-normal font-['Calibri'] w-full px-4 pr-10 " />
                          <MdLocationOn size={15} className="absolute text-gray-400 top-2/4 right-4 -translate-y-2/4 " />
                      </div>
                      <div className="relative">
                          
                          <select
                              name="city"
                              value={category.city}
                              className="border rounded-md py-2 focus:outline-none text-stone-500 text-base font-normal font-['Calibri']  w-full px-4 "
                              onChange={handleCategoryFormInputChange}
                            >
                              <option className="text-gray-400">select a city</option>
                              {NIGERIAN_STATES.map((state) => (
                                <option key={state} value={state}>
                                  {state}
                                </option>
                              ))}
                          </select>
                      </div>
                      <div className="relative">
                         
                          <select
                              name="category"
                              value={category.category}
                              className="border rounded-md py-2 focus:outline-none text-stone-500 text-base font-normal font-['Calibri']  w-full px-4 "
                              onChange={handleCategoryFormInputChange}
                            >
                              <option className="text-gray-400">select a category</option>
                              {NIGERIAN_STATES.map((state) => (
                                <option key={state} value={state}>
                                  {state}
                                </option>
                              ))}
                          </select>
                      </div>

                    </div>

                    {/* <div className="p-4">
                      <button type="button" className="py-2 rounded-md text-white cursor-pointer text-base px-6 bg-black/90">Search</button>
                    </div> */}



                    
                    
                  </form>
              </div>
        </div>

        <div className="flex flex-col w-full gap-3 bg-white rounded-md ">

            <div className="border-b py-4">
              <h2 className="text-neutral-800 px-4 text-lg font-medium font-['DM Sans'] leading-snug">
                Shop
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-4">
                {products &&
                  products.map((product) => (
                    <ProductItem key={product._id} product={product} />
                  ))}
             </div>

             <div className="border-t p-5 text-base text-gray-400 gap-2 gap-y-4 flex flex-wrap items-center justify-center mt-5 ">
                  <div className="">
                    Page of 1 of 30
                  </div>
                  <div className="flex gap-2">
                    <button className="border cursor-pointer border-transparent rounded-md px-2 h-8 w-8 flex items-center justify-center ">1</button>
                    <button className="border cursor-pointer border-transparent rounded-md px-2 h-8 w-8 flex items-center justify-center ">2</button>
                    <button className="border cursor-pointer border-yellow-500 rounded-md px-2 h-8 w-8 flex items-center justify-center ">3</button>
                    <button className="border cursor-pointer border-transparent rounded-md px-2 h-8 w-8 flex items-center justify-center ">...</button>
                    <button className="border cursor-pointer border-transparent rounded-md px-2 h-8 w-8 flex items-center justify-center ">4</button>
                  </div>
                  <div className="flex gap-2">
                    <button className="border w-[105px] rounded-md px-3 py-1.5"> - Previous</button>
                    <button className="border w-[105px] rounded-md px-3 py-1.5">Next + </button>
                  </div>
             </div>

        </div>

        <div className="flex flex-col w-full gap-3 bg-white rounded-md ">

            <div className="w-full px-4 lg:w-[70%] mx-auto py-5 mt-10">
              <div className="flex items-center justify-center gap-4 text-base border-b">
                {
                  reviewTabs.map((tab) => (
                    <button onClick={() => setSelectedTab(tab.id)} key={tab.id} className={`border-b ${selectedTab === tab.id ? "border-orange-600 text-orange-600" : "border-transparent text-black/80"} `}>{tab.name}</button> 
                  ))
                }

              </div>

              {
                selectedTab === 0 && (
                  <>
                    <div className="flex flex-col flex-wrap gap-2 my-6">
                      <h2 className="text-base text-gray-500">REVIEWS SECTION</h2>
                      <div className="flex flex-col w-full gap-3 ">
                        
                      </div>
                    </div>         
                  
                  </>
                )
              }

              {
                selectedTab === 1 && (
                  <>
                    <div className="flex flex-col flex-wrap gap-2 my-6">
                      <h2 className="text-base text-gray-500">Rating</h2>
                      <div className="flex items-center flex-wrap gap-3 ">
                        <StarRating rating={rating} setRating={setRating} />
                      </div>
                    </div>

                    <form  className="w-full flex flex-col gap-y-4 my-10">
                        <div className="grid lg:grid-cols-2 gap-3">
                          <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-base">Name</label>
                            <input id="name" name="name" type="text" value={reviewForm.name} onChange={handleReviewFormInputChange} required placeholder="Name" className="border rounded-lg w-full px-3 py-3 text-base" />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-base">Email</label>
                            <input id="email" name="email" type="email" value={reviewForm.email} onChange={handleReviewFormInputChange} required placeholder="Email" className="border rounded-lg w-full px-3 py-3 text-base" />
                          </div>
                        </div>
                        <div className="w-full">
                          <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="text-base">Your Review</label>
                            <textarea rows={6} id="message" name="message" value={reviewForm.message} onChange={handleReviewFormInputChange} placeholder="Your review" className="border resize-y rounded-lg w-full px-3 py-3 text-base"></textarea>
                          </div>
                        </div>

                        <div className="w-full">
                          <button type="button" disabled={loading} onClick={ loading ? () => {} : handleSubmitReview } className="disabled:cursor-not-allowed text-center px-6 py-[14.50px] bg-cyan-950 rounded-lg inline-block text-white text-base font-lg font-['DM Sans'] leading-tight">
                            {loading ? "Submitting..." : "Submit Reviews" }
                          </button>
                        </div>

                    </form>              
                  
                  </>
                )
              }
              
            </div>

        </div>

 
        </div>
      </div>
    </main>
  );
}
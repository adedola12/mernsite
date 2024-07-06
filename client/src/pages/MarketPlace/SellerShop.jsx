import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaPhone } from "react-icons/fa";
import { useSelector } from "react-redux";
import { config } from "../../../config";
import CategorySelector from "../../components/CategorySelector";
import LocationSelector from "../../components/LocationSelector";
import ProductItem from "../../components/productItem";
import StarRating from "../../components/Rating";
import useSearchParams from "../../hooks/useSearchParams";
import _ from "lodash";
import toast from "react-hot-toast";

const reviewTabs = [
  { id: 0, name: "Reviews" },
  { id: 1, name: "Add Review" },
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
  "FCT",
];

const MAX_REVIEW = 5;

export default function SellerShop() {
  // Review API GET REQUEST:: /api/review/get-reviews/sellerId

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [sellerProducts, setSellerProducts] = useState([]);
  const [isSellerProductsLoading, setIsSellerProductsLoading] = useState([]);
  const [user, setUser] = useState(null);
  const [showNumber, setShowNumber] = useState(false);
  const { userId } = useParams();
  const [selectedTab, setSelectedTab] = useState(1);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const [params, setParams, queryString] = useSearchParams();

  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const currentUser = useSelector((state) => state.user.currentUser);

  const handleLocationInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchSellerProducts = async () => {
    const sellerId = userId;

    if (!sellerId) {
      alert("SellerId is required");
      return;
    }

    try {
      setIsSellerProductsLoading(true);
      const fetchUrl = queryString
        ? `${config.baseUrl}/api/product/seller-products/${sellerId}?${queryString}`
        : `${config.baseUrl}/api/product/seller-products/${sellerId}`;

      const response = await fetch(fetchUrl, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Unable to fetch products");
      }

      const { data } = await response.json();

      setSellerProducts(data?.products);
    } catch (error) {
    } finally {
      setIsSellerProductsLoading(false);
    }
  };

  const fetchProductsByUser = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${config.baseUrl}/api/product/user/${userId}`, {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await res.json();
      setProducts(data.products);
      setUser(data.user);
    } catch (error) {
      setError(true);
      throw new Error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (event) => {
    event.preventDefault();

    const reviewFormData = {
      ...reviewForm,
      rating,
      sellerId: userId,
    };

    if (!currentUser?._id) {
      alert("Please sign in");
      return;
    }

    if (
      !reviewForm.email ||
      !reviewForm.message ||
      !reviewForm.name ||
      !rating
    ) {
      alert("All form fields are required to submit a review");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${config.baseUrl}/api/review/create-review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewFormData),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
      }

      setReviewForm({ name: "", email: "", message: "" });
      setRating(0);
      toast.success("Review submitted");
    } catch (error) {
      console.log(error);
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewFormInputChange = (event) => {
    const { name, value } = event.target;
    setReviewForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmitCategory = (event) => {
    event.preventDefault();
    try {
    } catch (error) {}
  };

  const handleChange = (type, value) => {
    if (type === "location") setParams({ location: value });
    if (type === "category") setParams({ category: value });
  };

  const debounceSearch = useCallback(
    _.debounce((query) => {
      setParams({ name: query });
    }, 500),
    []
  );

  useEffect(() => {
    fetchSellerProducts();
  }, [queryString]);

  useEffect(() => {
    fetchProductsByUser();
  }, [userId]);

  const handleShowNumber = () => {
    setShowNumber((prevState) => !prevState);
  };

  useEffect(() => {
    if (searchTerm) {
      debounceSearch(searchTerm);
    } else {
      setSearchTerm("");

      debounceSearch.cancel();
      setParams({ name: null });
    }
  }, [searchTerm, debounceSearch]);

  // New useEffect to fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${config.baseUrl}/api/review/get-reviews/${userId}`,
          {
            credentials: "include",
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await res.json();

        console.log(data.reviews);
        setReviews(data.reviews);
      } catch (error) {
        setError(true);
        throw new Error("Failed to fetch reviews");
      } finally {
        setLoading(false);
      }
    };

    if (selectedTab === 0) {
      fetchReviews();
    }
  }, [selectedTab, userId]);

  return (
    <div className="">
      <div className="text-2xl max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-4 w-full px-4 my-20 lg:mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-[300px,_1fr] gap-3">
            <div className="bg-white pb-3 rounded-lg shadow-sm">
              <div className="border-b py-4">
                <h2 className="text-neutral-800 px-4 text-lg font-medium font-['DM Sans'] leading-snug">
                  Seller Profile
                </h2>
              </div>

              <div className="flex items-center mb-3 p-3 gap-x-2">
                <img
                  src={
                    user?.avatar
                      ? user?.avatar
                      : "https://placehold.jp/150x150.png"
                  }
                  alt="NA"
                  className="rounded-full h-16 w-16 object-cover"
                />
                <div className="">
                  <p className="text-base font-semibold leading-none text-[#828282]">
                    {user?.username ?? "Store Owner"}
                  </p>
                  <span className="bg-green-100 text-green-700 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                    verified
                  </span>
                </div>
              </div>

              <div className="flex gap-2 flex-col mt-10 px-3">
                <Link
                  to={
                    user?.mobileNumber
                      ? `https://wa.me/+2340${user?.mobileNumber}?text=I am intrested in your product in your store ${user?.username} listed on the ADLM Marketplace`
                      : "#"
                  }
                  className="bg-[#00263D] text-[#FFFFFF] p-3 text-[14px] text-center  text-lg rounded-lg font-medium"
                >
                  Text on Whatsapp
                </Link>

                <button
                  type="button"
                  className="bg-gray-300 text-black py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center"
                  onClick={handleShowNumber}
                >
                  {showNumber ? (
                    `${
                      user?.mobileNumber
                        ? "+2340" + user?.mobileNumber
                        : "No number"
                    }`
                  ) : (
                    <>
                      <FaPhone className="mr-2" /> <span>See Number</span>
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
                <div className="w-full md:max-w-[959px] px-2">
                  <div className="grid grid-cols-1 text-base md:grid-cols-12 w-full gap-3 bg-white p-4 rounded-lg">
                    <input
                      type="text"
                      name="location"
                      placeholder="Product name"
                      onChange={handleLocationInput}
                      className="border-2 col-span-1 md:col-span-4 border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring-1
                          focus:ring-blue-500"
                    />
                    <div className="w-full col-span-1 md:col-span-8 grid grid-col-1 md:grid-cols-2 gap-4 ">
                      <LocationSelector onStateSelected={handleChange} />
                      <CategorySelector onCategorySelected={handleChange} />
                    </div>

                    {/* Show Categories and Select Categories */}
                  </div>
                </div>
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
              {sellerProducts && sellerProducts?.length > 0 ? (
                sellerProducts.map((product) => (
                  <ProductItem key={product._id} product={product} />
                ))
              ) : (
                <p className="text-center col-span-12 text-lg font-semibold text-slate-500">
                  {isSellerProductsLoading ? "Loading..." : "No product found"}
                </p>
              )}
            </div>

            <div className="border-t p-5 text-base text-gray-400 gap-2 gap-y-4 flex flex-wrap items-center justify-center mt-5 ">
              <div className="">Page of 1 of 30</div>
              <div className="flex gap-2">
                <button className="border cursor-pointer border-transparent rounded-md px-2 h-8 w-8 flex items-center justify-center ">
                  1
                </button>
                <button className="border cursor-pointer border-transparent rounded-md px-2 h-8 w-8 flex items-center justify-center ">
                  2
                </button>
                <button className="border cursor-pointer border-yellow-500 rounded-md px-2 h-8 w-8 flex items-center justify-center ">
                  3
                </button>
                <button className="border cursor-pointer border-transparent rounded-md px-2 h-8 w-8 flex items-center justify-center ">
                  ...
                </button>
                <button className="border cursor-pointer border-transparent rounded-md px-2 h-8 w-8 flex items-center justify-center ">
                  4
                </button>
              </div>
              <div className="flex gap-2">
                <button className="border w-[105px] rounded-md px-3 py-1.5">
                  {" "}
                  - Previous
                </button>
                <button className="border w-[105px] rounded-md px-3 py-1.5">
                  Next +{" "}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full gap-3 bg-white rounded-md ">
            <div className="w-full px-4 lg:w-[70%] mx-auto py-5 mt-10">
              <div className="flex items-center justify-center gap-4 text-base border-b">
                {reviewTabs.map((tab) => (
                  <button
                    onClick={() => setSelectedTab(tab.id)}
                    key={tab.id}
                    className={`border-b ${
                      selectedTab === tab.id
                        ? "border-orange-600 text-orange-600"
                        : "border-transparent text-black/80"
                    } `}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>

              {selectedTab === 0 && (
                <>
                  <div className="flex flex-col flex-wrap gap-2 my-6">
                    <h2 className="text-base text-gray-500">REVIEWS SECTION</h2>
                    {reviews.length > 0 ? (
                      reviews.map((review) => (
                        <div
                          key={review.id}
                          className="flex gap-3 p-2 items-center border-2 rounded-full"
                        >
                          <div className="rounded-lg my-2 flex items-start">
                            <img
                              src={review.seller.avatar}
                              alt="customer img"
                              className="rounded-full w-12 h-12 mr-4"
                            />
                          </div>
                          <div className="">
                            <p className="text-xl font-semibold">
                              {review.name}
                            </p>
                            <div className="flex items-center flex-wrap gap-3">
                              <StarRating rating={review.rating} readOnly />
                            </div>
                            <p className="text-xl">{review.comment}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="">No reviews yet.</p>
                    )}
                  </div>
                </>
              )}

              {selectedTab === 1 && (
                <>
                  <div className="flex flex-col flex-wrap gap-2 my-6">
                    <h2 className="text-base text-gray-500">Rating</h2>
                    <div className="flex items-center flex-wrap gap-3 ">
                      <StarRating rating={rating} setRating={setRating} />
                    </div>
                  </div>

                  <form className="w-full flex flex-col gap-y-4 my-10">
                    <div className="grid lg:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-base">
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={reviewForm.name}
                          onChange={handleReviewFormInputChange}
                          required
                          placeholder="Name"
                          className="border rounded-lg w-full px-3 py-3 text-base"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-base">
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={reviewForm.email}
                          onChange={handleReviewFormInputChange}
                          required
                          placeholder="Email"
                          className="border rounded-lg w-full px-3 py-3 text-base"
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-base">
                          Your Review
                        </label>
                        <textarea
                          rows={6}
                          id="message"
                          name="message"
                          value={reviewForm.message}
                          onChange={handleReviewFormInputChange}
                          placeholder="Your review"
                          className="border resize-y rounded-lg w-full px-3 py-3 text-base"
                        ></textarea>
                      </div>
                    </div>

                    <div className="w-full">
                      <button
                        type="button"
                        disabled={loading}
                        onClick={loading ? () => {} : handleSubmitReview}
                        className="disabled:cursor-not-allowed text-center px-6 py-[14.50px] bg-cyan-950 rounded-lg inline-block text-white text-base font-lg font-['DM Sans'] leading-tight"
                      >
                        {loading ? "Submitting..." : "Submit Reviews"}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

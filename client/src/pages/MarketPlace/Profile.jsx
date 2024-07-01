import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import {
  deleteUserFaliure,
  deleteUserStart,
  deleteUserSuccess,
  signOutFaliure,
  signOutSuccess,
  signOutUser,
  updateUserFaliure,
  updateUserStart,
  updateUserSuccess,
} from "../../redux/user/userSlice";
import { config } from "../../../config";

const views = {
  Personal_Details: "PersonalDetails",
  Shop_Details: "ShopDetails",
  Reviews: "Reviews",
  Password: "Password",
};

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileError, setFileError] = useState(false);
  const [formData, setFormData] = useState({});

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [showProductError, setShowProductError] = useState(false);

  const [userListings, setUserListings] = useState([]);
  const [userProducts, setUserProducts] = useState([]);

  const [deleteListingError, setDeleteListingError] = useState(false);
  const [deleteProductError, setDeleteProductError] = useState(false);
  const [editListingError, setEditListingError] = useState(false);
  const [editProductError, setEditProductError] = useState(false);

  const [activeView, setActiveView] = useState(views.Personal_Details);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      handleFileUpload();
    }
  }, [file]);

  useEffect(() => {
    setFormData({
      username: currentUser?.username || "",
      email: currentUser?.email || "",
      password: "",
      password_confirmation: "",
      bio: currentUser?.bio || "",
    });
  }, [currentUser]);

  useEffect(() => {
    if (activeView === views.Shop_Details) {
      handleShowProduct();
      handleShowListing();
    }
  }, [activeView]);

  const handleFileUpload = () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());

      const res = await fetch(
        `${config.baseUrl}/api/user/update/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFaliure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(
        `${config.baseUrl}/api/user/delete/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFaliure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(deleteUserFaliure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUser());

      const res = await fetch(`${config.baseUrl}/api/auth/signout`);

      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutFaliure("Unable to signout"));
        return;
      }

      dispatch(signOutSuccess(data));

      navigate("/");
    } catch (error) {
      dispatch(signOutFaliure(error.message));
    }
  };

  const handleShowListing = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(
        `${config.baseUrl}/api/user/listings/${currentUser._id}`
      );
      const data = await res.json();

      if (data.success === false) {
        setShowListingError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingError(true);
    }
  };

  const handleShowProduct = async () => {
    try {
      setShowProductError(false);

      const res = await fetch(
        `${config.baseUrl}/api/user/products/${currentUser._id}`
      );
      const data = await res.json();

      if (data.success === false) {
        setShowProductError(true);
        return;
      }

      setUserProducts(data);
    } catch (error) {
      setShowProductError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      setDeleteListingError(false);

      const res = await fetch(
        `${config.baseUrl}/api/listing/delete/${listingId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (data.success === false) {
        setDeleteListingError(true);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      setDeleteListingError(true);
    }
  };

  const handleProductDelete = async (productId) => {
    try {
      setDeleteProductError(false);

      const res = await fetch(
        `${config.baseUrl}/api/product/delete/${productId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (data.success === false) {
        setDeleteProductError(true);
        return;
      }

      setUserProducts((prev) =>
        prev.filter((product) => product._id !== productId)
      );
    } catch (error) {
      setDeleteProductError(true);
    }
  };

  const handleListingEdit = async (listingId) => {
    try {
      setEditListingError(false);

      const res = await fetch(
        `${config.baseUrl}/api/listing/update/${listingId}`,
        {
          method: "POST",
        }
      );
      const data = await res.json();

      if (data.success === false) {
        setEditListingError(true);
        return;
      }
    } catch (error) {
      setEditListingError(true);
    }
  };

  const handleProductEdit = async (productId) => {
    try {
      setEditProductError(false);

      const res = await fetch(
        `${config.baseUrl}/api/product/update/${productId}`,
        {
          method: "POST",
        }
      );
      const data = await res.json();

      if (data.success === false) {
        setEditProductError(true);
        return;
      }
    } catch (error) {
      setEditProductError(true);
    }
  };

  const changeActiveView = (newView) => {
    setActiveView(newView);
  };

  return (
    <div className="flex justify-center w-full p-0 px-0  min-h-screen">
      <div className="flex gap-6 shadow rounded-lg w-full p-5">
        <div className="bg-[#FFFFFF] rounded  w-full p-5 flex-grow">
          {activeView === views.Personal_Details && (
            <>
              <h2 className="font-semibold ">Personal Details</h2>
              <form
                className="flex flex-col gap-4 md:p-10"
                onSubmit={handleSubmit}
              >
                <input
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  ref={fileRef}
                  hidden
                  accept="image/.*"
                />
                <img
                  onClick={() => fileRef.current.click()}
                  src={formData?.avatar || currentUser?.avatar}
                  alt="profileImage"
                  className="rounded-full h-28 w-28 self-center object-cover cursor-pointer"
                />
                <p className="self-center text-sm">
                  {fileError ? (
                    <span className="text-red-700">
                      Image Upload Error (Image must be less than 2MB)
                    </span>
                  ) : filePerc > 0 && filePerc < 100 ? (
                    <span className="text-blue-700">{`Uploading ${filePerc}%`}</span>
                  ) : filePerc === 100 ? (
                    <span className="text-green-800">
                      {" "}
                      Image Upload Complete
                    </span>
                  ) : (
                    ""
                  )}
                </p>

                <input
                  type="text"
                  defaultValue={currentUser?.username}
                  id="username"
                  className="border p-3 rounded-lg"
                  onChange={handleChange}
                />
                <input
                  type="email"
                  defaultValue={currentUser?.email}
                  id="email"
                  className="border p-3 rounded-lg"
                  onChange={handleChange}
                />

                <input
                  type="text"
                  defaultValue={currentUser?.storeAddress}
                  placeholder="Store Address"
                  id="storeAddress"
                  className="border p-3 rounded-lg"
                  onChange={handleChange}
                />
                <input
                  type="tel"
                  defaultValue={currentUser?.mobileNumber}
                  placeholder="Mobile Number"
                  id="mobileNumber"
                  className="border p-3 rounded-lg"
                  onChange={handleChange}
                />

                <button
                  className="bg-[#00263D] text-white text-bold rounded-lg max-w-auto p-3 hover:opacity-80 uppercase"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Please wait" : "Update"}
                </button>
              </form>
            </>
          )}
          {activeView === views.Shop_Details && (
            <>
              <h2 className="font-semibold ">Shop Details</h2>
              <div>
                <h3 className="font-bold text-lg">Your Listings</h3>
                {showListingError ? (
                  <span className="text-red-600">Failed to load listings</span>
                ) : (
                  <div>
                    {userListings.map((listing) => (
                      <div key={listing._id} className="mb-4">
                        <Link to={`/listing/${listing._id}`}>
                          <h4 className="font-semibold">{listing.title}</h4>
                        </Link>
                        <p>{listing.description}</p>
                        <button
                          onClick={() => handleListingDelete(listing._id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Delete Listing
                        </button>
                        <button
                          onClick={() => handleListingEdit(listing._id)}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Edit Listing
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg">Your Products</h3>
                {showProductError ? (
                  <span className="text-red-600">Failed to load products</span>
                ) : (
                  <div>
                    {userProducts.map((product) => (
                      <div key={product._id} className="mb-4">
                        <Link to={`/product/${product._id}`}>
                          <h4 className="font-semibold">{product.name}</h4>
                        </Link>
                        <p>{product.description}</p>
                        <button
                          onClick={() => handleProductDelete(product._id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Delete Product
                        </button>
                        <button
                          onClick={() => handleProductEdit(product._id)}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Edit Product
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
          {activeView === views.Reviews && (
            <>
              <h2 className="font-semibold ">Reviews</h2>
              {/* Add your review content here */}
            </>
          )}
          {activeView === views.Password && (
            <>
              <h2 className="font-semibold ">Password</h2>
              <form
                className="flex flex-col gap-4 p-10"
                onSubmit={handleSubmit}
              >
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  className="border p-3 rounded-lg"
                  onChange={handleChange}
                />

                <button
                  className="bg-[#00263D] text-white text-bold rounded-lg max-w-auto p-3 hover:opacity-80 uppercase"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Please wait" : "Update"}
                </button>
              </form>
            </>
          )}
        </div>
        <div className="w-[300px] rounded p-5">
          <ul className="flex flex-col gap-4">
            <li
              className={`cursor-pointer ${
                activeView === views.Personal_Details
                  ? "text-blue-500"
                  : "text-gray-700"
              }`}
              onClick={() => changeActiveView(views.Personal_Details)}
            >
              Personal Details
            </li>
            <li
              className={`cursor-pointer ${
                activeView === views.Shop_Details
                  ? "text-blue-500"
                  : "text-gray-700"
              }`}
              onClick={() => changeActiveView(views.Shop_Details)}
            >
              Shop Details
            </li>
            <li
              className={`cursor-pointer ${
                activeView === views.Reviews ? "text-blue-500" : "text-gray-700"
              }`}
              onClick={() => changeActiveView(views.Reviews)}
            >
              Reviews
            </li>
            <li
              className={`cursor-pointer ${
                activeView === views.Password
                  ? "text-blue-500"
                  : "text-gray-700"
              }`}
              onClick={() => changeActiveView(views.Password)}
            >
              Password
            </li>
            <li
              className="text-red-500 cursor-pointer"
              onClick={handleDeleteUser}
            >
              Delete Account
            </li>
            <li
              className="text-gray-700 cursor-pointer"
              onClick={handleSignOut}
            >
              Sign Out
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

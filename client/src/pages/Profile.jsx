import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
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
} from "../redux/user/userSlice";
import ProfileSideBar from "../components/ProfileSideBar";

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
  const [userProduct, setUserProducts] = useState([]);

  const [deleteListingError, setDeleteListingError] = useState(false);
  const [deleteProductError, setDeleteProductError] = useState(false);
  const [editListingError, setEditListingError] = useState(false);
  const [editProductError, setEditProductError] = useState(false);

  console.log(userListings);
  console.log(userProduct);

  const [activeView, setActiveView] = useState(views.Personal_Details);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      handlefileUpload();
    }
  }, [file]);

  const handlefileUpload = () => {
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

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFaliure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFaliure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

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

      const res = await fetch("/api/auth/signout");

      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutFaliure(data.message));
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
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
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

      console.log(`current user ID : ${currentUser._id}`);

      const res = await fetch(`/api/user/products/${currentUser._id}`);
      const data = await res.json();

      if (data.success === false) {
        setShowProductError(true);
        return;
      }

      console.log(data);
      setUserProducts(data);
    } catch (error) {
      setShowProductError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      setDeleteListingError(false);

      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success === false) {
        setDeleteListingError(true);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listing)
      );
    } catch (error) {
      setDeleteListingError(true);
    }
  };

  const handleProductDelete = async (productId) => {
    try {
      setDeleteProductError(false);

      const res = await fetch(`/api/product/delete/${productId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success === false) {
        setDeleteProductError(true);
        return;
      }

      setUserProducts((prev) =>
        prev.filter((product) => product._id !== product)
      );
    } catch (error) {
      setDeleteProductError(true);
    }
  };

  const handleListingEdit = async (listingId) => {
    try {
      setEditListingError(false);

      const res = await fetch(`/api/listing/update/${listingId}`, {
        method: "POST",
      });
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

      const res = await fetch(`/api/product/update/${productId}`, {
        method: "POST",
      });
      const data = await res.json();

      if (data.success === false) {
        setEditProductError(true);
        return;
      }
    } catch (error) {}
  };

  const handleShowShopDetails = () => {
    changeActiveView(views.Shop_Details);
    handleShowProduct();
    handleShowListing();
  };

  const changeActiveView = (newView) => {
    setActiveView(newView);
  };

  console.log(userProduct);

  return (
    <div className="flex justify-center w-full p-8 px-0  min-h-screen">
      <div className="flex gap-6 shadow rounded-lg w-full p-5">
        {/* SIDE BAR SECTION */}
        <ProfileSideBar
          activeView={activeView}
          changeActiveView={changeActiveView}
          handleSignOut={handleSignOut}
          handleDeleteUser={handleDeleteUser}
          handleShowShopDetails={handleShowShopDetails}
        />
        {/* DYNAMIC COMPONENT SECTION w-[800px] */}
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
                  {loading ? "loading" : "update"}
                </button>
              </form>
            </>
          )}
          {/* TODO: Value is Button Clicked Value */}
          {activeView === views.Shop_Details && (
            <>
              <h2 className="">Shop Details</h2>
              <div className="flex mt-5 gap-3 items-center">
                <Link
                  to={"/create-product"}
                  className="bg-[#00263D] text-white text-center text-bold rounded-lg max-w-auto uppercase p-2 px-5 hover:opacity-80"
                >
                  CREATE PRODUCT
                </Link>

                <Link
                  to={"/create-listing"}
                  className="bg-[#00263D] text-white text-center text-bold rounded-lg max-w-auto uppercase p-2 px-5 hover:opacity-80"
                >
                  CREATE LISTING
                </Link>
              </div>
              {userProduct && userProduct.length > 0 && (
                <div className="flex flex-col gap-4">
                  <h1 className="text-center mt-7 text-2xl font-semibold">
                    Your Product
                  </h1>
                  {userProduct.map((product) => (
                    <div
                      key={product._id}
                      className="border rounded-lg p-3 flex justify-between items-center gap-4"
                    >
                      <Link to={`/product/${product._id}`}>
                        <img
                          src={product.imageUrls[0]}
                          alt="product cover"
                          className="h-16 w-16 object-contain"
                        />
                      </Link>
                      <Link
                        to={`/product/${product._id}`}
                        className="text-slate-700 font-semibold flex-1 truncate hover:underline"
                      >
                        <p>{product.name}</p>
                      </Link>
                      <div className="flex flex-col items-center">
                        <Link>
                          <button
                            onClick={() => handleProductEdit(product._id)}
                          >
                            Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => handleProductDelete(product._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {userListings && userListings.length > 0 && (
                <div className="flex flex-col gap-4">
                  <h1 className="text-center mt-7 text-2xl font-semibold">
                    Your Property Listing
                  </h1>
                  {userListings.map((listing) => (
                    <div
                      key={listing._id}
                      className="border rounded-lg p-3 flex justify-between items-center gap-4"
                    >
                      <Link to={`/listing/${listing._id}`}>
                        <img
                          src={listing.imageUrls[0]}
                          alt="Product Cover"
                          className="h-16 w-16 object-contain"
                        />
                      </Link>
                      <Link
                        to={`/listing/${listing._id}`}
                        className="text-slate-700 font-semibold flex-1 hover:underline truncate"
                      >
                        <p>{listing.name}</p>
                      </Link>

                      <div className="flex flex-col items-center">
                        <button
                          className="text-red-700 uppercase"
                          onClick={() => handleListingDelete(listing._id)}
                        >
                          Delete
                        </button>
                        <Link to={`/update-listing/${listing._id}`}>
                          <button
                            className="text-green-700 uppercase"
                            onClick={() => handleListingEdit(listing._id)}
                          >
                            Edit
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          {activeView === views.Reviews && (
            <>
              <h2 className="">Reviews</h2>
            </>
          )}
          {activeView === views.Password && (
            <>
              <h2 className="">Password</h2>
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
                  {loading ? "loading" : "update"}
                </button>
              </form>
            </>
          )}

          <div className="flex gap-5 justify-between my-3"></div>
          <p className="text-red-700 mt-3">{error ? error : " "}</p>
          <p className="text-green-700">
            {updateSuccess ? "User is Updated successfully!!" : " "}
          </p>

          <p className="text-red-700 mt-5">
            {showListingError ? "Error showing listings" : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserFaliure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";

import toast from "react-hot-toast"

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
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    bio: "",
  });

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [showProductError, setShowProductError] = useState(false);

  const [userListings, setUserListings] = useState([]);
  const [userProduct, setUserProducts] = useState([]);

  const [deleteListingError, setDeleteListingError] = useState(false);
  const [deleteProductError, setDeleteProductError] = useState(false);
  const [editListingError, setEditListingError] = useState(false);
  const [editProductError, setEditProductError] = useState(false);

  const [activeView, setActiveView] = useState(views.Personal_Details);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      handlefileUpload();
    }
  }, [file]);

  useEffect(() => {
    setFormData({
      username: currentUser.username || "",
      email: currentUser.email || "",
      password: "",
      password_confirmation: "",
      bio: currentUser.bio || "",
    });
  }, []);



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

      if(formData.password !== formData.password_confirmation) {
        toast.error("Password mis-match");
        return;
      }

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

  // const handleDeleteUser = async () => {
  //   try {
  //     dispatch(deleteUserStart());

  //     const res = await fetch(`/api/user/delete/${currentUser._id}`, {
  //       method: "DELETE",
  //     });

  //     const data = await res.json();

  //     if (data.success === false) {
  //       dispatch(deleteUserFaliure(data.message));
  //       return;
  //     }

  //     dispatch(deleteUserSuccess(data));
  //     navigate("/");
  //   } catch (error) {
  //     dispatch(deleteUserFaliure(error.message));
  //   }
  // };

  // const handleSignOut = async () => {
  //   try {
      
  //     dispatch(signOutUser());

  //     const res = await fetch("/api/auth/signout");

  //     const data = await res.json();

  //     if (data.success === false) {
  //       dispatch(signOutFaliure(data.message));
  //       return;
  //     }

  //     dispatch(signOutSuccess(data));

  //     navigate("/", {replace:true });
  //   } catch (error) {
  //     dispatch(signOutFaliure(error.message));
  //   }
  // };

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

      const res = await fetch(`/api/user/products/${currentUser._id}`);
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

  return (
    <>
    
    <div className="border-b w-full p-5 py-4">
        <h2 className="font-semibold ">Personal Details</h2>
    </div>
    <form
      className="flex flex-col gap-4 lg:max-w-[70%] mx-auto p-3"
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
        src={formData?.avatar || currentUser.avatar || "https://placehold.jp/150x150.png"}
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
        defaultValue={formData.username}
        id="username"
        name="username"
        placeholder="Username"
        className="border p-3 rounded-lg"
        onChange={handleChange}
      />
      <input
        type="email"
        defaultValue={formData.email}
        placeholder="Email"
        id="email"
        name="email"
        className="border p-3 rounded-lg"
        onChange={handleChange}
      />

      {/* <input
        type="text"
        name="storeAddress"
        defaultValue={currentUser.storeAddress}
        placeholder="Store Address"
        id="storeAddress"
        className="border p-3 rounded-lg"
        onChange={handleChange}
      /> */}

      {/* <input
        type="tel"
        name="mobileNumber"
        defaultValue={currentUser.mobileNumber}
        placeholder="Mobile Number"
        id="mobileNumber"
        className="border p-3 rounded-lg"
        onChange={handleChange}
      /> */}

      {/* <input
        type="tel"
        defaultValue={currentUser.mobileNumber}
        placeholder="Mobile Number"
        id="mobileNumber"
        className="border p-3 rounded-lg"
        onChange={handleChange}
      /> */}

      <input
        type="password"
        value={formData.password}
        placeholder="Password"
        autoComplete="off"
        id="password"
        name="password"
        className="border p-3 rounded-lg"
        onChange={handleChange}
      />

      <input
        type="password"
        value={formData.password_confirmation}
        placeholder="Re-Password"
        autoComplete="off"
        name="password_confirmation"
        id="password_confirmation"
        className="border p-3 rounded-lg"
        onChange={handleChange}
      />

      <textarea
        defaultValue={formData.bio || ""}
        placeholder="Bio"
        id="bio"
        name="bio"
        className="border p-3 rounded-lg resize-none"
        onChange={handleChange}
        rows={5}      
      >        
      </textarea>

      <button
        className="bg-[#00263D] text-white text-bold rounded-lg max-w-auto p-3 hover:opacity-80 uppercase"
        type="submit"
        disabled={loading}
      >
        {loading ? "loading" : "Save Changes"}
      </button>
    </form>
  </>
  );
}

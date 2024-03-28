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

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileError, setFileError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [deleteListingError, setDeleteListingError] = useState(false);
  const [editListingError, setEditListingError] = useState(false);

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
      navigate("/sign-in");
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

      navigate("/sign-in");
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

  return (
    <div className="items-center justify-center p-3 max-w-lg mx-auto">
      <h1 className="font-bold text-3xl text-center my-7">Profile</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/.*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData?.avatar || currentUser.avatar}
          alt="profileImage"
          className="rounded-full h-32 w-32 self-center object-cover cursor-pointer"
        />
        <p className="self-center text-sm">
          {fileError ? (
            <span className="text-red-700">
              Image Upload Error (Image must be less than 2MB)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-blue-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-800"> Image Upload Complete</span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          defaultValue={currentUser.username}
          id="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          defaultValue={currentUser.email}
          id="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />

        <button
          className="bg-blue-400 text-white text-bold rounded-lg max-w-auto p-3 hover:opacity-80 uppercase"
          type="submit"
          disabled={loading}
        >
          {loading ? "loading" : "update"}
        </button>
        <Link
          to={"/create-listing"}
          className="bg-blue-800 text-white text-center text-bold rounded-lg max-w-auto uppercase p-3 hover:opacity-80"
        >
          CREATE LISTING
        </Link>
        <Link
          to={"/create-product"}
          className="bg-blue-800 text-white text-center text-bold rounded-lg max-w-auto uppercase p-3 hover:opacity-80"
        >
          CREATE PRODUCT
        </Link>
      </form>
      <div className="flex gap-5 justify-between my-3">
        <p className="text-red-600 cursor-pointer" onClick={handleDeleteUser}>
          Delete Account
        </p>

        <p className="text-red-600 cursor-pointer" onClick={handleSignOut}>
          Sign out
        </p>
      </div>
      {/* <Link to={"/show-listing"}>
        <p className="text-blue-800 text-center cursor-pointer hover:opacity-70">
          Show Listing
        </p>
      </Link> */}
      <p className="text-red-700 mt-3">{error ? error : " "}</p>
      <p className="text-green-700">
        {updateSuccess ? "User is Updated successfully!!" : " "}
      </p>
      <button onClick={handleShowListing} className="text-blue-800 w-full">
        Show Listing
      </button>
      <p className="text-red-700 mt-5">
        {showListingError ? "Error showing listings" : ""}
      </p>

      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Products
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
                    //onClick={() => handleListingEdit(listing._id)}
                  >
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

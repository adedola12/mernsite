import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import ProfileSideBar from "../components/ProfileSideBar";
import {
  deleteUserFaliure,
  deleteUserStart,
  deleteUserSuccess,
  signOutFaliure,
  signOutSuccess,
  signOutUser,
} from "../redux/user/userSlice";

const views = {
  Personal_Details: "PersonalDetails",
  Shop_Details: "ShopDetails",
  Reviews: "Reviews",
  Password: "Password",
};

export default function CreateProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    storeAddress: "",
    type: "",
    categories: "",
    regularPrice: "",
    discountPrice: "",
    discount: false,
    imageUrls: [],
    mobile: "",
    unit: "",
  });

  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const predefinedSubCategories = {
    Concrete: ["Cement", "Sharp Sand", "Granite"],
    Formwork: ["Hardwood", "Nails"],
    Reinforcement: ["Reinforcement Bar", "Binding Wire"],
    Finishes: [],
    Openings: [],
  };

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

  const types = ["Material", "Labour"];
  const units = ["bags", "tonnes", "m", "m2", "m3"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      categories: value,
    }));
  };

  const handleSubCategoryChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      subCategories: value,
    }));
  };

  const handleImageSubmit = async () => {
    if (files.length > 0) {
      setUploading(true);
      const storage = getStorage(app);
      const promises = Array.from(files).map((file) => {
        const fileName = `${new Date().getTime()}_${file.name}`;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% done`);
            },
            (error) => reject(error),
            () =>
              getDownloadURL(uploadTask.snapshot.ref)
                .then(resolve)
                .catch(reject)
          );
        });
      });

      try {
        const urls = await Promise.all(promises);
        setFormData((prev) => ({
          ...prev,
          imageUrls: [...prev.imageUrls, ...urls],
        }));
      } catch (error) {
        console.error("Failed to upload images", error);
        setError("Image upload failed (2mb per image limit)");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const submissionData = {
      ...formData,
      userRef: currentUser._id,
    };

    try {
      const response = await fetch("/api/product/create-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to create product");
      navigate(`/product/${data._id}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const changeActiveView = (newView) => {
    setActiveView(newView);
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

  const handleShowShopDetails = () => {
    changeActiveView(views.Shop_Details);
  };

  return (
    <main className="p-[100px] max-w-auto mx-auto">
      <div className="flex gap-6 shadow rounded-lg overflow-hidden">
        <ProfileSideBar
          activeView={activeView}
          changeActiveView={changeActiveView}
          handleSignOut={handleSignOut}
          handleDeleteUser={handleDeleteUser}
          handleShowShopDetails={handleShowShopDetails}
        />
        <div className="flex-1 p-4">
          <h1 className="text-3xl font-semibold text-center my-7">
            Create a Product
          </h1>
          <form
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Product Name"
                className="rounded-lg bg-white border p-3"
                name="name"
                maxLength="62"
                minLength="10"
                required
                value={formData.name}
                onChange={handleChange}
              />
              <textarea
                type="text"
                placeholder="About Product"
                className="rounded-lg bg-white p-3 border"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                className="rounded-lg bg-white p-3 border"
                name="mobile"
                required
                value={formData.mobile}
                onChange={handleChange}
              />
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Seller Address"
                  className="rounded-lg bg-white p-3 border"
                  name="storeAddress"
                  required
                  value={formData.storeAddress}
                  onChange={handleChange}
                />
                <select
                  name="location"
                  value={formData.location}
                  className="rounded-lg bg-white p-3 border"
                  onChange={handleChange}
                >
                  <option className="text-gray-400">-select a State-</option>
                  {NIGERIAN_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 justify-center items-center">
                <label htmlFor="unit-select" className="font-semibold">
                  Choose Unit:
                </label>
                <select
                  name="unit"
                  value={formData.unit}
                  className="p-3 rounded-lg w-[300px]"
                  onChange={handleChange}
                >
                  <option>--Please choose an option--</option>
                  {units.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 justify-center items-center">
                <label htmlFor="type-select" className="font-semibold">
                  Choose Product Type:
                </label>
                <select
                  name="type"
                  value={formData.type}
                  className="p-3 rounded-lg"
                  onChange={handleChange}
                >
                  <option>--Please choose an option--</option>
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 justify-center items-center">
                <label htmlFor="category-select" className="font-semibold">
                  Choose a category:
                </label>
                <select
                  name="categories"
                  id="category-select"
                  value={formData.categories}
                  className="p-3 rounded-lg w-[260px]"
                  onChange={handleCategoryChange}
                >
                  <option value="">--Please choose an option--</option>
                  {Object.keys(predefinedSubCategories).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 flex-col items-center">
                <div>
                  <input
                    type="checkbox"
                    name="discount"
                    className="w-5"
                    checked={formData.discount}
                    onChange={handleChange}
                  />
                  <span>Discount Offer</span>
                </div>
                <div className="flex gap-2 justify-center items-center">
                  <input
                    type="number"
                    name="regularPrice"
                    min="10"
                    max="100000000"
                    required
                    className="p-2 border border-gray-200 rounded w-[100px]"
                    value={formData.regularPrice}
                    onChange={handleChange}
                  />
                  <span className="font-semibold text-xl">Price</span>
                  {formData.discount && (
                    <div className="flex gap-2 justify-center items-center">
                      <input
                        type="number"
                        name="discountPrice"
                        min="0"
                        max="100000000"
                        required
                        className="p-2 border border-gray-200 rounded w-[100px]"
                        value={formData.discountPrice}
                        onChange={handleChange}
                      />
                      <span className="font-semibold text-xl">
                        Discount Price
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1 gap-4">
              <div className="flex items-center">
                <p className="font-semibold">Images:</p>
                <span className="font-normal ml-2">
                  The first image will be the cover (max 6)
                </span>
              </div>
              <div className="flex flex-col gap-4">
                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  className="p-3 border border-gray-300 rounded w-full"
                />
                <button
                  type="button"
                  disabled={uploading}
                  className="p-3 text-blue-600 border rounded uppercase font-semibold border-blue-300 hover:shadow-lg disabled:opacity-80"
                  onClick={handleImageSubmit}
                >
                  {uploading ? "Uploading" : "Upload"}
                </button>
                {formData.imageUrls.length > 0 && (
                  <>
                    {formData.imageUrls.map((url, index) => (
                      <div
                        key={index}
                        className="flex justify-between p-3 border items-center"
                      >
                        <img
                          src={url}
                          alt="Item Image"
                          className="w-20 h-20 object-contain rounded-lg"
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>
              <button
                type="submit"
                disabled={loading || uploading}
                className="p-3 bg-blue-900 text-white font-semibold rounded-lg uppercase hover:opacity-80 disabled:opacity-40"
              >
                {loading ? "Creating..." : "Create Product"}
              </button>
              {error && <p className="text-red-900 text-sm">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

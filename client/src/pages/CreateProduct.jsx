import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { app } from "../firebase";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    type: "",
    categories: "",
    regularPrice: 10,
    discountPrice: 5,
    discount: false,
    imageUrls: [],
    mobile: 1234567890,
    unit: "",
  });
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const categories = [
    "Concrete",
    "Reinforcement",
    "Formwork",
    "Finishes",
    "Openings",
  ];

  const types = ["Material", "Labour"];

  const units = ["bags", "tonnes", "m", "m2", "m3"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageSubmit = async () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2mb per image)");
        });
    } else {
      setImageUploadError("You can only upload 6 images per product");
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (+formData.imageUrls.length < 1)
        return setError("You must upload atleast one image");
      if (+formData.regularPrice < formData)
        return setError("Discount price must be lower than regular price");
      setLoading(true);
      setError(false);

      const res = await fetch("/api/product/create-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });

      const data = await res.json();

      setLoading(false);

      if (data.success === false) {
        setError(data.message);
      }

      navigate(`/product/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Product
      </h1>
      <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 flex-1">
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
          <input
            type="text"
            placeholder="Seller Location"
            className="rounded-lg bg-white p-3 border"
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
          />
          <div className="flex gap-3 justify-center items-center">
            <label htmlFor="unit-select" className="font-semibold ">
              Choose Unit :
            </label>
            <select
              name="unit"
              value={formData.unit}
              className="p-3 rounded-lg w-[300px]"
              onChange={handleChange}
            >
              <option>--Please choose an option--</option>
              {units.map((unit) => (
                <option>{unit}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 justify-center items-center">
            <label htmlFor="type-select" className="font-semibold ">
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
                <option>{type}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 justify-center items-center">
            <label htmlFor="category-select" className="font-semibold">
              Choose a category:
            </label>
            <select
              name="categories"
              value={formData.categories}
              className="p-3 rounded-lg w-[260px]"
              onChange={handleChange}
            >
              <option>--Please choose an option--</option>
              {categories.map((category) => (
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
                  <span className="font-semibold text-xl">Discount Price</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <div className="flex">
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
            <p className="text-red-700 text-sm">
              {imageUploadError && imageUploadError}
            </p>
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
                    <button
                      type="button"
                      className="p-3 text-red-700 rounded-lg uppercase hover:opacity-35"
                      onClick={handleRemoveImage}
                    >
                      Delete
                    </button>
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
    </main>
  );
}

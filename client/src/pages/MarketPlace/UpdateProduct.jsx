import React, { useEffect, useState } from "react";

import imageCompression from "browser-image-compression";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { app } from "../../firebase";

import { CATEGORY_DATA } from "../../constants/data";
import toast from "react-hot-toast";
import { config } from "../../../config";

import fetchWithTokenRefresh from "../../hooks/fetchWithTokenRefresh";
import UpdateProductStageOne from "../../components/UpdateProductStageOne";
import UpdateProductStageTwo from "../../components/UpdateProductStageTwo";

export default function UpdateProduct() {
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
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const [steps, setSteps] = useState(1);

  const [editProductError, setEditProductError] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const productId = params.productId;
      const res = await fetch(`${config.baseUrl}/api/product/get/${productId}`);

      const data = await res.json();
      console.log("fetched data", data.product);

      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data.product);
    };

    fetchProduct();
  }, []);

  const handleProductEdit = async (e) => {
    try {
      setEditProductError(false);

      const res = await fetch(
        `${config.baseUrl}/api/product/edit/${params.productId}`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();
    } catch (error) {
      setEditProductError(true);
    }
  };

  useEffect(() => {
    handleProductEdit();
  }, []);

  const previousStep = () => {
    setSteps((prevState) => prevState - 1);
  };

  const nextStep = () => {
    setSteps((prevState) => prevState + 1);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCategoryChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      categories: value,
    }));
  };

  const handleSubCategoryChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      subCategories: value,
    }));
  };

  const compressImages = async (image) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(image, options);
      return compressedFile;
    } catch (error) {
      console.error("Error compressing image:", error);
    }
  };

  const uploadImageToFirebase = async (file) => {
    const urls = [];

    if (!file) return;

    const storage = getStorage(app);

    const fileName = `${new Date().getTime()}_${file.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => console.log(error),
      () =>
        getDownloadURL(uploadTask.snapshot.ref)
          .then(async (downloadURL) => {
            setFormData((prev) => ({
              ...prev,
              imageUrls: [...prev.imageUrls, downloadURL],
            }));
            urls.push(downloadURL);
          })
          .catch((error) => console.log(error))
    );

    return urls;
  };

  const handleImageSubmit = async () => {
    const imageFiles = Array.from(files);

    if (imageFiles.length > 0) {
      setUploading(true);

      try {
        for (let i = 0; i < imageFiles.length; i++) {
          const compressedImage = await compressImages(imageFiles[i]);
          await uploadImageToFirebase(compressedImage);
        }
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
    setError(null);

    const { categories: categoryName } = formData;
    const subCategories = CATEGORY_DATA[formData.categories];

    const submissionData = {
      ...formData,
      subCategories,
      categoryName,
      userRef: currentUser._id,
    };

    try {
      const response = await fetchWithTokenRefresh(
        `${config.baseUrl}/api/product/update/${params.productId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to update product");
      navigate(`/product/${data._id}`);
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const showMultipleStepForm = () => {
    switch (steps) {
      case 1:
        return (
          <UpdateProductStageOne
            nextStep={nextStep}
            formData={formData}
            handleChange={handleChange}
          />
        );
      case 2:
        return (
          <UpdateProductStageTwo
            handleCategoryChange={handleCategoryChange}
            onhandleSubCategoryChange={handleSubCategoryChange}
            handleSubmit={handleSubmit}
            previousStep={previousStep}
            formData={formData}
            setFiles={setFiles}
            handleChange={handleChange}
            isLoading={loading}
            error={error}
            handleImageSubmit={handleImageSubmit}
            uploading={uploading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <form className="w-full flex flex-col gap-y-3">
        {showMultipleStepForm()}
      </form>
    </>
  );
}

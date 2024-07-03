import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../../../config";
import { useSelector } from "react-redux";

const ShopDetails = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [showListingError, setShowListingError] = useState(false);
  const [showProductError, setShowProductError] = useState(false);

  const [userListings, setUserListings] = useState([]);
  const [userProducts, setUserProducts] = useState([]);

  const [deleteListingError, setDeleteListingError] = useState(false);
  const [deleteProductError, setDeleteProductError] = useState(false);
  const [editListingError, setEditListingError] = useState(false);
  const [editProductError, setEditProductError] = useState(false);

  useEffect(() => {
    handleShowListing();
    handleShowProduct();
  }, []);

  console.log(userProducts);
  console.log(currentUser._id);

  const handleShowListing = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(
        `${config.baseUrl}/api/user/listings/${currentUser._id}`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();

      console.log(data);

      setUserListings(data);
    } catch (error) {
      setShowListingError(true);
    }
  };

  const handleShowProduct = async () => {
    try {
      setShowProductError(false);

      const res = await fetch(
        `${config.baseUrl}/api/user/products/${currentUser._id}`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();

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
          credentials: "include",
        }
      );
      const data = await res.json();

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
          credentials: "include",
        }
      );
      const data = await res.json();

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
          method: "PUT",
          credentials: "include",
        }
      );
      const data = await res.json();
    } catch (error) {
      setEditListingError(true);
    }
  };

  const handleProductEdit = async (productId) => {
    try {
      setEditProductError(false);

      const res = await fetch(
        `${config.baseUrl}/api/product/edit/${productId}`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();
    } catch (error) {
      setEditProductError(true);
    }
  };
  return (
    <>
      <div className="border-b w-full p-5 py-4">
        <h2 className="font-semibold ">Shop Details</h2>
      </div>
      <div className="flex mt-5 gap-3 items-center px-5 flex-col">
        <div className="gap-6 flex ">
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
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="font-bold text-lg">Your Listings</h3>

            {showListingError ? (
              <span className="text-red-600">Failed to load listings</span>
            ) : (
              <div>
                {userListings.map((listing) => (
                  <div
                    key={listing._id}
                    className="flex justify-between items-center mb-4 border p-4 rounded-lg w-full"
                  >
                    <div className="flex items-center flex-row">
                      <img
                        src={listing.imageUrls[0]}
                        alt="listing Image"
                        className="h-16 w-16 object-cover rounded-md mr-4"
                      />
                      <Link to={`/listing/${listing._id}`}>
                        <h4 className="font-semibold">{product.name}</h4>
                      </Link>
                    </div>
                    <div className="flex flex-col items-end">
                      <Link
                        to={`/edit-listing/${listing._id}`}
                        className="mb-2"
                      >
                        <button className="font-bold py-2 px-4 rounded">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleListingDelete(listing._id)}
                        className="font-bold py-2 px-4 rounded"
                      >
                        Delete
                      </button>
                    </div>
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
                  <div
                    key={product._id}
                    className="flex justify-between items-center mb-4 border p-4 rounded-lg w-full"
                  >
                    <div className="flex items-center flex-row">
                      <img
                        src={product.imageUrls[0]}
                        alt="product Image"
                        className="h-16 w-16 object-cover rounded-md mr-4"
                      />
                      <Link to={`/product/${product._id}`}>
                        <h4 className="font-semibold">{product.name}</h4>
                      </Link>
                    </div>
                    <div className="flex flex-col items-end">
                      <Link
                        to={`/edit-product/${product._id}`}
                        className="mb-2"
                      >
                        <button className="font-bold py-2 px-4 rounded">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleProductDelete(product._id)}
                        className="font-bold py-2 px-4 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopDetails;

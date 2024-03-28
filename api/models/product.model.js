import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountedPrice: {
      type: Number,
    },
    location: {
      type: String,
      required: true,
    },
    categories: {
      type: String,
      required: true,
      //enum: ["Concrete", "Reinforcement", "Formwork", "Finishes", "Openings"],
    },
    type: {
      type: String,
      required: true,
      //enum: ["Materials", "Labour"],
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    discount: {
      type: Boolean,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

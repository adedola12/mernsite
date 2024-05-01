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
    storeAddress: {
      type: String,
      required: true,
    },
    categories: {
      name: {
        type: String,
        required: true,
      },
      subCategories: [
        {
          name: {
            type: String,
            required: true,
          },
        },
      ],
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
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

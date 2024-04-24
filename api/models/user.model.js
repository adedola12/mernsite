import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 4,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      min: 4,
    },
    password: {
      type: String,
      required: true,
      min: 4,
    },
    avatar: {
      type: String,
      default:
        "https://th.bing.com/th/id/OIP.GHGGLYe7gDfZUzF_tElxiQHaHa?w=211&h=211&c=7&r=0&o=5&pid=1.7",
    },
    storeAddress: {
      type: String,
    },
    mobileNumber: {
      type: Number,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

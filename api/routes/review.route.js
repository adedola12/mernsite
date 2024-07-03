import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createProductReview, fetchAllProductReviews, fetchAllSellerReviews } from "../controllers/review.controller.js";

const router = express.Router();


router.post("/create-review", verifyToken, createProductReview);
router.get("/get-reviews", fetchAllProductReviews);
router.get("/get-reviews/:sellerId",  fetchAllSellerReviews);

export default router;

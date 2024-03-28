import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.post("/create-product", verifyToken, createProduct);
//router.post("/getCategories", getCategories);

export default router;

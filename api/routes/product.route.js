import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createProduct,
  getCat,
  getCategories,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/create-product", verifyToken, createProduct);
router.get("/getCategories", getCategories);
router.get("/getCat", getCat);
export default router;

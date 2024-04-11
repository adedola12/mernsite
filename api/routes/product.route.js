import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProductInCategory,
  getCat,
  getCategories,
  getProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/create-product", verifyToken, createProduct);
router.delete("/delete/:id", verifyToken, deleteProduct);
router.post("/update/:id", verifyToken, editProduct);
router.get("/getCategories", getCategories);
router.get("/getCat", getCat);
router.get("/getProduct/category/:category", getAllProductInCategory);
router.get("/get/:id", getProduct);

export default router;

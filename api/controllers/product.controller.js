import Product from "../models/product.model.js";
import errorHandler from "../utils/error.js";

export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    return res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// export const getCategories = async (req, res, next) => {
//   try {
//     const categories = Product.schema.path("categories").enumValues;

//     return res.status(200).json(categories);
//   } catch (error) {
//     next(error);
//   }
// };

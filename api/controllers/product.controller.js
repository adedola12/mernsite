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

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Product.distinct("categories");

    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const getCat = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    const categoryTerm = req.query.categories;
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    let queryObj = {};
    if (categoryTerm) {
      queryObj.categories = { $regex: categoryTerm, $options: "i" };
    }

    const products = await Product.find(queryObj)
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(products);
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

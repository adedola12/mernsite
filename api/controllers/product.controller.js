import Product from "../models/product.model.js";
import errorHandler from "../utils/error.js";

import { productCategories } from "../constants/data.js";


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

    return res.status(200).json(categories);

  } catch (error) {
    next(error);
  }
};

export const getAllProductInCategory = async (req, res, next) => {
  try {

    const category = req.query.categories;

    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const allProducts = await Product.find()
      .sort({ [sort]: order })
      .skip(startIndex)
      .limit(limit);

    const products = category
      ? allProducts.filter((product) => product.categories === category)
      : allProducts;

    return res.status(200).json({ products });
  } catch (error) {
    next(error);
  }
};

export const getAllProductInSubCategory = async (req, res, next) => {
  const { categoryName } = req.params;
  
  try {

    const products = await Product.find({ categories: categoryName });
    
    let subCategories = [];

    // subCategories = products
    //   .flatMap((product) => product.subCategories.map((subCat) => subCat.name))
    //   .filter(
    //     (subCategory, index, self) => self.indexOf(subCategory) === index
    //   );

    if(products && products.length > 0) {
      subCategories = products.filter(product => 
        productCategories.some(subCategory => product.categories === subCategory.name)
      );
    }

    res.status(200).json({
      success: true,
      subCategories,
    });
  } catch (error) {
    console.log(error)
    next(error);
  }
};

export const getAllUserProduct = async (req, res, next) => {
  try {
    const products = await Product.find({ userRef: req.params.userId });
    res.json({ success: true, products });
  } catch (error) {
    next(error);
  }
};

export const getCat = async (req, res, next) => {
  try {
    
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    const categoryTerm = req.query.categories;
    const locationTerm = req.query.location;
    const typeTerm = req.query.type;
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    let queryObj = {};
    if (categoryTerm) {
      queryObj.categories = { $regex: new RegExp(categoryTerm, "i") };
    }
    if (locationTerm) {
      queryObj.location = { $regex: new RegExp(locationTerm, "i") };
    }

    if (typeTerm) {
      queryObj.location = { $regex: new RegExp(typeTerm, "i") };
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

export const searchProduct = async (req, res, next) => {

  try {
    console.log(req.query)
    const { location, categories, limit = 12, startIndex = 0 } = req.query;

    let filters = {};
    if (location) {
      filters.location = { $regex: location, $options: 'i' }
    }
    if (categories) {
      filters.categories = { $regex: categories, $options: 'i' }
    }

    let subCategories = [];
    const products = await Product.find(filters).limit(limit).skip(startIndex);
    
    if(products.length) {
      subCategories = products.filter(product => 
        productCategories.some(subCategory => product.categories.toLowerCase() === subCategory.name.toLowerCase())
      );
    }
   

    res.status(200).json({
      success: true,
      data: {
        products,
        subCategories
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "userRef",
      "-password"
    );

    if (!product) {
      return next(errorHandler(404, "Product not found"));
    }

    res.status(200).json({ product });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(errorHandler(401, "Product not found"));
  }

  if (req.user.id !== product.userRef) {
    return next;
  }

  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (error) {
    next(error);
  }
};

export const editProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(errorHandler(404, "Product not found"));
  }

  if (req.user.id !== product.userRef) {
    return next(errorHandler(401, "You can only edit your own product!"));
  }

  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updateProduct);
  } catch (error) {
    next(error);
  }
};

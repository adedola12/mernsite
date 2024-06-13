import Product from "../models/product.model.js";
import Review from "../models/review.model.js";
import errorHandler from "../utils/error.js";
import User from "../models/user.model.js";

//POST:: create new product review.
export const createProductReview = async (req, res, next) => {

    const { productId, rating, comment } = req.body;
  
    const userId = req.user._id;

    if(!userId) {
        return next(errorHandler(400, "Unauthorized, please login"));
    }

    try {
        
        const userExist = await User.findById(userId);

        if(!userExist) {
            return next(errorHandler(404, "User not found"));
        }

        const productExist = await Product.findById(productId);

        if(!productExist) {
            return next(errorHandler(404, "Product not found"));
        }

        const review = new Review({ product: productId, rating, comment, user: userId });
        await review.save();


        productExist.reviews.push(review);
        await productExist.save();

      return res.status(201).json({ message: "Review created"});
  
    } catch (error) {
      next(error);
    }
};
  
//GET:: fetch all reviews by a particular product ID.
export const fetchAllProductReviews = async (req, res, next) => {

   const { productId } = req.params;
  


    try {
        
        // const product = await Product.findById(productId).populate({
        //     path: 'reviews',
        //     model: 'Review',
        //     select: 'comment rating user',
        //     populate: {
        //       path: 'user',
        //       model: 'User',
        //       select: 'name email'
        //     }
        //   });

        // if(!product) {
        //     return next(errorHandler(401, "Product not found"));
        // }

        const reviews = await Review.find({ product: productId })
                        .populate({
                            path: 'product',
                            model: 'Product',
                            select: 'name',
                        })
                        .populate({
                            path: 'user',
                            model: 'User',
                            select: 'name avatar',
                        })


   
                        
        if(!reviews) {
            return next(errorHandler(401, "Product not found"));
        }


      return res.status(201).json({ reviews });
  
    } catch (error) {
      next(error);
    }
};
  
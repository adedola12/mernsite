import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import productRouter from "./routes/product.route.js";
import reviewRouter from "./routes/review.route.js";
import cors from "cors";
import connectDb from "./utils/database.js";
import appConstants from "./constants/index.js";

const app = express();

app.use(cors({origin: [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "https://adlmmarketplace-git-main-adedola12s-projects.vercel.app"
],
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use("/api/product", productRouter);
app.use("/api/review", reviewRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// START APPLICATION
connectDb()
  .then(() => {
    app.listen(process.env.PORT || appConstants.PORT, () => {
      console.log(`Server Running on port: ${appConstants.PORT}`);
    });
  })
  .catch((error) => console.log(error));

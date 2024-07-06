import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/adlm/Home";
import HomeA from "./pages/MarketPlace/HomeA";
import About from "./pages/adlm/About";
import Marketplace from "./pages/MarketPlace/Marketplace";
import Pricing from "./pages/adlm/Pricing";
import Newsletter from "./pages/adlm/Newsletter";
import Listing from "./pages/MarketPlace/Listing";
import Product from "./pages/MarketPlace/Product";
import Search from "./pages/MarketPlace/Search";
import Profile from "./pages/MarketPlace/Profile";
import DashboardDefault from "./pages/MarketPlace/DashboardDefault";
import CreateProduct from "./pages/MarketPlace/CreateProduct";
import CreateListing from "./pages/MarketPlace/CreateListing";
import ShopDetails from "./pages/MarketPlace/ShopDetails";
import UpdateListing from "./pages/MarketPlace/UpdateListing";
import SellerReviews from "./pages/MarketPlace/SellerReviews";
import Services from "./pages/adlm/Services";
import PlanswiftPlugin from "./pages/productPage/PlanswiftPlugin";
import RateGen from "./pages/productPage/RateGen";
import SellerShop from "./pages/MarketPlace/SellerShop";
import PrivateRoute from "./components/PrivateRoute";
import UpdateProduct from "./pages/MarketPlace/UpdateProduct";
import MainLayout from "./pages/MarketPlace/MainLayout";
import AuthForm from "./components/auth/AuthForm";

export default function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<HomeA />} />
          <Route path="/about" element={<About />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/BIMNews" element={<Newsletter />} />
          <Route path="/sellerShop/:userId" element={<SellerShop />} />
          <Route path="/listing/:listingId" element={<Listing />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/search" element={<Search />} />
          <Route path="/services" element={<Services />} />
          <Route path="/planswift-plugin" element={<PlanswiftPlugin />} />
          <Route path="/rate-gen" element={<RateGen />} />

          <Route element={<PrivateRoute />}>
            <Route element={<DashboardDefault />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/add-product" element={<CreateProduct />} />
              <Route path="/create-listing" element={<CreateListing />} />
              <Route path="/shop-details" element={<ShopDetails />} />
              <Route path="/create-product" element={<CreateProduct />} />
              <Route path="/seller-review" element={<SellerReviews />} />
              <Route path="/update-listing/:listingId" element={<UpdateListing />} />
              <Route path="/edit-product/:productId" element={<UpdateProduct />} />
            </Route>
          </Route>

        </Route>
      </Routes>
      <AuthForm />
    </BrowserRouter>
  );
}

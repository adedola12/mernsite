import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import CreateProduct from "./pages/CreateProduct";
import Product from "./pages/Product";
import Marketplace from "./pages/Marketplace";
import Pricing from "./pages/Pricing";
import Services from "./pages/Services";
import Newsletter from "./pages/Newsletter";
import Search from "./pages/Search";
import HomeA from "./pages/HomeA";
import ProductDemo from "./pages/ProductDemo";
import Footer from "./components/Footer";
import { useState } from "react";
import { useSelector } from "react-redux";
import SignInModal from "./pages/SignIn";
import SignUpModal from "./pages/SignUp";
import SellerShop from "./pages/SellerShop";
import Header2 from "./components/Header2";

export default function App() {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);

  const toggleModal = (modalName) => {
    if (modalName === "signIn") {
      setShowSignInModal(!showSignInModal);
      setShowSignUpModal(false);
    } else if (modalName === "signUp") {
      setShowSignUpModal(!showSignUpModal);
      setShowSignInModal(false);
    }
  };

  return (
    <BrowserRouter>
      {/* <Header toggleModal={toggleModal} /> */}
      <Header2  toggleModal={toggleModal} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/homeA" element={<HomeA />} />
        {/* <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/services" element={<Services />} />
        <Route path="/newsletter" element={<Newsletter />} />

        <Route path="/sellerShop/:userId" element={<SellerShop />} />

        <Route path="/listing/:listingId" element={<Listing />} />

        <Route path="/product/:productId" element={<Product />} />

        <Route path="/search" element={<Search />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/update-listing/:listingId" element={<UpdateListing />} />
        </Route>
        
      </Routes>
      {showSignInModal && <SignInModal onClose={() => toggleModal("signIn")} />}
      {showSignUpModal && <SignUpModal onClose={() => toggleModal("signUp")} />}
      <Footer />
    </BrowserRouter>
  );
}

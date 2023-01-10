import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AllProducts from "./pages/AllProducts";
import Product from "./pages/Product";
import History from "./pages/History";
import Checkout from "./pages/Checkout";
import CheckoutFail from "./pages/CheckoutFail";
import { Cart } from "./components/Cart";
import { Navigation } from "./components/Navigation";
import { DisplayCart } from "./components/DisplayCart";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />

        <Routes>
          <Route path="/" element={<AllProducts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/history" element={<History />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout-fail" element={<CheckoutFail />} />
          <Route path="/products/:id/:prod_name" element={<Product />} />
        </Routes>

        <Cart />
        <DisplayCart />
      </BrowserRouter>
    </div>
  );
}

export default App;

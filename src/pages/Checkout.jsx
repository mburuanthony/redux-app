import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/reducers/cartreducer";
import "../styles/pages/checkout.scss";

function Checkout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="checkout">
      <h2>Your purchase was successfully completed</h2>
    </div>
  );
}

export default Checkout;

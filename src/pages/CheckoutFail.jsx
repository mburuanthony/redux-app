import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/reducers/cartreducer";
import "../styles/pages/checkout.scss";

function CheckoutFail() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="checkout-fail">
      <h2 className="fail">
        An error occurred, we're unable to process your purchase, try again
        later.
      </h2>
    </div>
  );
}

export default CheckoutFail;

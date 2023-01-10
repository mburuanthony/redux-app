import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Divider } from "@mui/material";
import { CartItem } from "./CartItem";
import { computeTotal, hideCart } from "../redux/reducers/cartreducer";
import { fetchAllInCart } from "../redux/reducers/cartreducer";
import { getStripe } from "../payment/stripemethods";
import "../styles/components/cart.scss";

export const Cart = () => {
  const dispatch = useDispatch();

  const cartVisible = useSelector((state) => state?.cart?.cartVisible);
  const authenticated = useSelector((state) => state?.user?.isAuthenticated);

  const closeCart = () => {
    dispatch(hideCart());
  };

  useEffect(() => {
    dispatch(fetchAllInCart());
    dispatch(computeTotal());
  }, [dispatch, cartVisible]);

  const products_in_cart = useSelector((state) => state?.cart?.productsincart);
  const products_total_price = useSelector(
    (state) => state?.cart?.productstotal
  );

  const disableCheckout = () => {
    let disabled;
    if (!authenticated) {
      disabled = true;
    }
    // eslint-disable-next-line
    else if (products_in_cart?.length == 0) {
      disabled = true;
    } else {
      disabled = false;
    }

    return disabled;
  };

  const formartStripeObject = products_in_cart.map((prod) => {
    const priceid = prod?.price_id;
    const objqty = prod?.qtty;

    return { price: priceid, quantity: objqty };
  });

  async function handleStripeCheckout() {
    const stripe = await getStripe();

    const { error } = await stripe.redirectToCheckout({
      lineItems: [...formartStripeObject],
      mode: "payment",
      successUrl: `http://localhost:3000/checkout`,
      cancelUrl: `http://localhost:3000/checkout-fail`,
    });

    console.log(error);
  }

  return (
    <div id="products_cart" style={{ opacity: cartVisible ? 1 : 0 }}>
      <div className="_close">
        <span className="title">Shopping Cart</span>
        <Button className="close-btn" onClick={closeCart}>
          Close
        </Button>
      </div>

      <Divider className="divider" />

      <div className="cart_content">
        {products_in_cart?.map((product) => (
          <CartItem
            key={product?.product_id}
            prod_name={product?.name}
            prod_price={product?.price}
            prod_image={product?.image_url}
            product_id={product?.product_id}
            quantity={product?.qtty}
          />
        ))}
      </div>

      <div id="check__out">
        <span>Total: $ {products_total_price}</span>

        <Button
          className="btn"
          disabled={disableCheckout()}
          onClick={handleStripeCheckout}
        >
          Check Out
        </Button>
      </div>
    </div>
  );
};

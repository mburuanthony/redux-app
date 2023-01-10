import { useDispatch, useSelector } from "react-redux";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { showCart } from "../redux/reducers/cartreducer";
import "../styles/components/displaycart.scss";

export const DisplayCart = () => {
  const dispatch = useDispatch();

  const cartVisible = useSelector((state) => state?.cart?.cartVisible);

  return (
    <div
      style={{ zIndex: cartVisible ? -1 : 6000 }}
      className="display_cart"
      onClick={() => dispatch(showCart())}
    >
      <ShoppingCartOutlined sx={{ fontSize: "2rem" }} />
    </div>
  );
};

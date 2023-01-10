import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { computeTotal, showCart } from "../redux/reducers/cartreducer";
import { addProdToCart } from "../redux/reducers/cartreducer";
import { productincart } from "../helpers/products";
import "../styles/components/item.scss";

export const Item = ({
  product_id,
  product_name,
  image_url,
  price,
  qty_in_stock,
}) => {
  const dispatch = useDispatch();
  const products_in_cart = useSelector((state) => state?.cart?.productsincart);

  const url_format_name = String(product_name)
    .replace(" ", "")
    .replace(" ", "")
    .toLowerCase();

  const addItemToCart = () => {
    dispatch(showCart());
    dispatch(addProdToCart({ product_id }));
    dispatch(computeTotal());
  };

  return (
    <div id="item">
      <img className="prod_image" src={image_url} alt={product_name} />

      <Link to={`/products/${product_id}/${url_format_name}`}>
        {product_name}
      </Link>

      <span>{qty_in_stock} in stock</span>

      <span>$ {price}</span>

      <Button
        variant="contained"
        disableElevation
        className="add_to_cart"
        onClick={addItemToCart}
        disabled={productincart(product_id, products_in_cart)}
      >
        Add to Cart
      </Button>
    </div>
  );
};

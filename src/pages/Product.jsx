import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Chip } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowBackRounded } from "@mui/icons-material";
import { fetchProduct } from "../redux/reducers/itemsreducer";
import { productincart } from "../helpers/products";
import {
  addProdToCart,
  computeTotal,
  removeProdFromCart,
  showCart,
} from "../redux/reducers/cartreducer";
import "../styles/pages/product.scss";

function Product() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const { id } = params;

  useEffect(() => {
    dispatch(fetchProduct({ product_id: id }));
  }, [dispatch, id]);

  const selectedProduct = useSelector((state) => state?.products?.product);
  const products_in_cart = useSelector((state) => state?.cart?.productsincart);

  return (
    <div id="product">
      <Button variant="text" className="go_back" onClick={() => navigate(-1)}>
        <ArrowBackRounded />
        <span>Back to products</span>
      </Button>

      <div className="prod_details">
        <h2>{selectedProduct?.name}</h2>

        <p className="desc">{selectedProduct?.description}</p>

        <Chip
          className="chip"
          variant="outlined"
          label={selectedProduct?.category}
        />

        <div className="_price">
          <span>$ {selectedProduct?.price}</span>

          <Button
            disabled={productincart(id, products_in_cart)}
            variant="contained"
            className="_cart"
            onClick={() => {
              dispatch(addProdToCart({ product_id: id }));
              dispatch(computeTotal());
              dispatch(showCart());
            }}
          >
            add to cart
          </Button>

          <Button
            disabled={!productincart(id, products_in_cart)}
            variant="contained"
            className="_cart"
            onClick={() => {
              dispatch(removeProdFromCart({ id }));
              dispatch(computeTotal());
            }}
          >
            remove from cart
          </Button>
        </div>

        <img
          className="prod_image"
          src={selectedProduct?.image_url}
          alt={selectedProduct?.name}
        />
      </div>
    </div>
  );
}

export default Product;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, TextField } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import {
  computeTotal,
  removeProdFromCart,
  updateProductQty,
} from "../redux/reducers/cartreducer";
import "../styles/components/cartitem.scss";

export const CartItem = ({
  prod_name,
  prod_image,
  prod_price,
  product_id,
  quantity,
}) => {
  const dispatch = useDispatch();
  const [qtty, setQtty] = useState(quantity || 1);

  const delFromCart = () => {
    dispatch(removeProdFromCart({ product_id }));
    dispatch(computeTotal());
  };

  return (
    <div id="cart_item">
      <img className="avtr" alt="product_image" src={prod_image} />

      <div className="content">
        <p className="top">
          <span>{prod_name}, </span>
          <span>$ {prod_price}</span>
        </p>

        <div className="trash">
          <span>Qty : </span>

          <TextField
            type="number"
            className="txt_fld"
            variant="outlined"
            value={qtty}
            onChange={(e) => {
              setQtty(e.target.value);
            }}
            onKeyUp={() => {
              dispatch(updateProductQty({ product_id, newQtty: qtty }));
              dispatch(computeTotal());
            }}
          />

          <Button onClick={delFromCart}>
            <DeleteOutlined />
          </Button>
        </div>
      </div>
    </div>
  );
};

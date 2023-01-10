import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { ArrowBackRounded } from "@mui/icons-material";
import { HistoryItem } from "../components/HistoryItem";
import { fetchFromHistory } from "../redux/reducers/itemsreducer";
import "../styles/pages/history.scss";

function History() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFromHistory());
  }, [dispatch]);

  const products_data = useSelector((state) => state?.products?.inhistory);

  return (
    <div id="order_history">
      <Button variant="text" className="go_back" onClick={() => navigate(-1)}>
        <ArrowBackRounded />
        <span>Go Back</span>
      </Button>

      <h2>Order History</h2>

      <div className="history_products">
        {products_data.map((product) => (
          <HistoryItem
            key={product?.product_id + product?.price}
            product_id={product?.product_id}
            product_name={product?.name}
            image_url={product?.image_url}
            qty_purchased={product?.qtty}
          />
        ))}
      </div>
    </div>
  );
}

export default History;

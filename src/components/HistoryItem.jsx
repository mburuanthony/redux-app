import { Link } from "react-router-dom";
import "../styles/components/item.scss";

export const HistoryItem = ({
  product_id,
  product_name,
  image_url,
  qty_purchased,
}) => {
  const url_format_name = String(product_name)
    .replace(" ", "")
    .replace(" ", "")
    .toLowerCase();

  return (
    <div id="item" className="history">
      <img className="prod_image" src={image_url} alt={product_name} />

      <Link to={`/products/${product_id}/${url_format_name}`}>
        {product_name}
      </Link>

      <span>purchased {qty_purchased}</span>
    </div>
  );
};

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chip } from "@mui/material";
import { Item } from "../components/Item";
import {
  fetchAllProducts,
  filterbyCategory,
} from "../redux/reducers/itemsreducer";
import "../styles/pages/allproducts.scss";

function AllProducts() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const products = useSelector((state) => state?.products?.products);

  return (
    <div className="all_products">
      <h2>Choose a category</h2>

      <div className="categories">
        <Chip
          className="chip"
          variant="filled"
          label="All"
          onClick={() => dispatch(fetchAllProducts())}
        />
        <Chip
          className="chip"
          variant="filled"
          label="Appliances"
          onClick={() => dispatch(filterbyCategory({ category: "appliances" }))}
        />
        <Chip
          className="chip"
          variant="filled"
          label="Books"
          onClick={() => dispatch(filterbyCategory({ category: "books" }))}
        />
        <Chip
          className="chip"
          variant="filled"
          label="Food"
          onClick={() => dispatch(filterbyCategory({ category: "food" }))}
        />
        <Chip
          className="chip"
          variant="filled"
          label="Electronics"
          onClick={() =>
            dispatch(filterbyCategory({ category: "electronics" }))
          }
        />
        <Chip
          className="chip"
          variant="filled"
          label="Toys"
          onClick={() => dispatch(filterbyCategory({ category: "toys" }))}
        />
      </div>

      <h2>Our Products</h2>

      <div className="our_products">
        {products.map((product) => (
          <Item
            key={product?.product_id + product?.price}
            product_id={product?.product_id}
            product_name={product?.name}
            image_url={product?.image_url}
            price={product?.price}
            qty_in_stock={product?.in_stock}
          />
        ))}
      </div>
    </div>
  );
}

export default AllProducts;

import { createSlice } from "@reduxjs/toolkit";
import products_data from "../../data/products.json";

const initialState = {
  products: [],
  productscategory: "all",
  product: {},
  inhistory: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    /*get all products*/
    fetchAllProducts: (state) => {
      const all_products = products_data;

      return { ...state, products: all_products };
    },
    /*filter products by category*/
    filterbyCategory: (state, action) => {
      const { category } = action.payload;

      const products_in_category = products_data.filter(
        (prod) => prod?.category === category
      );

      return {
        ...state,
        products: products_in_category,
        productscategory: category,
      };
    },
    /*get one product*/
    fetchProduct: (state, action) => {
      const { product_id } = action.payload;

      const product_selected = products_data.filter(
        // eslint-disable-next-line
        (prod) => prod?.product_id == product_id
      );

      return { ...state, product: product_selected[0] };
    },
    /*get products in history*/
    fetchFromHistory: (state) => {
      const historydata = localStorage.getItem("history_products") ?? [];

      const parsed_data =
        // eslint-disable-next-line
        historydata.length == 0 ? historydata : JSON.parse(historydata);

      return { ...state, inhistory: parsed_data };
    },
  },
});

export const {
  fetchAllProducts,
  filterbyCategory,
  fetchProduct,
  fetchFromHistory,
} = productSlice.actions;

export default productSlice.reducer;

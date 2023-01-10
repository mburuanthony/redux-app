import { createSlice } from "@reduxjs/toolkit";
import all_products_data from "../../data/products.json";

const initialState = {
  productsincart: [],
  productstotal: 0,
  cartVisible: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /*add item to cart*/
    addProdToCart: (state, action) => {
      const { product_id } = action.payload;

      const selected_product = all_products_data.filter(
        // eslint-disable-next-line
        (prod) => prod?.product_id == product_id
      );

      const newProduct = selected_product[0];

      const cartdata = localStorage.getItem("carts_data") ?? [];

      const parsed_data =
        // eslint-disable-next-line
        cartdata.length == 0 ? cartdata : JSON.parse(cartdata);
      parsed_data.push(newProduct);

      localStorage.setItem("carts_data", JSON.stringify(parsed_data));

      return { ...state, productsincart: parsed_data };
    },
    /*get all items in cart*/
    fetchAllInCart: (state) => {
      const cartdata = localStorage.getItem("carts_data") ?? [];

      const parsed_data =
        // eslint-disable-next-line
        cartdata.length == 0 ? cartdata : JSON.parse(cartdata);

      return { ...state, productsincart: parsed_data };
    },
    /*remove item from cart*/
    removeProdFromCart: (state, action) => {
      const { product_id } = action.payload;

      const cartdata = localStorage.getItem("carts_data");

      const parsed_data = JSON.parse(cartdata);

      const filteredProducts = parsed_data.filter(
        (prod) => prod?.product_id !== product_id
      );

      localStorage.setItem("carts_data", JSON.stringify(filteredProducts));

      return { ...state, productsincart: filteredProducts };
    },
    /*update product quantity*/
    updateProductQty: (state, action) => {
      const { product_id, newQtty } = action.payload;

      const cartdata = localStorage.getItem("carts_data");
      const parsed_data = JSON.parse(cartdata);

      const selected_product = parsed_data.filter(
        // eslint-disable-next-line
        (prod) => prod?.product_id == product_id
      );

      const updatedprodQty = selected_product?.map((prod) => {
        return { ...prod, qtty: Number(newQtty) };
      });

      const newList = parsed_data.filter(
        (prod) => prod?.product_id !== product_id
      );
      newList.push(...updatedprodQty);

      localStorage.setItem("carts_data", JSON.stringify(newList));

      return { ...state };
    },
    /*function to find total price*/
    computeTotal: (state) => {
      const cartdata = localStorage.getItem("carts_data") ?? [];

      const parsed_data =
        // eslint-disable-next-line
        cartdata.length == 0 ? cartdata : JSON.parse(cartdata);

      const computedproductsTotal = parsed_data.map(
        (prod) => prod?.qtty * prod?.price
      );
      const priceTotal = computedproductsTotal.reduce(
        (acc, currValue) => acc + currValue,
        0
      );

      return { ...state, productstotal: priceTotal };
    },
    /*function to show cart*/
    showCart: (state) => {
      return { ...state, cartVisible: true };
    },
    /*function to hide cart*/
    hideCart: (state) => {
      return { ...state, cartVisible: false };
    },
    /*function to clear cart items after purhase is complete*/
    clearCart: (state) => {
      const historyitems = localStorage.getItem("history_products") ?? [];
      let parsedhistoryitems =
        // eslint-disable-next-line
        historyitems.length == 0 ? historyitems : JSON.parse(historyitems);

      const prodsincart = localStorage.getItem("carts_data") || [];
      const itemsincart =
        // eslint-disable-next-line
        prodsincart.length == 0 ? prodsincart : JSON.parse(prodsincart);

      parsedhistoryitems.push(...itemsincart);

      localStorage.setItem(
        "history_products",
        JSON.stringify(parsedhistoryitems)
      );

      localStorage.removeItem("carts_data");

      return {
        ...state,
        productsincart: [],
        productstotal: 0,
        cartVisible: false,
      };
    },
  },
});

export const {
  addProdToCart,
  fetchAllInCart,
  removeProdFromCart,
  updateProductQty,
  computeTotal,
  showCart,
  hideCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

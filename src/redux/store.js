import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userreducer";
import productsReducer from "./reducers/itemsreducer";
import cartReducer from "./reducers/cartreducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});

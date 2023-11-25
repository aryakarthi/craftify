import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import productSlice from "./slices/productSlice";
import allUsersSlice from "./slices/allUsersSlice";
import toggleSlice from "./slices/toggleSlice";
import categorySlice from "./slices/categorySlice";
import cartSlice from "./slices/cartSlice";
import favSlice from "./slices/favSlice";
import showCartSlice from "./slices/showCartSlice";
import orderSlice from "./slices/orderSlice";
import modalSlice from "./slices/modalSlice";
import previewSlice from "./slices/previewSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    products: productSlice,
    allUsers: allUsersSlice,
    toggleSidebar: toggleSlice,
    category: categorySlice,
    cartItems: cartSlice,
    favItems: favSlice,
    showCart: showCartSlice,
    orders: orderSlice,
    isModalOpen: modalSlice,
    previewData: previewSlice,
  },
});

import React, { useEffect } from "react";
import { FaArrowLeft } from "../assets/icons";
import { NavLink } from "react-router-dom";
import { order_confirmed } from "../assets";
import { Header } from "../components";
import { motion } from "framer-motion";
import { btnClick } from "../animations";
import { useDispatch, useSelector } from "react-redux";
import { clearCartItems } from "../app/slices/cartSlice";

const OrderSuccess = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cartItems) {
      dispatch(clearCartItems());
    }
  }, []);

  return (
    <main className=" w-screen min-h-screen flex items-center justify-start flex-col">
      <div className="w-full flex flex-col items-center justify-center mt-28 px-6 md:px-24 2xl:px-96 gap-8 pb-24">
        <img src={order_confirmed} className="w-full max-w-md" alt="" />

        <motion.div {...btnClick}>
          <NavLink
            to={"/"}
            className="flex items-center justify-center gap-4 cursor-pointer text-2xl text-textColor font-semibold px-4 py-2 rounded-md border border-gray-300 hover:shadow-md"
          >
            <FaArrowLeft className="text-xl text-textColor " /> Get back to Home
          </NavLink>
        </motion.div>
      </div>
    </main>
  );
};

export default OrderSuccess;
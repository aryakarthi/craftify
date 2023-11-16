import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { btnClick, slideIn, staggerFadeInOut } from "../animations";
import { setCartOff } from "../app/slices/showCartSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  FcClearFilters,
  BiChevronsRight,
  HiCurrencyRupee,
} from "../assets/icons";
import { getAllCartItems, changeItemQuantity } from "../api";
import { clearCartItems, setCartItems } from "../app/slices/cartSlice";
import { emptyCart } from "../assets";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let tot = 0;
    if (cartItems) {
      cartItems.map((data) => {
        tot = tot + data.product_price * data.quantity;
        setTotal(tot);
      });
    }
  }, [cartItems]);

  const handleCheckOut = () => {
    dispatch(setCartOff());
    navigate("/checkout");
  };

  return (
    <motion.div
      {...slideIn}
      className="fixed z-50 top-0 right-0 w-full md:w-460 bg-lightOverlay backdrop-blur-md shadow-md h-full"
    >
      <div className="flex-1 flex flex-col items-start justify-start bg-zinc-700 h-full p-2 gap-2 relative">
        <div className="w-full flex items-center justify-between p-2 bg-zinc-800 rounded-md">
          <motion.i
            {...btnClick}
            className="cursor-pointer"
            onClick={() => dispatch(setCartOff())}
          >
            <BiChevronsRight className="text-3xl text-white" />
          </motion.i>
          <p className="text-xl text-white font-semibold">My Cart</p>
          <motion.i {...btnClick} className="cursor-pointer">
            <FcClearFilters className="text-[30px] text-textColor" />
          </motion.i>
        </div>
        {cartItems && cartItems?.length > 0 ? (
          <>
            <div className="flex flex-col w-full items-start justify-start gap-2 h-[70%] overflow-y-scroll scrollbar-none">
              {cartItems &&
                cartItems?.length > 0 &&
                cartItems?.map((item, i) => (
                  <CartItemCard key={i} index={i} data={item} />
                ))}
            </div>

            <div className="bg-zinc-800 w-full h-[30%] flex flex-col items-center justify-center px-4 py-6 gap-4">
              <div className="w-full flex items-center justify-evenly">
                <p className="text-3xl text-zinc-500 font-semibold">Total</p>
                <p className="text-3xl text-orange-500 font-semibold flex items-center justify-center gap-1">
                  <HiCurrencyRupee className="text-primary" />
                  {total}
                </p>
              </div>

              <motion.button
                {...btnClick}
                className="bg-emerald-400 w-[70%] px-4 py-3 text-xl text-white font-semibold hover:bg-emerald-500 drop-shadow-md rounded-2xl"
                onClick={handleCheckOut}
              >
                Check Out
              </motion.button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-xl text-orange-500 mx-auto my-2 font-bold">
              Cart is Empty!
            </h1>
            <div className="w-full h-full">
              <img
                src={emptyCart}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export const CartItemCard = ({ index, data }) => {
  const cart = useSelector((state) => state.cartItems);
  const user = useSelector((state) => state.user);
  const [itemTotal, setItemTotal] = useState(0);
  const dispatch = useDispatch();

  const decrementCart = (productId, size) => {
    // dispatch(alertSuccess("Updated the cartitem"));
    changeItemQuantity(user?.user_id, productId, "decrement", size).then(
      (data) => {
        getAllCartItems(user?.user_id).then((items) => {
          if (items?.length === 0) {
            dispatch(clearCartItems());
            toast.success("Your cart is empty!");
          } else {
            dispatch(setCartItems(items));
            toast.success("Item quantity decreased!");
          }
        });
      }
    );
  };

  const incrementCart = (productId, size) => {
    changeItemQuantity(user?.user_id, productId, "increment", size).then(
      (data) => {
        getAllCartItems(user?.user_id).then((items) => {
          dispatch(setCartItems(items));
          toast.success("Item quantity increased!");
        });
      }
    );
  };

  useEffect(() => {
    setItemTotal(data.product_price * data.quantity);
  }, [itemTotal, cart]);

  return (
    <motion.div
      key={index}
      {...staggerFadeInOut(index)}
      className="w-full flex items-center justify-between bg-zinc-800 rounded-md drop-shadow-md px-2 py-2 md:py-0"
    >
      <div className="w-[60%] flex flex-1 items-center justify-between gap-2 overflow-hidden">
        <img
          src={data?.imageURLs[0]}
          className="w-16 h-16 md:w-24 md:h-24 min-w-[4rem] min-h-[4rem] object-contain"
          alt=""
        />

        <div className="flex items-center justify-start gap-1 w-full">
          <div className="overflow-hidden">
            <p className="w-full text-sm capitalize text-primary font-semibold whitespace-nowrap">
            {/* {data?.product_name} */}
              {data?.product_name?.length > 10
                ? `${data?.product_name?.substring(0, 10)}...`
                : `${data?.product_name}`}
            </p>
            <p className="flex flex-col text-sm text-gray-400">
              {/* <span className="capitalize">{data?.product_category}</span> */}
              <span>{data?.size}cm</span>
            </p>
            <p className="text-sm flex flex-1 items-center gap-1 font-semibold text-red-400">
              <HiCurrencyRupee className="text-red-400" /> {data?.product_price}
            </p>
          </div>
        </div>
      </div>

      <div className="w-[40%] flex flex-col md:flex-row items-center justify-end gap-4">
        <p className="text-sm flex items-center justify-center gap-1 font-semibold text-red-400">
          <HiCurrencyRupee className="text-red-400" /> {itemTotal}
        </p>
        <div className="flex items-center justify-center gap-2">
          <motion.div
            {...btnClick}
            onClick={() => decrementCart(data?.productId, data?.size)}
            className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-900 cursor-pointer"
          >
            <p className="text-md md:text-xl font-semibold text-primary">--</p>
          </motion.div>
          <p className="text-md md:text-xl text-primary font-semibold">
            {data?.quantity}
          </p>
          <motion.div
            {...btnClick}
            className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-900 cursor-pointer"
            onClick={() => incrementCart(data?.productId, data?.size)}
          >
            <p className="text-md md:text-xl font-semibold text-primary">+</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;

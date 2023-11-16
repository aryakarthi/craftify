import React, { useEffect, useState } from "react";
import { CheckoutInput, Header } from "../components";
import {
  BsSignpost,
  FaCity,
  FaMobileAlt,
  FaRegEnvelope,
  FaRegUser,
  SlLocationPin,
  BsPostcard,
} from "../assets/icons";

import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { setOrders } from "../app/slices/orderSlice";
import { createOrder, getAllOrders } from "../api";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const user = useSelector((data) => data.user);
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();
  const [subtotal, setSubTotal] = useState(0);
  const [shipCharge, setShipCharge] = useState(100);
  const gotoSuccess = useNavigate();

  useEffect(() => {
    let tot = 0;
    if (cartItems) {
      cartItems.map((data) => {
        tot = tot + data.product_price * data.quantity;
        setSubTotal(tot);
      });
    }
  }, [cartItems]);

  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymode, setPaymode] = useState("UPI");

  const paymodeChange = (e) => {
    setPaymode(e.target.value);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    const order_id = uuidv4();
    const shippingDetails = {
      customerName,
      email,
      mobile,
      address: { street, city, state, pincode },
    };
    const checkoutData = {
      created_at: Date.now(),
      customer: user,
      items: cartItems,
      subTotal: subtotal,
      shipCharge,
      grandTotal: subtotal + shipCharge,
      paymentMode: paymode,
      paymentStatus: "pending",
      shippingDetails,
      status: "preparing",
    };

    createOrder(checkoutData).then((res) => {
      dispatch(alertSuccess("Order Placed Successfully!"));
      gotoSuccess("/order-success", { replace: true });
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
    });
    getAllOrders().then((data) => {
      dispatch(setOrders(data));
    });
  };

  return (
    <div className="container my-28">
      <h2 className="font-bold text-3xl text-zinc-800 mb-2">Checkout</h2>
      <div className="w-full grid lg:grid-cols-2 gap-4">
        <div className="w-full flex flex-col gap-4">
          <p className="text-xl font-medium">Order Summary</p>
          <div className="flex flex-col gap-2">
            {cartItems &&
              cartItems?.length > 0 &&
              cartItems?.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-1 items-center gap-2 rounded-lg bg-white p-2 "
                >
                  <img
                    className="w-20 min-w-[5rem] h-20 object-contain rounded-md"
                    src={item?.imageURLs[0]}
                    alt=""
                  />
                  <div className="w-full flex flex-1 flex-col">
                    <p className="w-full font-semibold text-base truncate">
                      {/* {item?.product_name} */}
                      {item?.product_name?.length > 20
                        ? `${item?.product_name?.substring(0, 20)}...`
                        : `${item?.product_name}`}
                    </p>
                    <p className="font-medium text-sm">
                      Price : Rs. {item?.product_price}
                    </p>
                    <p className="font-medium text-sm">
                      Size : {item?.size} cm
                    </p>
                    <div className="w-full flex justify-between">
                      <span className="text-sm font-medium">
                        Qty : {item?.quantity}
                      </span>
                      <span className="text-sm font-medium">
                        Rs. {item?.product_price * item?.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="rounded-lg border bg-zinc-200">
            <div className="border-b border-zinc-400 px-2 py-6">
              <div className="flex items-center justify-between">
                <p className="text-md font-medium text-zinc-700">Sub Total</p>
                <p className="text-lg font-semibold text-zinc-800">
                  Rs. {subtotal}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-md font-medium text-zinc-700">Shipping</p>
                <p className="text-lg font-semibold text-zinc-800">Rs. 100</p>
              </div>
            </div>
            <div className="flex items-center justify-between px-2 py-6">
              <p className="text-xl font-medium text-zinc-700">Grand Total</p>
              <p className="text-xl font-semibold text-zinc-800">
                Rs. {subtotal + shipCharge}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full md:mt-10 mt-2 lg:mt-0">
          <p className="text-xl font-medium mb-4">Shipping Details</p>
          <div className="w-full">
            <form className="w-full" onSubmit={handleCheckout}>
              <div className=" rounded-md flex flex-col items-center justify-center gap-6 p-2 md:p-6 bg-gray-200">
                <CheckoutInput
                  placeHolder={"Name"}
                  icon={<FaRegUser className="text-xl text-textColor" />}
                  inputState={customerName}
                  inputFunction={setCustomerName}
                  type="text"
                />
                <CheckoutInput
                  placeHolder={"Email"}
                  icon={<FaRegEnvelope className="text-xl text-textColor" />}
                  inputState={email}
                  inputFunction={setEmail}
                  type="email"
                />
                <CheckoutInput
                  placeHolder={"Mobile"}
                  icon={<FaMobileAlt className="text-xl text-textColor" />}
                  inputState={mobile}
                  inputFunction={setMobile}
                  type="tel"
                />
                <CheckoutInput
                  placeHolder={"Street"}
                  icon={<BsSignpost className="text-xl text-textColor" />}
                  inputState={street}
                  inputFunction={setStreet}
                  type="text"
                />
                <CheckoutInput
                  placeHolder={"City"}
                  icon={<FaCity className="text-xl text-textColor" />}
                  inputState={city}
                  inputFunction={setCity}
                  type="text"
                />
                <CheckoutInput
                  placeHolder={"State"}
                  icon={<SlLocationPin className="text-xl text-textColor" />}
                  inputState={state}
                  inputFunction={setState}
                  type="text"
                />
                <CheckoutInput
                  placeHolder={"Pincode"}
                  icon={<BsPostcard className="text-xl text-textColor" />}
                  inputState={pincode}
                  inputFunction={setPincode}
                  type="text"
                />
                <div className="w-full">
                  <p className="text-lg font-semibold mb-2">Payment Mode</p>
                  <div className="w-full flex flex-col md:flex-row gap-4 px-2">
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        name="payment-mode"
                        id="cash"
                        value="Cash"
                        checked={paymode === "Cash"}
                        onChange={paymodeChange}
                      />
                      <label htmlFor="cash">Cash</label>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        name="payment-mode"
                        id="upi"
                        value="UPI"
                        checked={paymode === "UPI"}
                        onChange={paymodeChange}
                      />
                      <label htmlFor="upi">
                        UPI (GPay, Phonepe, Paytm, etc)
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

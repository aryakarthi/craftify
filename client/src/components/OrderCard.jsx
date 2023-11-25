import React from "react";
import { motion } from "framer-motion";
import { btnClick, staggerFadeInOut } from "../animations";
import { useDispatch } from "react-redux";
import { HiCurrencyRupee } from "../assets/icons";
import { getAllOrders, updateOrderStatus, updatePayStatus } from "../api";
import { setOrders } from "../app/slices/orderSlice";
import { openModal } from "../app/slices/modalSlice";
import { Link } from "react-router-dom";
import { setPreviewData } from "../app/slices/previewSlice";

const OrderCard = ({ index, data, admin }) => {
  const dispatch = useDispatch();

  const handleStatus = (orderId, status) => {
    updateOrderStatus(orderId, status).then((response) => {
      getAllOrders().then((data) => {
        dispatch(setOrders(data));
      });
    });
  };

  const handlePayStatus = (orderId, payStatus) => {
    updatePayStatus(orderId, payStatus).then((response) => {
      getAllOrders().then((data) => {
        dispatch(setOrders(data));
      });
    });
  };

  const handlePreview = (item) => {
    console.log(item);
    dispatch(setPreviewData(item));
    dispatch(openModal());
  };

  return (
    <motion.div
      {...staggerFadeInOut(index)}
      className="relative w-full flex flex-col items-start justify-start p-2 border border-gray-300 bg-gray-100 drop-shadow-md rounded-md gap-4"
    >
      <div className="w-full flex flex-col items-start lg:flex-row lg:justify-between gap-2">
        <div className="flex items-start justify-start flex-col gap-1 w-full lg:w-[50%]">
          <h1 className="text-md text-headingColor font-semibold">
            {data.shippingDetails.customerName}
          </h1>
          <p className="text-base text-headingColor">
            {data.shippingDetails.mobile} - {data.shippingDetails.email}
          </p>

          <p className="flex flex-col text-base text-textColor">
            <span>
              {data.shippingDetails.address.street},
              {data.shippingDetails.address.city}
            </span>
            <span>
              {data.shippingDetails.address.state} -{" "}
              {data.shippingDetails.address.pincode}
            </span>
          </p>
        </div>
        <div className="w-full lg:w-[50%] flex flex-col items-end gap-4">
          <div className="w-full flex flex-1 flex-col items-start lg:flex-row lg:items-center gap-4">
            <div className="flex flex-col items-start gap-4">
              <p className="flex items-center gap-1 text-md text-zinc-700 font-semibold">
                Total : <HiCurrencyRupee className="text-md text-red-500" />{" "}
                <span className="text-zinc-700 font-semibold">
                  {data?.grandTotal}
                </span>
              </p>
              <div className="w-full flex flex-col items-start md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-2">
                  <p className="text-md font-semibold text-black">Payment:</p>

                  <p
                    className={`text-sm font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md ${
                      (data?.paymentStatus === "pending" &&
                        "text-orange-500 bg-orange-100") ||
                      (data?.paymentStatus === "paid" &&
                        "text-emerald-500 bg-emerald-100")
                    }`}
                  >
                    {data?.paymentStatus}
                  </p>
                </div>
                {admin && (
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-md font-semibold text-headingColor">
                      Actions
                    </p>

                    <motion.button
                      {...btnClick}
                      onClick={() => handlePayStatus(data.order_id, "pending")}
                      className={`text-orange-500 text-sm font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer`}
                    >
                      Pending
                    </motion.button>

                    <motion.button
                      {...btnClick}
                      onClick={() => handlePayStatus(data.order_id, "paid")}
                      className={`text-emerald-500 text-sm font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer`}
                    >
                      Paid
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-start md:flex-row  gap-4">
            <div className="flex gap-2">
              <p className="text-md font-semibold text-headingColor">Order:</p>
              <p
                className={`text-sm font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md ${
                  (data?.status === "preparing" &&
                    "text-orange-500 bg-orange-100") ||
                  (data?.status === "cancelled" && "text-red-500 bg-red-100") ||
                  (data?.status === "delivered" &&
                    "text-emerald-500 bg-emerald-100") ||
                  (data?.status === "dispatched" && "text-blue-500 bg-blue-100")
                }`}
              >
                {data?.status}
              </p>
            </div>

            {admin && (
              <div className="flex items-start justify-center gap-2">
                <p className="text-md font-semibold text-headingColor">
                  Actions
                </p>
                <div className="flex flex-wrap gap-2">
                  <motion.button
                    {...btnClick}
                    onClick={() => handleStatus(data.order_id, "preparing")}
                    className={`text-orange-500 text-sm font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer`}
                  >
                    Preparing
                  </motion.button>

                  <motion.button
                    {...btnClick}
                    onClick={() => handleStatus(data.order_id, "cancelled")}
                    className={`text-red-500 text-sm font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer`}
                  >
                    Cancelled
                  </motion.button>

                  <motion.button
                    {...btnClick}
                    onClick={() => handleStatus(data.order_id, "dispatched")}
                    className={`text-blue-500 text-sm font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer`}
                  >
                    Dispatched
                  </motion.button>

                  <motion.button
                    {...btnClick}
                    onClick={() => handleStatus(data.order_id, "delivered")}
                    className={`text-emerald-500 text-sm font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer`}
                  >
                    Delivered
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {data?.items &&
          data.items.map((item, j) => (
            <Link
              onClick={() => handlePreview(item)}
              // to={`/preview/${item?.productId}`}
              key={j}
              className="w-full flex items-center gap-2 bg-zinc-200 p-2 rounded-md"
            >
              <img
                src={item.imageURLs[0]}
                className="w-12 h-12 object-contain rounded-md"
                alt=""
              />

              <div className="flex items-start flex-col">
                <p className="text-base font-semibold text-zinc-800 overflow-hidden">
                  {item.product_name}
                </p>
                <div className="flex flex-wrap items-start gap-2">
                  <p className="text-sm text-textColor">Qty:{item.quantity}</p>
                  <p className="text-sm text-textColor">Size:{item.size}cm</p>
                  <p className="flex items-center gap-1 text-zinc-800 text-sm">
                    <HiCurrencyRupee className="text-sm text-red-500" />
                    {parseFloat(item.product_price).toFixed(2)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </motion.div>
  );
};

export default OrderCard;

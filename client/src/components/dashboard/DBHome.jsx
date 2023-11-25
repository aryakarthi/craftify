import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getAllProducts, getAllOrders } from "../../api";
import { setAllUsers } from "../../app/slices/allUsersSlice";
import { setAllProducts } from "../../app/slices/productSlice";
import { setOrders } from "../../app/slices/orderSlice";

import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

const DBHome = () => {
  const allUsers = useSelector((data) => data.allUsers);
  // console.log(allUsers);
  const products = useSelector((data) => data.products);
  // console.log(products);
  const orders = useSelector((data) => data.orders);
  // console.log(products);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch(setAllUsers(data));
      });
    }
    if (!orders) {
      getAllOrders().then((data) => {
        dispatch(setOrders(data));
      });
    }
  }, []);

  const silkthread = products?.filter(
    (item) => item.product_category === "silkthread"
  ).length;
  const kundan = products?.filter(
    (item) => item.product_category === "kundan"
  ).length;
  const kundan3d = products?.filter(
    (item) => item.product_category === "3dkundan"
  ).length;
  const multicolor = products?.filter(
    (item) => item.product_category === "multicolor"
  ).length;
  const lakshmicoin = products?.filter(
    (item) => item.product_category === "lakshmicoin"
  ).length;
  const namebangles = products?.filter(
    (item) => item.product_category === "namebangles"
  ).length;

  const preparing = orders?.filter(
    (item) => item.status === "preparing"
  ).length;
  const cancelled = orders?.filter(
    (item) => item.status === "cancelled"
  ).length;
  const dispatched = orders?.filter(
    (item) => item.status === "dispatched"
  ).length;
  const delivered = orders?.filter(
    (item) => item.status === "delivered"
  ).length;

  const palette = ["#FFCD4B", "#D80032", "#34B3F1", "#03C988"];
  const pieParams = { height: "50%", margin: { right: 5 } };

  return (
    <div className="w-full h-full grid grid-cols-1 xl:grid-cols-2 gap-2">
      <div className="w-full h-3/4 lg:h-1/2">
        <h3 className="text-xl text-zinc-700 font-semibold">
          No of Products: {products?.length}
        </h3>
        <BarChart className="overflow-x-scroll"
          sx={{ width: "100%", height: "100%" }}
          xAxis={[
            {
              id: "itemCategories",
              data: [
                "Silkthread",
                "Kundan",
                "3DKundan",
                "Multicolor",
                "Lakshmicoin",
                "Namebangles",
              ],
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: [
                silkthread,
                kundan,
                kundan3d,
                multicolor,
                lakshmicoin,
                namebangles,
              ],
            },
          ]}
        />
      </div>
      <div className="w-full h-3/4 lg:h-1/2">
        <h3 className="text-xl text-zinc-700 font-semibold mb-4">
          No of Orders: {orders?.length}
        </h3>
        <PieChart
          sx={{ width: "100%", height: "100%" }}
          colors={palette}
          series={[
            {
              data: [
                { value: preparing, label: "Preparing" },
                { value: cancelled, label: "Cancelled" },
                { value: dispatched, label: "Dispatched" },
                { value: delivered, label: "Delivered" },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
};

export default DBHome;

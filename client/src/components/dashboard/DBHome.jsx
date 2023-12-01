import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getAllProducts, getAllOrders } from "../../api";
import { setAllUsers } from "../../app/slices/allUsersSlice";
import { setAllProducts } from "../../app/slices/productSlice";
import { setOrders } from "../../app/slices/orderSlice";

import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

import { CChart } from "@coreui/react-chartjs";

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
    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="w-full">
        <h3 className="text-xl text-zinc-700 font-semibold">
          No of Products: {products?.length}
        </h3>
        <CChart
          className="w-full md:w-5/6"
          type="bar"
          data={{
            labels: [
              "Silkthread",
              "Kundan",
              "3DKundan",
              "Multicolor",
              "Lakshmicoin",
              "Namebangles",
            ],
            datasets: [
              {
                label: "Product Count",
                backgroundColor: "#FF6969",
                data: [
                  silkthread,
                  kundan,
                  kundan3d,
                  multicolor,
                  lakshmicoin,
                  namebangles,
                ],
              },
            ],
          }}
          labels="products"
        />
      </div>
      <div className="w-full">
        <h3 className="text-xl text-zinc-700 font-semibold mb-4">
          No of Orders: {orders?.length}
        </h3>
        <CChart
          className="w-full md:w-2/3"
          type="doughnut"
          data={{
            labels: ["Preparing", "Cancelled", "Dispatched", "Delivered"],
            datasets: [
              {
                backgroundColor: ["#FFCB42", "#D80032", "#30A2FF", "#1B9C85"],
                data: [preparing, cancelled, dispatched, delivered],
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default DBHome;

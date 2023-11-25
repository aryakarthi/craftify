import React, { useEffect, useState } from "react";
import { OrderCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../api";
import { setOrders } from "../app/slices/orderSlice";

const Orders = () => {
  const user = useSelector((state) => state.user);
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const [userOrders, setUserOrders] = useState(null);

  useEffect(() => {
    if (!orders) {
      getAllOrders().then((data) => {
        dispatch(setOrders(data));
        setUserOrders(
          data.filter((item) => item?.customer?.user_id === user?.user_id)
        );
      });
    } else {
      setUserOrders(
        orders.filter((data) => data?.customer?.user_id === user?.user_id)
      );
    }
  }, [orders]);
  return (
    <>
      <div className="container">
        <div className="pt-[8rem] pb-[4rem] md:px-2">
        <h2 className="font-bold text-3xl text-zinc-800 mb-4 ">
          My Orders
        </h2>
          {userOrders?.length > 0 ? (
            <>
              {userOrders.map((item, i) => (
                <OrderCard key={i} index={i} data={item} admin={false} />
              ))}
            </>
          ) : (
            <>
              <h1 className="text-[72px] text-headingColor font-bold">
                No Orders Found 
              </h1>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;

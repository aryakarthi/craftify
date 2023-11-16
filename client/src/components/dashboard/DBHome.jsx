import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getAllProducts } from "../../api";
import { setAllUsers } from "../../app/slices/allUsersSlice";
import { setAllProducts } from "../../app/slices/productSlice";

const DBHome = () => {
  const allUsers = useSelector((data) => data.allUsers);
  // console.log(allUsers);
  const products = useSelector((data) => data.products);
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
    // if (!orders) {
    //   getAllOrders().then((data) => {
    //     dispatch(setOrders(data));
    //   });
    // }
  }, []);

  return <div>DBHome</div>;
};

export default DBHome;

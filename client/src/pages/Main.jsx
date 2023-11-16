import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Home } from "../pages";
import { getAllProducts } from "../api";
import { setAllProducts } from "../app/slices/productSlice";
import { Cart } from "../components";

const Main = () => {
  // const user = useSelector((state) => state?.user);
  const products = useSelector((state) => state?.products);
  const showCart = useSelector((state) => state.showCart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, []);

  return (
    <main>
      <Home />
      {showCart && <Cart />}
    </main>
  );
};

export default Main;

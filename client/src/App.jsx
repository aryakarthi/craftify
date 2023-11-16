import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Dashboard, Favourites, Layout, Login, Main, PreviewItem } from "./pages";

import { getAuth } from "firebase/auth";
import { app } from "./config/firebaseConfig";
import { useSelector, useDispatch } from "react-redux";
import { getAllCartItems, getAllFavItems, validateUserJWTToken } from "./api";
import { setUserDetails } from "./app/slices/userSlice";

import { motion } from "framer-motion";
import { fadeInOut } from "./animations";
import { Loader } from "./components";
import { Toaster } from "react-hot-toast";
import { setCartItems } from "./app/slices/cartSlice";
import { setFavItems } from "./app/slices/favSlice";

const App = () => {
  const firebaseAuth = getAuth(app);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          validateUserJWTToken(token).then((data) => {
            if (data) {
              getAllCartItems(data?.user_id).then((items) => {
                dispatch(setCartItems(items));
              });
              getAllFavItems(data?.user_id).then((items) => {
                dispatch(setFavItems(items));
              });
            }
            dispatch(setUserDetails(data));
          });
        });
      }
      setInterval(() => {
        setIsLoading(false);
      }, 3000);
    });
  }, []);

  return (
    <div className="w-screen min-h-screen h-auto flex flex-col">
      {isLoading && (
        <motion.div
          {...fadeInOut}
          className="fixed z-50 inset-0 bg-lightOverlay backdrop-blur-md flex items-center justify-center w-full"
        >
          <Loader />
        </motion.div>
      )}
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/preview/:id" element={<PreviewItem />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route
            path="/dashboard/*"
            element={<Dashboard />}
            options={{ headerShown: false }}
          />
          <Route path="*" element={<Navigate to={"/"}></Navigate>}></Route>
        </Routes>
      </Layout>

      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "#CDF5FD",
            },
          },
          error: {
            style: {
              background: "#FFD9C0",
            },
          },
        }}
      />
    </div>
  );
};

export default App;

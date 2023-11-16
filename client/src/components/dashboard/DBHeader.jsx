import React from "react";

import {
  BsFillBellFill,
  BsToggles2,
  MdLogout,
  MdSearch,
} from "../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { btnClick } from "../../animations";
import { motion } from "framer-motion";
import { avatar } from "../../assets";
import { getAuth } from "firebase/auth";
import { app } from "../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { setUserNull } from "../../app/slices/userSlice";

const DBHeader = () => {
  const user = useSelector((data) => data.user);
  const dispatch = useDispatch();
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();

  const signOut = () => {
    firebaseAuth.signOut().then(() => {
      dispatch(setUserNull());
      navigate("/login", { replace: true }).catch((err) => {
        console.log(err);
      });
    });
  };
  return (
    <div className="w-full flex md:flex-row flex-col-reverse items-center justify-between gap-4 mb-6">
      <p className="text-base text-headingColor">
        {user?.name && (
          <span className="block text-lg text-gray-500">{`Hi ${user?.name}👋`}</span>
        )}
        Welcome to Sarah Creations!
      </p>

      <div className="flex items-center justify-center gap-4">
        <motion.div
          {...btnClick}
          className="w-8 h-8 rounded-md cursor-pointer bg-lightOverlay backdrop-blur-md shadow-md flex items-center justify-center"
        >
          <BsFillBellFill className="text-gray-400 text-xl" />
        </motion.div>

        {/* <div className="flex items-center justify-center gap-2"> */}
          <div className="w-8 h-8 rounded-md shadow-md cursor-pointer overflow-hidden">
            <motion.img
              className="w-full h-full object-cover"
              src={user?.picture ? user?.picture : avatar}
              whileHover={{ scale: 1.15 }}
              referrerPolicy="no-referrer"
            />
          </div>

          <motion.div
            {...btnClick}
            onClick={signOut}
            className="w-8 h-8 rounded-md cursor-pointer bg-lightOverlay backdrop-blur-md shadow-md flex items-center justify-center"
          >
            <MdLogout className="text-gray-400 text-xl" />
          </motion.div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default DBHeader;

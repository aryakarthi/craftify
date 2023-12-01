import React, { useState } from "react";

import {
  BsFillBellFill,
  BsToggles2,
  HiMenu,
  MdClose,
  MdLogout,
  MdSearch,
} from "../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { btnClick } from "../../animations";
import { motion } from "framer-motion";
import { avatar, logo } from "../../assets";
import { getAuth } from "firebase/auth";
import { app } from "../../config/firebaseConfig";
import { NavLink, useNavigate } from "react-router-dom";
import { setUserNull } from "../../app/slices/userSlice";
import { dashboardLinks } from "../../utils/data";

const DBHeader = () => {
  const user = useSelector((data) => data.user);
  const dispatch = useDispatch();
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();

  const [toggle, setToggle] = useState(false);

  const signOut = () => {
    firebaseAuth.signOut().then(() => {
      dispatch(setUserNull());
      navigate("/login", { replace: true }).catch((err) => {
        console.log(err);
      });
    });
  };
  return (
    <>
      <div className="hidden w-full md:flex md:flex-row flex-col-reverse items-center justify-between gap-4 mb-6">
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
        </div>
      </div>
      <div className="md:hidden flex justify-between items-center mb-6">
        <NavLink to={"/"} className="flex items-center justify-center gap-2">
          <img src={logo} alt="Logo" className="w-12 rounded-full" />
          <h3 className="text-red-500 font-semibold text-2xl relative mb-2">
            SARAH
            <span className="after:content-['CREATIONS'] after:absolute after:-bottom-4 after:left-0 text-[15px] text-black font-semibold"></span>
          </h3>
        </NavLink>

        <div className="relative">
          <div onClick={() => setToggle(!toggle)}>
            {toggle ? <MdClose size={36} /> : <HiMenu size={36} />}
          </div>

          <div
            className={`${
              !toggle ? "hidden" : "flex slide-up"
            } flex-col gap-2 p-6 bg-zinc-300 absolute top-20 right-0 mx-4 my-2 min-w-[8rem] rounded-xl z-50`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-1">
              {dashboardLinks.map((dblink) => (
                <li key={dblink.id} className="font-medium">
                  <NavLink
                    to={dblink.link}
                    className={({ isActive }) =>
                      isActive ? "text-red-500" : "text-zinc-700"
                    }
                  >
                    {dblink.title}
                  </NavLink>
                </li>
              ))}
            </ul>
            <motion.div
              {...btnClick}
              onClick={signOut}
              className="w-8 h-8 rounded-md cursor-pointer bg-lightOverlay backdrop-blur-md shadow-md flex items-center justify-center"
            >
              <MdLogout className="text-gray-400 text-xl" />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DBHeader;

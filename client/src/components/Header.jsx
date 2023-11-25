import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { avatar, logo } from "../assets";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { motion } from "framer-motion";
import { MdLogout, MdShoppingCart, GoHeart } from "../assets/icons";
import { btnClick, slideTop } from "../animations";
import { useSelector, useDispatch } from "react-redux";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebaseConfig";
import { setUserNull } from "../app/slices/userSlice";
import { RiEqualizerLine } from "react-icons/ri";
import { Categories } from "../components";
import { setCartOn } from "../app/slices/showCartSlice";

const Header = ({ location }) => {
  const user = useSelector((data) => data?.user);
  const cartItems = useSelector((data) => data?.cartItems);
  const favItems = useSelector((state) => state?.favItems);

  const dispatch = useDispatch();
  const [isMenu, setIsMenu] = useState(false);
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const path = location.pathname;
  // console.log(path);

  const signOut = () => {
    firebaseAuth.signOut().then(() => {
      dispatch(setUserNull());
      navigate("/login", { replace: true }).catch((err) => {
        console.log(err);
      });
    });
  };

  const handleLogin = () => {
    navigate("/login", { replace: true });
  };

  return (
    <header className="w-full fixed bg-lightOverlay backdrop-blur-md z-40 inset-x-0 top-0">
      <div className="w-full h-full container">
        <div className="h-24 flex items-center justify-between gap-4 md:px-2 ">
          <NavLink to={"/"} className="flex items-center justify-center gap-2">
            <img src={logo} alt="Logo" className="w-12 rounded-full" />
            <h3 className="text-red-500 font-semibold text-2xl relative mb-2">
              SARAH
              <span className="after:content-['CREATIONS'] after:absolute after:-bottom-4 after:left-0 text-[15px] text-black font-semibold"></span>
            </h3>
          </NavLink>

          <nav className="flex items-center justify-center gap-4">
            <ul className="hidden md:flex items-center justify-center gap-4">
              <NavLink
                className={({ isActive }) =>
                  isActive ? isActiveStyles : isNotActiveStyles
                }
                to={"/"}
              >
                Home
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive ? isActiveStyles : isNotActiveStyles
                }
                to={"/contact"}
              >
                Contact
              </NavLink>
            </ul>

            <Link to={"/favourites"} className="relative">
            <GoHeart className="text-2xl" />
              {favItems?.length > 0 && (
                <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center absolute -top-2 -right-1">
                  <p className="text-primary text-xs font-semibold">
                    {favItems?.length}
                  </p>
                </div>
              )}
            </Link>

            <motion.div
              {...btnClick}
              onClick={
                location.pathname === "/"
                  ? () => dispatch(setCartOn())
                  : () => {
                      navigate("/");
                      dispatch(setCartOn());
                    }
              }
              className="relative cursor-pointer"
            >
              <MdShoppingCart className="text-2xl text-textColor" />
              {cartItems?.length > 0 && (
                <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center absolute -top-2 -right-1">
                  <p className="text-primary text-xs font-semibold">
                    {cartItems?.length}
                  </p>
                </div>
              )}
            </motion.div>
            <div>
              {user ? (
                <>
                  <div
                    onMouseEnter={() => setIsMenu(true)}
                    className="relative cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center">
                      <motion.img
                        className="w-full h-full object-cover"
                        src={user?.picture ? user?.picture : avatar}
                        whileHover={{ scale: 1.15 }}
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {isMenu && (
                      <motion.div
                        {...slideTop}
                        onMouseLeave={() => setIsMenu(false)}
                        className="px-6 py-4 w-48 bg-zinc-200 backdrop-blur-md rounded-md shadow-md absolute top-14 right-0 flex flex-col gap-4"
                      >
                        {user?.user_id ===
                          import.meta.env.VITE_APP_ADMIN_ID && (
                          <Link
                            to={"/dashboard/home"}
                            className="hover:text-red-500 text-xl text-textColor"
                          >
                            Dashboard
                          </Link>
                        )}

                        <Link
                          to={"/profile"}
                          className="hover:text-red-500 text-xl text-textColor"
                        >
                          Profile
                        </Link>
                        <Link
                          to={"/orders"}
                          className="hover:text-red-500 text-xl text-textColor"
                        >
                          Orders
                        </Link>
                        <hr />
                        <motion.div
                          {...btnClick}
                          onClick={signOut}
                          className="group flex items-center justify-center px-3 py-2 rounded-md shadow-md bg-gray-100 hover:bg-gray-200 gap-3"
                        >
                          <MdLogout className="text-2xl text-textColor group-hover::text-headingColor" />
                          <p className="text-textColor text-xl group-hover:text-headingColor">
                            Sign Out
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <motion.button
                    {...btnClick}
                    onClick={handleLogin}
                    className="px-4 py-2 rounded-md shadow-md bg-lightOverlay border border-emerald-300 cursor-pointer"
                  >
                    Login
                  </motion.button>
                </>
              )}
            </div>
          </nav>
        </div>
        {path === "/" && (
          <div className="h-12 flex items-center gap-4 md:px-2">
            <motion.div
              {...btnClick}
              className="px-2 py-2 text-xl font-semibold cursor-pointer rounded-md bg-primary text-textColor"
            >
              <RiEqualizerLine />
            </motion.div>
            <Categories />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

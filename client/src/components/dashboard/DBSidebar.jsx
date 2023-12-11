import React, { useState } from "react";
import { logo } from "../../assets";
import {
  BiChevronLeft,
  MdHome,
  MdShoppingCart,
  MdViewList,
  BsDatabaseFillAdd,
  FaUsers,
  MdSettings,
} from "../../assets/icons";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../app/slices/toggleSlice";

const DBSidebar = () => {
  const [open, setOpen] = useState(true);

  const toggleSidebar = useSelector((data) => data.toggleSidebar);
  console.log(toggleSidebar);
  const dispatch = useDispatch();

  const Menus = [
    {
      title: "Home",
      src: "Chart_fill",
      icon: <MdHome />,
      link: "/dashboard/home",
    },
    {
      title: "Orders",
      src: "Chat",
      icon: <MdShoppingCart />,
      link: "/dashboard/orders",
    },
    {
      title: "Items",
      src: "User",
      icon: <MdViewList />,
      link: "/dashboard/items",
    },
    {
      title: "Add Item ",
      src: "Calendar",
      icon: <BsDatabaseFillAdd />,
      link: "/dashboard/newItem",
    },
    {
      title: "Users",
      src: "Search",
      icon: <FaUsers />,
      link: "/dashboard/users",
    },
    {
      title: "Settings",
      src: "Chart",
      icon: <MdSettings />,
      link: "/dashboard/settings",
      gap: true,
    },
  ];
  return (
    <div className="hidden md:block">
      <div
        className={` ${
          toggleSidebar ? "w-48" : "w-20 "
        } bg-slate-300 h-screen p-5 pt-8 relative duration-300`}
      >
        <BiChevronLeft
          className={`${
            toggleSidebar ? "bg-emerald-300" : "bg-red-300"
          } absolute cursor-pointer -right-3 top-11 text-2xl p-[2px] border-dark-purple
           border-2 rounded-full  ${!toggleSidebar && "rotate-180"}`}
          onClick={() => {
            // setOpen(!open);
            dispatch(toggle());
          }}
        />
        <div>
          <NavLink to={"/"} className="flex gap-x-4 items-center">
            <img
              src={logo}
              className={`cursor-pointer duration-500 w-10 rounded-full ${
                toggleSidebar && "rotate-[360deg]"
              }`}
            />
            <h3
              className={`text-red-500 font-semibold text-2xl relative mb-2 origin-left duration-200 ${
                !toggleSidebar && "scale-0"
              }`}
            >
              SARAH
              <span className="after:content-['CREATIONS'] after:absolute after:-bottom-4 after:left-0 text-[15px] text-black font-semibold"></span>
            </h3>
          </NavLink>
        </div>
        <ul className="pt-6">
          {Menus.map((menu, index) => (
            <li key={index}>
              <NavLink
                to={menu.link}
                key={index}
                className={({ isActive }) =>
                  isActive
                    ? `flex rounded-md p-2 cursor-pointer hover:bg-slate-200 text-red-500 items-center gap-x-4 
              ${menu.gap ? "mt-9" : "mt-2"} ${"bg-slate-100"}`
                    : `flex rounded-md p-2 cursor-pointer hover:bg-slate-200  items-center gap-x-4 
              ${menu.gap ? "mt-9" : "mt-2"}`
                }
              >
                <span className="text-2xl">{menu.icon}</span>

                <span
                  className={`${
                    !toggleSidebar && "hidden"
                  } origin-left duration-200 font-semibold`}
                >
                  {menu.title}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DBSidebar;

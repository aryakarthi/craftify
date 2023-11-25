import React from "react";
import {
  DBHeader,
  DBHome,
  DBItems,
  DBNewItem,
  DBOrders,
  DBUsers,
} from "../../components";

import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../app/slices/toggleSlice";

const DBMain = () => {
  const toggleSidebar = useSelector((data) => data.toggleSidebar);
  console.log(toggleSidebar);
  const dispatch = useDispatch();

  return (
    <div
      className={`${
        toggleSidebar ? "w-[calc(100%_-_12rem)]" : "w-[calc(100%_-_5rem)]"
      }  h-full flex flex-col p-4 md:p-10 flex-1`}
    >
      <DBHeader />
      <div className="flex flex-col flex-1 overflow-y-scroll scrollbar-none">
        <Routes>
          <Route path="/home" element={<DBHome />} />
          <Route path="/orders" element={<DBOrders />} />
          <Route path="/items" element={<DBItems />} />
          <Route path="/newItem" element={<DBNewItem />} />
          <Route path="/users" element={<DBUsers />} />
        </Routes>
      </div>
    </div>
  );
};

export default DBMain;

import React from "react";
import { Header } from "../components";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();

  const isDashboard = location.pathname.startsWith("/dashboard");
  const isLogin = location.pathname.startsWith("/login");

  return (
    <div className="w-screen min-h-screen h-auto flex flex-col bg-zinc-100">
      {!isDashboard && !isLogin && <Header location={location} />}
      {children}
    </div>
  );
};

export default Layout;


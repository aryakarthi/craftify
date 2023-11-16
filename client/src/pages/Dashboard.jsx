import React from "react";
import { DBMain, DBSidebar } from "../components";

const Dashboard = () => {
  return (
    <div className="w-screen h-screen flex items-center bg-primary">
      <DBSidebar />
      <DBMain />
    </div>
  );
};

export default Dashboard;

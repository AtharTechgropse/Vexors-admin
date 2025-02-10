import React, { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Dashboard from "../UserPanel/Dashboard";
import UserManage from "./PeopleManage/UserManage";
import Sidebar from "../common/Sidebar";
import { getAdminData } from "../../apiServices/UserHttpService/UserMainHttp";
import StaffManage from "./PeopleManage/StaffManage";
import QueryManage from "./PeopleManage/QueryManage";

const MainPage = () => {
  let location = useLocation();

  return (
    <div>
      <div className="main-wrapper">
        <Sidebar />
        <main className="content-part-wrapper ">
          {location.pathname === "/" && <Dashboard />}
          {location.pathname === "/Users" && <UserManage />}
          {location.pathname === "/vendor_management" && <StaffManage />}
          {location.pathname === "/Query" && <QueryManage />}
          {location.pathname === "/Users" && <UserManage />}
        </main>
      </div>
    </div>
  );
};

export default MainPage;

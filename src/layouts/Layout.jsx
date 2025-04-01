import React from "react";
import { Outlet } from "react-router";
import MainNav from "../components/MainNav";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-[url('../../public/login.jpg')] bg-cover bg-no-repeat pb-10 ">
      <MainNav />
      <Outlet />
    </div>
  );
}

export default Layout;

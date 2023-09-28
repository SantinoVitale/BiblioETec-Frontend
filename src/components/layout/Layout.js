import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar.js";
import Footer from "../Footer.js";
function Layout() {
  return (
    <>
      <div className="w-full layout">
        <NavBar/>
        <Outlet />
        <Footer/>
      </div>
    </>
  );
}

export default Layout;
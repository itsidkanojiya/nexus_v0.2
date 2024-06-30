import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../ui/header/Header";
import Footer from "../ui/footer/Footer";

const AppLayout = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default AppLayout;

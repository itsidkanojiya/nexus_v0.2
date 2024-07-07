import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../ui/header/Header";
import Footer from "../ui/footer/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";

const AppLayout = () => {
  return (
    <>
      <header className=" sticky top-0 left-0 w-full z-50 shadow-sm">
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
      <ScrollToTopButton />
    </>
  );
};

export default AppLayout;

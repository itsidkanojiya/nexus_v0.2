import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const AppNavLink = ({
  link = { path: "/", title: "Home" },
  className,
  onClick,
}) => {
  const { pathname } = useLocation();

  return (
    <NavLink
      to={link?.path}
      className={` capitalize hover:text-primary p-1.5  ${
        pathname === link?.path ? "text-primary" : "text-gray-700"
      } ${className}`}
      onClick={onClick}
    >
      {link?.title}
    </NavLink>
  );
};

export default AppNavLink;

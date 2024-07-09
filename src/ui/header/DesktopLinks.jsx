import React from "react";
import AppNavLink from "../../components/app_nav_link/AppNavLink";
import { headerLinksData } from "../../constants/linksData";

export default function DesktopLinks() {
  return (
    <>
      {headerLinksData?.map((link, index) => (
        <div className=" relative group cursor-pointer" key={index}>
          <h2 className=" uppercase font-semibold">{link?.title}</h2>
          <div className=" absolute group-hover:flex top-full left-0 w-72 divide-y divide-dotted z-50 hidden flex-col bg-white shadow-xl p-2.5  ">
            {link?.children?.map((child) => (
              <AppNavLink link={child} className="p-3" />
            ))}
          </div>
        </div>
      ))}
      <AppNavLink className=" font-semibold py-1.5 text-sm bg-primary hover:scale-95 transition-all duration-200 ease-linear rounded-full px-4 text-white hover:text-white" link={{ title: "Question Paper Generator", path: "/question-paper-generator" }} />
      <AppNavLink className=" font-semibold p-3" link={{ title: "LOGIN", path: "/login" }} />
    </>
  );
}

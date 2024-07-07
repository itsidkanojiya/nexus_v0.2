import React from "react";
import AppNavLink from "../../components/app_nav_link/AppNavLink";
import { headerLinksData } from "../../constants/linksData";

export default function DesktopLinks() {
  return (
    <>
      {headerLinksData?.map((link) => (
        <div className=" relative group cursor-pointer">
          <h2 className=" uppercase font-semibold">{link?.title}</h2>
          <div className=" absolute group-hover:flex top-full left-0 w-72 divide-y divide-dotted z-50 hidden flex-col bg-white shadow-xl p-2.5  ">
            {link?.children?.map((child) => (
              <AppNavLink link={child} />
            ))}
          </div>
        </div>
      ))}
      <AppNavLink className=" font-semibold" link={{ title: "LOGIN", path: "/login" }} />
    </>
  );
}

import React, { Children } from "react";
import { testData } from "../constants/useFullData";
import { dashboardLinks } from "../constants/linksData";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import LogoutButton from "../components/logout_button/LogoutButton";
import { FaUserCircle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { pathname } = useLocation();
  const { token } = useAuth(true);

  if (!token) return <div className=" h-screen bg-white"></div>;

  return (
    <main className="w-full md:h-screen grid md:grid-cols-[250px_1fr] md:p-2 bg-[#fefdef] gap-2 ">
      <div className="md:block bg-white md:h-full overflow-y-auto p-2 rounded-lg shadow-lg border border-slate-200">
        <div className="grid grid-cols-4 md:grid-cols-1 gap-2 text-center md:text-left">
          {dashboardLinks?.map((link) => (
            <NavLink
              key={link?.path}
              to={link?.path}
              className={`z-[1] overflow-hidden ${
                pathname.split("/")[2] === link?.path ? "" : ""
              } relative border shadow-sm rounded-xl capitalize active:scale-90 transition-all ease-in duration-200 ${
                link.bgColor
              }`}
            >
              <div className="flex flex-col md:flex-row items-center gap-0.5 p-2 ">
                <div className=" p-2 bg-white rounded-full shadow-xl">
                  <img src={link?.icon} className="h-6" alt="icons-image" />
                </div>
                <h2 className="text-[10px] xs:text-sm sm:text-base font-semibold p-2">
                  {link?.title}
                </h2>
              </div>
              <div
                className={` z-[-1] ${
                  pathname.split("/")[2] === link?.path ? "block" : "hidden"
                }  absolute -bottom-2 right-0 h-14 w-14  rounded-tl-full bg-white/40 `}
              ></div>
            </NavLink>
          ))}
        </div>
      </div>
      <div className=" bg-white h-full overflow-y-auto rounded-lg shadow-lg border border-slate-200">
        <div className=" bg-white  shadow-sm border-b  sticky top-0 p-2 mb-1.5 z-[50]">
          <div className=" flex items-center justify-between gap-2 ">
            <NavLink to="/">
              <img src="/logos/Nexus Logo png-01.png" className="h-10" />
            </NavLink>
            <div className=" flex items-center gap-2">
              <button>
                <FaUserCircle className=" text-3xl text-slate-600" />
              </button>
              <LogoutButton />
            </div>
          </div>
        </div>
        <div className="p-2">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;

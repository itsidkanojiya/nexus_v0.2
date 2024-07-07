import React from "react";
import AppContainer from "../../components/AppContainer";
import { headerLinksData } from "../../constants/linksData";
import AppNavLink from "../../components/app_nav_link/AppNavLink";
import DesktopLinks from "./DesktopLinks";

const Header = () => {
  return (
    <nav className=" bg-white ">
      <AppContainer>
        <div className=" flex items-center justify-between">
          <div>
            <img className="h-14" src="/public/logos/Nexus Logo png-01.png" />
          </div>
          <div className=" flex items-center gap-6">
            <DesktopLinks />
          </div>
        </div>
      </AppContainer>
    </nav>
  );
};

export default Header;

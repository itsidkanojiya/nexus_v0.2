import React from "react";
import AppContainer from "../../components/AppContainer";
import { headerLinksData } from "../../constants/linksData";
import AppNavLink from "../../components/app_nav_link/AppNavLink";
import DesktopLinks from "./DesktopLinks";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className=" bg-white ">
      <AppContainer>
        <div className=" flex items-center justify-between">
          <div>
            <Link to="/">
              <img className="h-14" src="/logos/Nexus Logo png-01.png" />
            </Link>
          </div>
          <div className=" flex items-center gap-3">
            <DesktopLinks />
          </div>
        </div>
      </AppContainer>
    </nav>
  );
};

export default Header;

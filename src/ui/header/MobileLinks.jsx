import React, { useState } from "react";
import { CgMenuRight } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { headerLinksData } from "../../constants/linksData";
import AppNavLink from "../../components/app_nav_link/AppNavLink";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import ViewProfileDialog from "./ViewProfileDialog";
import EditProfileDialog from "./EditProfileDialog";

const MobileLinks = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, user } = useAuth();
  const { isLogin } = useSelector((state) => state.app);
  const [showViewProfile, setShowViewProfile] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [openSections, setOpenSections] = useState({});

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const toggleSection = (section) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <div>
      {/* Menu toggle button (hamburger icon) */}
      <button onClick={toggleMenu} className="p-2 shadow-md rounded-xl">
        <CgMenuRight className="text-2xl" />
      </button>

      {/* Side pane for mobile menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          onClick={toggleMenu}
          className="p-4 text-xl font-bold text-gray-700 hover:text-gray-900"
        >
          <IoClose />
        </button>

        {/* Links inside the side pane */}
        <div className="flex flex-col gap-4 p-4">
          {headerLinksData?.map((link, index) => (
            <div key={link?.title + index} className="flex flex-col">
              {/* Section Title (dropdown toggle) */}
              <button
                onClick={() => toggleSection(link?.title)}
                className="uppercase font-semibold text-left w-full p-2 rounded-md hover:bg-gray-200 transition duration-150"
              >
                {link?.title}
              </button>

              {/* Dropdown Links (child links) */}
              {openSections[link?.title] && (
                <div className="flex flex-col pl-4 mt-2">
                  {link?.children?.map((child, idx) => (
                    <AppNavLink
                      link={child}
                      onClick={toggleMenu}
                      className="p-2 text-gray-700 hover:bg-gray-100 rounded-md"
                      key={idx}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
          <AppNavLink
            className="font-semibold py-2 text-sm bg-primary hover:scale-95 transition-all duration-200 ease-linear rounded-full px-4 text-white hover:text-white text-center"
            link={{
              title: "Question Paper Generator",
              path: "/question-paper-generator",
            }}
            onClick={toggleMenu}
          />
          {/* User Section: Profile or Login */}
          {user ? (
            <div className="flex justify-center">
              <button
                className="flex items-center"
                onClick={() => {
                  setShowViewProfile(true);
                  toggleMenu();
                }}
              >
                <FaUserCircle className="text-3xl text-slate-600" />
                <span className="ml-2">View Profile</span>
              </button>
            </div>
          ) : (
            <AppNavLink
              className="font-semibold p-3"
              link={{ title: "LOGIN", path: "/login" }}
              onClick={toggleMenu}
            />
          )}
        </div>
      </div>

      {/* Optional: Overlay to close menu by clicking outside the drawer */}
      {isMenuOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        ></div>
      )}

      {/* View Profile Dialog */}
      {showViewProfile && (
        <ViewProfileDialog
          onClose={() => setShowViewProfile(false)}
          onEdit={() => {
            setShowViewProfile(false);
            setShowEditProfile(true);
          }}
        />
      )}

      {/* Edit Profile Dialog */}
      {showEditProfile && (
        <EditProfileDialog onClose={() => setShowEditProfile(false)} />
      )}
    </div>
  );
};

export default MobileLinks;

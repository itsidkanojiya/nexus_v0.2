// src/ScrollToTopButton.jsx
import React, { useState, useEffect } from "react";
import { GoArrowUp } from "react-icons/go";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-4 left-4">
      {isVisible && (
        <button onClick={scrollToTop} className="p-3 rounded-full bg-primary text-white text-lg hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-tertiary focus:ring-opacity-75 transition-opacity duration-300">
          <GoArrowUp className=" text-xl" />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;

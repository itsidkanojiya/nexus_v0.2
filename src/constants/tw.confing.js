import { Font } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

// Import font files directly
import shipporiExtraBold from "/fonts/ShipporiMincho-ExtraBold.ttf";
import shipporiRegular from "/fonts/ShipporiMincho-Regular.ttf";
import shipporiSemiBold from "/fonts/ShipporiMincho-SemiBold.ttf";

// Utility function to register fonts with error handling
const registerShipporiFonts = () => {
  try {
    Font.register({
      family: "ShipporiMincho",
      fonts: [
        { src: shipporiExtraBold, fontWeight: 700 },
        { src: shipporiRegular },
        { src: shipporiSemiBold, fontWeight: 600 }, // Adjust fontWeight if needed
      ],
    });
  } catch (error) {
    console.warn("ShipporiMincho font registration failed, using fallback fonts:", error);
    // Fallback to system fonts if custom fonts fail
    Font.register({
      family: "ShipporiMincho",
      src: "Helvetica",
    });
  }
};

// Register fonts
registerShipporiFonts();

// Creating Tailwind configuration
export const tw = createTw({
  theme: {
    fontFamily: {
      sans: ["Comic Sans"],
      serif: ["ShipporiMincho"],
    },
    extend: {
      colors: {
        custom: "#bada55",
      },
    },
  },
});

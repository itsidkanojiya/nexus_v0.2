import { Font } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

// Registering fonts
Font.register({
  family: "ShipporiMincho",
  fonts: [
    { src: "/fonts/ShipporiMincho-ExtraBold.ttf", fontWeight: 700 },
    { src: "/fonts/ShipporiMincho-Regular.ttf" },
    { src: "/fonts/ShipporiMincho-SemiBold.ttf", fontWeight: 600 }, // Adjust fontWeight if needed
  ],
});

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

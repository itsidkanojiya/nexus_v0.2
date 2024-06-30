import { StyleSheet } from "@react-pdf/renderer";

// Create styles
export const peparStyle = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "white",
    width: "100%",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

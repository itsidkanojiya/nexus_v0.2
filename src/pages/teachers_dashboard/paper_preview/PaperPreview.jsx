import React from "react";
import PDFPreview from "../../../components/pepar_pdf/PDFPreview";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { questionsList } from "../../../constants/testQuestions";

const headerDetails = {
  logo: "/logos/Nexus Logo png-01.png",
  schoolName: "INTERNATIONAL PUBLIC SCHOOL",
  schoolAddress: "Anand is located at 22.57°N 72.93°E. It has an average",
  details: {
    standard: "1",
    day: "Saturday",
    subject: "English",
    division: "8",
    date: "2024-03-30",
    time: "3 Hours",
  },
};

const PaperPreview = () => {
  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <PDFDownloadLink document={<PDFPreview headerDetails={headerDetails} questionsList={questionsList} />} fileName="nexusPaper.pdf" className="p-2 bg-red-600 rounded-2xl">
        {({ loading }) => (loading ? "Loading document..." : "Download now!")}
      </PDFDownloadLink>
      <div className=" mt-2">
        <PDFViewer className="w-full h-[500px]" showToolbar={false}>
          <PDFPreview headerDetails={headerDetails} questionsList={questionsList} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default PaperPreview;

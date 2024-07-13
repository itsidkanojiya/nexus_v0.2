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
    <div className="w-full">
      <div className=" flex items-center justify-center">
        <PDFDownloadLink document={<PDFPreview headerDetails={headerDetails} questionsList={questionsList} />} fileName="nexusPaper.pdf" className="p-2 bg-red-600 w-full text-center text-white font-semibold mb-0" style={{ width: "100%" }}>
          {({ loading }) => (loading ? "Loading document..." : "Download now!")}
        </PDFDownloadLink>
      </div>
      <div className="">
        <PDFViewer className="w-full min-h-[600px]" showToolbar={false}>
          <PDFPreview headerDetails={headerDetails} questionsList={questionsList} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default PaperPreview;

import React from "react";
import PDFPreview from "../../../components/pepar_pdf/PDFPreview";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { questionsList } from "../../../constants/testQuestions";
import { useSelector } from "react-redux";
import { getSelectedQuestionsWithDetails } from "../questions_list/questionsSlice";

const PaperPreview = () => {
  const paperQuestions = useSelector((state) => getSelectedQuestionsWithDetails(state?.questions));
  const { paperDetails } = useSelector((state) => state.createPaper);

  return (
    <div className="w-full">
      <div className=" flex items-center justify-center">
        <PDFDownloadLink document={<PDFPreview headerDetails={paperDetails} questionsList={paperQuestions} />} fileName="nexusPaper.pdf" className="p-2 bg-red-600 w-full text-center text-white font-semibold mb-0" style={{ width: "100%" }}>
          {({ loading }) => (loading ? "Loading document..." : "Download now!")}
        </PDFDownloadLink>
      </div>
      <div className="">
        <PDFViewer className="w-full min-h-[600px]" showToolbar={false}>
          <PDFPreview headerDetails={paperDetails} questionsList={paperQuestions} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default PaperPreview;

import React from "react";
import { getSelectedQuestionsWithDetails } from "../../questions_list/questionsSlice";
import { useDispatch, useSelector } from "react-redux";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PDFPreview from "../../../../components/pepar_pdf/PDFPreview";
import AppButton from "../../../../components/buttons/AppButton";
import { useMutation } from "@tanstack/react-query";
import updateData from "../../../../helpers/updateData";
import toast from "react-hot-toast";
import useAuth from "../../../../hooks/useAuth";

const PaperPreview = ({ step = null, goNext = () => {}, goPrev = () => {} }) => {
  const paperQuestions = useSelector((state) => getSelectedQuestionsWithDetails(state?.questions));
  const { paperDetails } = useSelector((state) => state.createPaper);
  const dispatch = useDispatch();

  const { token } = useAuth();

  //   Submit Paper

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (formData) => updateData("add-paper-questions", token, formData, "POST"),
    onSuccess: (data) => {
      toast.success(data?.message);
      console.log(data);
    },
    onError: (error) => {
      toast.error(error?.message);
      console.log(error);
    },
  });

  const handleSubmit = async () => {
    const outputData = {
      questions: [],
      id: paperDetails?.id,
    };

    // Iterate over each key in the input data
    for (const [key, value] of Object.entries(paperQuestions)) {
      // Extract question IDs and marks for each section
      const questionIds = value.questions.map((q) => q.id);
      const marks = value.marks;

      // Create the section object dynamically
      const section = {};
      section[key] = {
        question: questionIds,
        marks: parseInt(marks, 10), // Convert marks to an integer if it's a string
      };

      // Add the section to the output questions array
      outputData.questions.push(section);
    }

    console.log(outputData);
    await mutateAsync(outputData);
  };

  return (
    <div className="w-full">
      <AppButton type="button" onClick={() => dispatch(goPrev())} className=" bg-red-600 text-sm mb-2">
        Go Back
      </AppButton>
      <div className=" flex items-center justify-center">
        {isPending ? (
          <div className=" h-14 w-full animate-pulse bg-slate-300"></div>
        ) : (
          <PDFDownloadLink onClick={handleSubmit} document={<PDFPreview headerDetails={paperDetails} questionsList={paperQuestions} />} fileName="nexusPaper.pdf" className="p-2 bg-red-600 w-full text-center text-white font-semibold mb-0" style={{ width: "100%" }}>
            {({ loading }) => (loading ? "Loading document..." : "Download now!")}
          </PDFDownloadLink>
        )}
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

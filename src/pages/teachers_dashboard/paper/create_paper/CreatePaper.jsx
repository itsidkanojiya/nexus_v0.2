import React from "react";
import PaperDetails from "../PaperDetails";
import QuestionsList from "../../questions_list/QuestionsList";
import { useDispatch, useSelector } from "react-redux";
import { goNext, goPrev } from "./createPaperSlice";
import PaperPreview from "./PaperPreview";
import AddMarks from "./AddMarks";

const CreatePaper = () => {
  const { step, paperDetails } = useSelector((state) => state.createPaper);

  return (
    <>
      {step === 0 && <PaperDetails goNext={goNext} goPrev={goPrev} step={step} />}
      {step === 1 && <QuestionsList goNext={goNext} goPrev={goPrev} step={step} paperDetails={paperDetails} />}
      {step === 2 && <AddMarks goNext={goNext} goPrev={goPrev} step={step} />}
      {step === 3 && <PaperPreview goNext={goNext} goPrev={goPrev} step={step} />}
    </>
  );
};

export default CreatePaper;

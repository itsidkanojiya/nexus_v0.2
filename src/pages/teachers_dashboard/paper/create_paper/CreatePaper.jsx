import React from "react";
import PaperDetails from "../PaperDetails";
import QuestionsList from "../../questions_list/QuestionsList";
import { useDispatch, useSelector } from "react-redux";

import PaperPreview from "../../paper_preview/PaperPreview";
import AddMarks from "./AddMarks";
import { useState } from "react";

const CreatePaper = () => {
    const [step, setStep] = useState(0);

    const goNext = () => {
        setStep(step + 1);
    };

    const goPrev = () => {
        setStep(step - 1);
    };

    return (
        <>
            {step === 0 && <PaperDetails goNext={goNext} goPrev={goPrev} />}
            {step === 1 && <QuestionsList goNext={goNext} goPrev={goPrev} />}
            {step === 2 && <AddMarks goNext={goNext} goPrev={goPrev} />}
            {step === 3 && <PaperPreview goNext={goNext} goPrev={goPrev} />}
        </>
    );
};

export default CreatePaper;

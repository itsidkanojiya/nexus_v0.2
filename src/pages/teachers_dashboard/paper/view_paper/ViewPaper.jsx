import React from "react";
import { useState } from "react";
import PaperList from "./PaperList";
import PaperDetails from "./PaperDetails";

import QuestionsList from "./QuestionsList";
import PaperPreview from "../create_paper/PaperPreview";
import AddMarks from "./AddMarks";

const ViewPaper = () => {
    const [step, setStep] = useState(0);

    const goNext = () => {
        setStep(step + 1);
    };

    const goPrev = () => {
        setStep(step - 1);
    };

    return (
        <>
            {step === 0 && <PaperList goNext={goNext} />}
            {step === 1 && <PaperDetails goNext={goNext} goPrev={goPrev} />}
            {step === 2 && <QuestionsList goNext={goNext} goPrev={goPrev} />}
            {step === 3 && <AddMarks goNext={goNext} goPrev={goPrev} />}
            {step === 4 && <PaperPreview goPrev={goPrev} />}
        </>
    );
};

export default ViewPaper;

import React from "react";
import { useState } from "react";
import PaperList from "./PaperList";
import PaperDetails from "./PaperDetails";

import QuestionsList from "./QuestionsList";
import PaperPreview from "../paper_preview/PaperPreview";
import AddMarks from "./AddMarks";
import useAuth from "../../../../hooks/useAuth";

const ViewPaper = () => {
    const [step, setStep] = useState(0);
    const [isFromFirst, setIsFromFirst] = useState(false);

    const { token } = useAuth();
    const goNext = () => {
        setStep(step + 1);
    };

    const goPrev = () => {
        if (isFromFirst) {
            setIsFromFirst(false);
            setStep(0);
        } else {
            setStep(step - 1);
        }
    };

    return (
        <>
            {step === 0 && (
                <PaperList
                    goNext={goNext}
                    goLast={() => {
                        setIsFromFirst(true);
                        setStep(4);
                    }}
                />
            )}
            {step === 1 && <PaperDetails goNext={goNext} goPrev={goPrev} />}
            {step === 2 && <QuestionsList goNext={goNext} goPrev={goPrev} />}
            {step === 3 && <AddMarks goNext={goNext} goPrev={goPrev} />}
            {step === 4 && <PaperPreview goPrev={goPrev} />}
        </>
    );
};

export default ViewPaper;

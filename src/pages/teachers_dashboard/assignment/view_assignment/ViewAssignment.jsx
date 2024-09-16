import React from "react";
import { useState } from "react";
import AssignmentList from "./AssignmentList";
import AssignmentDetails from "./AssignmentDetails";

import QuestionsList from "./QuestionsList";
import AssignmentPreview from "../AssignmentPreview";
import AddMarks from "./AddMarks";

const ViewAssignment = () => {
    const [step, setStep] = useState(0);
    const [isFromFirst, setIsFromFirst] = useState(false);

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
    const goLast = () => {
        setIsFromFirst(true);
        setStep(3);
    };

    return (
        <>
            {step === 0 && <AssignmentList goNext={goNext} goLast={goLast} />}
            {step === 1 && (
                <AssignmentDetails goNext={goNext} goPrev={goPrev} />
            )}
            {step === 2 && <QuestionsList goNext={goNext} goPrev={goPrev} />}
            {/* {step === 3 && <AddMarks goNext={goNext} goPrev={goPrev} />} */}
            {step === 3 && <AssignmentPreview goPrev={goPrev} />}
        </>
    );
};

export default ViewAssignment;

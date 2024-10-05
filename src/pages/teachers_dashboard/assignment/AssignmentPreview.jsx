import React from "react";
import { getSelectedQuestionsWithDetails } from "../../../store/features/questionsSlice";
import { useDispatch, useSelector } from "react-redux";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

import AppButton from "../../../components/buttons/AppButton";
import { useMutation } from "@tanstack/react-query";
import updateData from "../../../helpers/updateData";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import { usePaperStore } from "../../../zustand/store";
import PDFPreview from "../../../components/assignment_pdf/PDFPreview";
import { useState } from "react";

const PaperPreview = ({
    step = null,
    goNext = () => {},
    goPrev = () => {},
}) => {
    const { token, user } = useAuth();
    const paper = usePaperStore((state) => state.paper);
    const dispatch = useDispatch();
    const [showAnswers, setShowAnswers] = useState(false);

    const { formDatatoken } = useAuth();

    if (paper?.language === "hindi") {
        dispatch(setLanguage("hindi"));
    } else if (paper?.language === "gujarati") {
        dispatch(setLanguage("gujarati"));
    }

    const paperQuestions = useSelector((state) =>
        getSelectedQuestionsWithDetails(state?.questions)
    );

    //   Submit Paper

    const { mutateAsync: addQuestions, isPending } = useMutation({
        mutationFn: (data) =>
            updateData("add-assignment-questions", data, token, "POST", true),
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
            id: paper?.id,
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
        await addQuestions(outputData);
    };

    return (
        <div className="w-full">
            <div className=" flex justify-between items-center">
                <AppButton
                    type="button"
                    onClick={() => goPrev()}
                    className=" bg-red-600 text-sm mb-2"
                >
                    Go Back
                </AppButton>
                <label>
                    <input
                        type="checkbox"
                        checked={showAnswers}
                        onChange={(event) => {
                            setShowAnswers(event.target.checked);
                        }}
                    />
                    {"  "}Show Answers
                </label>
            </div>

            <div className=" flex items-center justify-center">
                {isPending ? (
                    <div className=" h-14 w-full animate-pulse bg-slate-300 "></div>
                ) : (
                    <div
                        onClick={handleSubmit}
                        className="text-white hover:text-blue-200 w-[100%] mx-auto text-center bg-red-600 p-2 cursor-pointer"
                    >
                        Save
                    </div>
                )}

                {isPending ? (
                    <div className=" h-14 w-full animate-pulse bg-slate-300 "></div>
                ) : (
                    <PDFDownloadLink
                        onClick={handleSubmit}
                        document={
                            <PDFPreview
                                headerDetails={paper}
                                questionsList={paperQuestions}
                                showAnswers={showAnswers}
                            />
                        }
                        fileName="nexusPaper.pdf"
                        className="p-2 bg-red-600 w-full text-center text-white hover:text-blue-200  font-semibold mb-0"
                        style={{ width: "100%" }}
                    >
                        {({ loading }) =>
                            loading ? "Loading document..." : "Download"
                        }
                    </PDFDownloadLink>
                )}
            </div>
            <div className="">
                <PDFViewer className="w-full min-h-[600px]" showToolbar={false}>
                    <PDFPreview
                        headerDetails={paper}
                        questionsList={paperQuestions}
                        showAnswers={showAnswers}
                    />
                </PDFViewer>
            </div>
        </div>
    );
};

export default PaperPreview;

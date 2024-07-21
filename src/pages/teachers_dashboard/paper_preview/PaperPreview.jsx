import React from "react";
import PDFPreview from "../../../components/pepar_pdf/PDFPreview";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { questionsList } from "../../../constants/testQuestions";
import { useSelector } from "react-redux";
import { getSelectedQuestionsWithDetails } from "../questions_list/questionsSlice";
import { usePaperStore } from "../../../zustand/store";
import updateData from "../../../helpers/updateData";

const PaperPreview = () => {
    const { token, user } = useAuth();
    const paperQuestions = useSelector((state) =>
        getSelectedQuestionsWithDetails(state?.questions)
    );
    const paper = usePaperStore((state) => state.paper);

    // Edit Paper Details
    const { mutateAsync: editQuestions, isPending: isPendingEdit } =
        useMutation({
            mutationFn: (data) =>
                updateData("add-paper-questions", data, token, "POST"),
            onSuccess: (data) => {
                toast.success(data?.message);
                goNext();
                // setPaper(data?.paper_details);
            },
            onError: (error) => {
                toast.error(error?.message);
            },
        });

    const onSubmit = async (data) => {
        if (paper) {
            const outputData = {
                questions: [],
                id: paper?.id,
            };
            console.log(selectedQuestions);

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
            await editQuestions(outputData);
        }
    };
    return (
        <div className="w-full">
            <div className=" flex items-center justify-center">
                <PDFDownloadLink
                    document={
                        <PDFPreview
                            headerDetails={paper}
                            questionsList={paperQuestions}
                        />
                    }
                    fileName="nexusPaper.pdf"
                    className="p-2 bg-red-600 w-full text-center text-white font-semibold mb-0"
                    style={{ width: "100%" }}
                >
                    {({ loading }) =>
                        loading ? "Loading document..." : "Download now!"
                    }
                </PDFDownloadLink>
            </div>
            <div className="">
                <PDFViewer className="w-full min-h-[600px]" showToolbar={false}>
                    <PDFPreview
                        headerDetails={paper}
                        questionsList={paperQuestions}
                    />
                </PDFViewer>
            </div>
        </div>
    );
};

export default PaperPreview;

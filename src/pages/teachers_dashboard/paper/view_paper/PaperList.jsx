import PropTypes from "prop-types";
import React, { Component, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import getData from "../../../../helpers/getData";
import { usePaperStore } from "../../../../zustand/store";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedQuestionsWithDetails,
  setFilteredQuestion,
  setMarks,
  setSelectedQuestions,
} from "../../../../store/features/questionsSlice";
import PDFPreview from "../../../../components/paper_pdf/PDFPreview";

const PaperList = ({ goNext, goLast }) => {
  const { token, user } = useAuth();
  const setPaper = usePaperStore((state) => state.setPaper);
  const paperQuestions = useSelector((state) =>
    getSelectedQuestionsWithDetails(state?.questions)
  );
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getPaperHistory"],
    queryFn: () => getData("get-paper-history", token),
    enabled: !!token,
  });
  const dispatch = useDispatch();

  const { data: allQuestions } = useQuery({
    queryKey: ["getQuestions"],
    queryFn: () => getData("get-questions", token),
  });

  const setQuestionsForTypes = (questions) => {
    // Create an array to hold all questions
    const allQuestions = [];

    // Iterate over each question type
    Object.keys(questions).forEach((type) => {
      const questionsOfType = questions[type]?.questions || [];
      allQuestions.push(...questionsOfType);
    });

    // Dispatch the action with all collected questions
    dispatch(setSelectedQuestions(allQuestions));
  };

  return (
    <div className=" grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-2 mb-4">
      {data?.history.length === 0 ? (
        <div className="col-span-2 flex justify-center items-center h-48">
          <p className="text-lg text-gray-600">No Papers Available!</p>
        </div>
      ) : (
        data?.history?.map((paper) => (
          <div
            key={paper?.id}
            className="border p-2 rounded-xl shadow-sm bg-primary/10"
          >
            <div>
              <div className=" flex items-center justify-between gap-2 mb-2">
                <div className=" flex items-center gap-2">
                  <div className="px-3 py-0.5 mb-2 rounded-full text-[10px] bg-primary/30 border w-fit capitalize">
                    {paper?.type}
                  </div>
                  <div className="px-3 py-0.5 mb-2 rounded-full text-[10px] bg-primary/30  font-semibold border w-fit capitalize">
                    Date : {paper?.date}
                  </div>
                </div>
                <div className=" flex items-center gap-2">
                  <button
                    onClick={() => {
                      setPaper(paper);
                      if (allQuestions && paper) {
                        const newList = allQuestions.filter(
                          (question) =>
                            question?.std === paper?.std &&
                            question?.board?.toLowerCase() ===
                              paper?.board?.toLowerCase() &&
                            question?.subject?.toLowerCase() ==
                              paper?.subject?.toLowerCase()
                        );

                        dispatch(setFilteredQuestion(newList));
                        setQuestionsForTypes(paper?.questions);
                      }
                      const marks = {
                        mcq: paper.questions.mcq.marks,
                        blanks: paper.questions.blanks.marks,
                        true_false: paper.questions.true_false.marks,
                        onetwo: paper.questions.onetwo.marks,
                        short: paper.questions.short.marks,
                        long: paper.questions.long.marks,
                      };
                      dispatch(setMarks(marks));

                      goLast();
                    }}
                  >
                    <p className="text-[14px] capitalize bg-blue-900 text-white font-bold  px-4 py-1 shadow-md rounded-full ">
                      View
                    </p>
                  </button>
                  <button
                    onClick={() => {
                      setPaper(paper);

                      if (allQuestions && paper) {
                        const newList = allQuestions.filter(
                          (question) =>
                            question?.std === paper?.std &&
                            question?.board?.toLowerCase() ===
                              paper?.board?.toLowerCase() &&
                            question?.subject?.toLowerCase() ==
                              paper?.subject?.toLowerCase()
                        );

                        dispatch(setFilteredQuestion(newList));
                        setQuestionsForTypes(paper?.questions);
                      }
                      const marks = {
                        mcq: paper.questions.mcq.marks,
                        blanks: paper.questions.blanks.marks,
                        true_false: paper.questions.true_false.marks,
                        onetwo: paper.questions.onetwo.marks,
                        short: paper.questions.short.marks,
                        long: paper.questions.long.marks,
                      };
                      dispatch(setMarks(marks));

                      goNext();
                    }}
                  >
                    <p className="text-[14px] capitalize bg-blue-900 text-white font-bold  px-4 py-1 shadow-md rounded-full ">
                      Edit
                    </p>
                  </button>

                  {/* <PDFDownloadLink
                                    onClick={() => {
                                        setPaper(paper);
                                    }}
                                    document={
                                        <PDFPreview
                                            showAnswers={false}
                                            headerDetails={paper}
                                            questionsList={paperQuestions}
                                        />
                                    }
                                    fileName="nexusPaper.pdf"
                                    className="text-[14px] capitalize bg-blue-900 text-white font-bold  px-4 py-1 shadow-md rounded-full "
                                    style={{ width: "100%" }}
                                >
                                    Download
                                </PDFDownloadLink> */}
                </div>
              </div>
              <div className=" flex items-center gap-4 mb-2">
                <img src={paper?.logo} className="h-14" alt="school-logo" />
                <div>
                  <h1 className=" text-2xl uppercase font-bold">
                    {paper?.school_name}
                  </h1>
                  <h4 className=" capitalize text-sm">{paper?.address}</h4>
                </div>
              </div>
              {/* <div className="flex items-center gap-2 mb-2"> */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:flex md:items-center md:gap-2 md:mb-2">
                <p className="text-[12px] capitalize bg-gray-500/30 px-4 py-0.5 shadow-md rounded-full ">
                  std : <span className=" font-semibold"> {paper?.std}</span>
                </p>
                <p className="text-[12px] capitalize bg-gray-500/30 px-4 py-0.5 shadow-md rounded-full ">
                  subject :{" "}
                  <span className=" font-semibold">{paper?.subject}</span>
                </p>
                <p className="text-[12px] capitalize bg-gray-500/30 px-4 py-0.5 shadow-md rounded-full ">
                  timing :{" "}
                  <span className=" font-semibold">{paper?.timing}</span>
                </p>
                <p className="text-[12px] capitalize bg-gray-500/30 px-4 py-0.5 shadow-md rounded-full ">
                  division :{" "}
                  <span className=" font-semibold">{paper?.division}</span>
                </p>
                <p className="text-[12px] capitalize bg-gray-500/30 px-4 py-0.5 shadow-md rounded-full ">
                  day : <span className=" font-semibold">{paper?.day}</span>
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PaperList;

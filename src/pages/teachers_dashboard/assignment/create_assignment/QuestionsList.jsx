import React, { useEffect, useState } from "react";
import GetQuestionType from "../../../../components/get_question_type/GetQuestionType";
import GetChapter from "../../../../components/get_question_type/GetChapter";
import InputBox from "../../../../components/inputs/InputBox";
import { AiOutlineSearch } from "react-icons/ai";
import AppButton from "../../../../components/buttons/AppButton";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import getData from "../../../../helpers/getData";
import useAuth from "../../../../hooks/useAuth";
import { IoAdd, IoRemoveOutline } from "react-icons/io5";
import {
    addQuestion,
    removeQuestion,
    selectIsQuestionSelected,
    setFilteredQuestion,
    setQuestionsType,
    setChapter,
    setSearch,
} from "../../../../store/features/questionsSlice";
import Message from "../../../../components/Message";
import { usePaperStore } from "../../../../zustand/store";

export default function QuestionsList({ goNext, goPrev }) {
    const dispatch = useDispatch();
    const { token } = useAuth();
    const { filteredQuestion, selectedQuestions } = useSelector(
        (state) => state.questions
    );
    const paper = usePaperStore((state) => state.paper);

    const {
        data: allQuestions,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["getQuestions"],
        queryFn: () => getData("get-questions", token),
    });

    useEffect(() => {
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
        }
    }, [allQuestions, paper]);

    const changeQuestionType = (val) => {
        dispatch(setQuestionsType(val));
    };
    const changeChapter = (val) => {
        dispatch(setChapter(val));
    };

    const handleSearch = (e) => {
        const { value } = e.target;
        dispatch(setSearch(value));
    };

    return (
        <div>
            <div className=" flex justify-between items-center mb-4">
                <AppButton onClick={() => goPrev()} className=" text-xs">
                    Go Back
                </AppButton>
                {selectedQuestions?.length > 0 && (
                    <AppButton onClick={() => goNext()} className=" text-xs">
                        Next
                    </AppButton>
                )}
            </div>
            <div className=" grid grid-cols-[auto_1fr_1fr] gap-2 mb-4">
                <GetQuestionType handleChange={changeQuestionType} />
                <GetChapter handleChange={changeChapter} />
                <InputBox
                    handleChange={handleSearch}
                    name="search"
                    rightIcon={
                        <AiOutlineSearch className=" text-slate-600 text-2xl" />
                    }
                    placeholder="search"
                    type="search"
                    topLabel={false}
                />
            </div>

            {/* Questions */}
            <div className=" space-y-3">
                {filteredQuestion?.length > 0 ? (
                    filteredQuestion?.map((question) => (
                        <QuestionCard question={question} key={question?.id} />
                    ))
                ) : (
                    <Message type="error" message="No Questions Found" />
                )}
            </div>
        </div>
    );
}

export function QuestionCard({ question }) {
    const [showAns, setShowAns] = useState(false);
    const isSelected = useSelector((state) =>
        selectIsQuestionSelected(state.questions, question?.id)
    );
    const dispatch = useDispatch();

    return (
        <div className="w-full select-none">
            <div className="p-2 border bg-[#dcebfe] rounded-xl">
                <div className="">
                    <div className="mb-2">
                        <div className="flex justify-between items-center">
                            <p className="text-[14px] font-semibold bg-white w-fit px-3 rounded-full shadow-inner ">
                                {question?.subject} - {question?.std}
                            </p>

                            <div>
                                {isSelected ? (
                                    <button
                                        onClick={() =>
                                            dispatch(
                                                removeQuestion(question?.id)
                                            )
                                        }
                                        className=" hover:bg-red-500 border rounded-full bg-red-600 text-white border-red-600 font-bold p-1"
                                    >
                                        <IoRemoveOutline className="text-2xl" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() =>
                                            dispatch(addQuestion(question))
                                        }
                                        className=" border rounded-full bg-primary text-white border-primary font-bold p-1"
                                    >
                                        <IoAdd className="text-2xl" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-sm sm:text-base ">
                            {question?.question}
                        </h1>
                        {question?.options?.length > 0 ? (
                            <div className="flex gap-4">
                                {question?.options?.map((option, index) => (
                                    <div
                                        key={option}
                                        className="flex items-center gap-2 py-2"
                                    >
                                        <img
                                            src="/img/checkbox.png"
                                            className="h-2 xs:h-6"
                                        />
                                        <p className="text-[10px] xs:text-base">
                                            {option}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : null}
                        <div>
                            <div className="flex gap-2 items-center">
                                <div>
                                    <p className="text-sm">Answer</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setShowAns(true);
                                            } else {
                                                setShowAns(false);
                                            }
                                        }}
                                        type="checkbox"
                                        value=""
                                        className="sr-only peer"
                                    />
                                    <div className="group peer ring-0 bg-gradient-to-bl from-neutral-800 via-neutral-700 to-neutral-600 rounded-full outline-none duration-1000 after:duration-300 w-8 h-4 shadow-md peer-focus:outline-none after:content-[''] after:rounded-full after:absolute after:bg-gray-200 peer-checked:after:rotate-180 after:bg-gradient-to-r after:from-emerald-500 after:to-emerald-900 after:outline-none after:h-2 after:w-2 after:top-1 after:left-1 peer-checked:after:translate-x-4 peer-hover:after:scale-95 peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-emerald-900"></div>
                                </label>
                            </div>
                        </div>
                        {showAns && (
                            <div className="text-sm font-semibold mt-1">
                                Answer is : {question?.answer}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

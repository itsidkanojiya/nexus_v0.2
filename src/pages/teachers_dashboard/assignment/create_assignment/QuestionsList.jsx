import React, { useEffect, useMemo, useState } from "react";
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
  setFilteredQuestion, // optional if you still want it in Redux
  setMarks,
  setQuestionsType,
  setChapter,
  setSearch,
} from "../../../../store/features/questionsSlice";
import Message from "../../../../components/Message";
import { usePaperStore } from "../../../../zustand/store";

export default function QuestionsList({ goNext, goPrev }) {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const paper = usePaperStore((state) => state.paper);

  const {
    selectedQuestions,
    selectedQuestionType,
    selectedChapter,
    searchText, // make sure your slice has this
  } = useSelector((state) => state.questions);

  // 1) Queries
  const {
    data: allQuestions = [],
    isLoading: qLoading,
    isError: qError,
    error: qErr,
  } = useQuery({
    queryKey: ["getQuestions"],
    queryFn: () => getData("get-questions", token),
    enabled: !!token,
  });

  const {
    data: userResp,
    isLoading: userLoading,
    isError: userError,
    error: userErr,
  } = useQuery({
    queryKey: ["getUserProfile"],
    queryFn: () => getData("get-user", token),
    enabled: !!token,
  });

  // 2) Base filter by subject (from API) + std (from paper)
  const baseQuestions = useMemo(() => {
    if (!userResp?.user || !paper?.std) return [];
    const apiSubject = String(userResp.user.subject || "")
      .trim()
      .toLowerCase();
    const userStd = String(paper.std).trim().toLowerCase();

    return allQuestions.filter((q) => {
      const qSubject = String(q?.subject || "")
        .trim()
        .toLowerCase();
      const qStd = String(q?.std || "")
        .trim()
        .toLowerCase();
      return qSubject === apiSubject && qStd === userStd;
    });
  }, [allQuestions, userResp?.user?.subject, paper?.std]);

  // 3) Debounced search (optional)
  const [localSearch, setLocalSearch] = useState("");
  useEffect(() => {
    const id = setTimeout(() => dispatch(setSearch(localSearch)), 250);
    return () => clearTimeout(id);
  }, [localSearch, dispatch]);

  // 4) UI filters (type + chapter + search)
  const filtered = useMemo(() => {
    let list = baseQuestions;

    if (selectedQuestionType && selectedQuestionType !== "all") {
      const want = String(selectedQuestionType).trim().toLowerCase();
      list = list.filter(
        (q) =>
          String(q?.type || "")
            .trim()
            .toLowerCase() === want
      );
    }

    if (selectedChapter && selectedChapter !== "all") {
      list = list.filter((q) => String(q?.chapter) === String(selectedChapter));
    }

    const text = String(searchText || "")
      .trim()
      .toLowerCase();
    if (text) {
      list = list.filter((q) => {
        const hay = `${q?.question ?? ""} ${(q?.options || []).join(" ")} ${
          q?.answer ?? ""
        }`.toLowerCase();
        return hay.includes(text);
      });
    }

    return list;
  }, [baseQuestions, selectedQuestionType, selectedChapter, searchText]);

  // If you still want the filtered list mirrored in Redux:
  useEffect(() => {
    dispatch(setFilteredQuestion(filtered));
  }, [filtered, dispatch]);

  // 5) Handlers
  const changeQuestionType = (val) =>
    dispatch(setQuestionsType(val === "all" ? null : val));
  const changeChapter = (val) =>
    dispatch(setChapter(val === "all" ? null : val));
  const handleSearch = (e) => setLocalSearch(e.target.value);

  // 6) Loading/Errors
  if (qLoading || userLoading) {
    return <Message type="info" message="Loading questions…" />;
  }
  if (qError) {
    return (
      <Message
        type="error"
        message={`Failed to load questions: ${qErr?.message || ""}`}
      />
    );
  }
  if (userError) {
    return (
      <Message
        type="error"
        message={`Failed to load user: ${userErr?.message || ""}`}
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <AppButton onClick={goPrev} className="text-xs">
          Go Back
        </AppButton>
        {selectedQuestions?.length > 0 && (
          <AppButton
            onClick={() => {
              dispatch(setMarks({}));
              goNext();
            }}
            className="text-xs"
          >
            Next
          </AppButton>
        )}
      </div>

      <div className="grid lg:grid-cols-[auto_1fr_1fr] gap-2 mb-4">
        <GetQuestionType handleChange={changeQuestionType} />
        <GetChapter handleChange={changeChapter} />
        <InputBox
          handleChange={handleSearch}
          name="search"
          rightIcon={<AiOutlineSearch className="text-slate-600 text-2xl" />}
          placeholder="search"
          type="search"
          topLabel={false}
          defaultValue={searchText || ""}
        />
      </div>

      {/* Questions */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((question) => (
            <QuestionCard
              question={question}
              key={question?.id ?? question?._id}
            />
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
    selectIsQuestionSelected(state.questions, question?.id ?? question?._id)
  );
  const dispatch = useDispatch();

  const qId = question?.id ?? question?._id;

  return (
    <div className="w-full select-none">
      <div className="p-2 border bg-[#dcebfe] rounded-xl">
        <div className="mb-2">
          <div className="flex justify-between items-center">
            <p className="text-[14px] font-semibold bg-white w-fit px-3 rounded-full shadow-inner ">
              {question?.subject} - {question?.std}
            </p>

            <div>
              {isSelected ? (
                <button
                  onClick={() => dispatch(removeQuestion(qId))}
                  className="hover:bg-red-500 border rounded-full bg-red-600 text-white border-red-600 font-bold p-1"
                >
                  <IoRemoveOutline className="text-2xl" />
                </button>
              ) : (
                <button
                  onClick={() => dispatch(addQuestion(question))}
                  className="border rounded-full bg-primary text-white border-primary font-bold p-1"
                >
                  <IoAdd className="text-2xl" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-sm sm:text-base ">{question?.question}</h1>

          {Array.isArray(question?.options) && question.options.length > 0 && (
            <div className="flex gap-4">
              {question.options.map((option, idx) => (
                <div
                  key={`${qId}-opt-${idx}`}
                  className="flex items-center gap-2 py-2"
                >
                  <p className="text-[10px] xs:text-base">{option}</p>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2 items-center">
            <p className="text-sm">Answer</p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                onChange={(e) => setShowAns(e.target.checked)}
                type="checkbox"
                className="sr-only peer"
              />
              <div className="group peer ring-0 bg-gradient-to-bl from-neutral-800 via-neutral-700 to-neutral-600 rounded-full outline-none duration-1000 after:duration-300 w-8 h-4 shadow-md peer-focus:outline-none after:content-[''] after:rounded-full after:absolute after:bg-gray-200 peer-checked:after:rotate-180 after:bg-gradient-to-r after:from-emerald-500 after:to-emerald-900 after:outline-none after:h-2 after:w-2 after:top-1 after:left-1 peer-checked:after:translate-x-4 peer-hover:after:scale-95 peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-emerald-900"></div>
            </label>
          </div>

          {showAns && (
            <div className="text-sm font-semibold mt-1">
              Answer is : {question?.answer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

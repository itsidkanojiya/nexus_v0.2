import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    questionsList: [],
    filteredQuestion: [],
    selectedQuestions: [],
    marks: {
        mcq: 0,
        blanks: 0,
        true_false: 0,
        onetwo: 0,
        short: 0,
        long: 0,
    },
};

const questionSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        setFilteredQuestion: (state, action) => {
            state.questionsList = action.payload;
            state.filteredQuestion = action.payload;
        },
        addQuestion: (state, action) => {
            const exists = state.selectedQuestions?.some(
                (question) => question.id === action.payload.id
            );
            if (!exists) {
                state.selectedQuestions.push(action.payload);
            }
        },
        removeQuestion: (state, action) => {
            state.selectedQuestions = state.selectedQuestions.filter(
                (question) => question.id !== action.payload
            );
        },
        setQuestionsType: (state, action) => {
            if (action?.payload) {
                state.filteredQuestion = state?.questionsList?.filter(
                    (question) => question?.type === action.payload
                );
            } else {
                state.filteredQuestion = state?.questionsList;
            }
        },
        setChapter: (state, action) => {
            if (action?.payload) {
                state.filteredQuestion = state?.questionsList?.filter(
                    (question) => question?.chapter === action.payload
                );
            } else {
                state.filteredQuestion = state?.questionsList;
            }
        },
        setSearch: (state, action) => {
            state.filteredQuestion = state?.questionsList?.filter((question) =>
                question?.question
                    ?.toLowerCase()
                    .includes(action?.payload.toLowerCase())
            );
        },
        setMarks: (state, action) => {
            console.log(action.payload);
            state.marks = action.payload;
        },
        resetQuestions: (state) => {
            state.filteredQuestion = state.questionsList;
            state.selectedQuestions = [];
        },
        setSelectedQuestions: (state, action) => {
            state.selectedQuestions = action.payload;
        },
    },
});

export const {
    setFilteredQuestion,
    addQuestion,
    removeQuestion,
    setMarks,
    setQuestionsType,
    setChapter,
    setSearch,
    resetQuestions,
    setSelectedQuestions,
} = questionSlice.actions;
export default questionSlice.reducer;

// Selector to check if a question is in selectedQuestions
export const selectIsQuestionSelected = (state, questionId) =>
    state.selectedQuestions?.some((question) => question.id === questionId);

// Selector to get selected questions grouped by their types, titles, and marks
export const getSelectedQuestionsWithDetails = (state) => {
    const titles = {
        mcq: "Multiple Choice Questions (MCQs). Tick the correct options.",
        blanks: "Fill in the blanks in each sentence with an appropriate word.",
        true_false: "Write (T) for True and (F) for False.",
        onetwo: "Answer the following questions in one or two sentences.",
        short: "Short Answer Questions.",
        long: "Long Answer Questions.",
    };

    const groupedQuestions = state.selectedQuestions.reduce((acc, question) => {
        if (!acc[question.type]) {
            acc[question.type] = {
                title: titles[question.type],
                questions: [],
                marks: state.marks[question.type] || 0,
            };
        }
        acc[question.type].questions.push(question);
        return acc;
    }, {});

    return groupedQuestions;
};

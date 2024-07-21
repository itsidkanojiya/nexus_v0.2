import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    questionsList: [],
    filteredQuestion: [],
    selectedQuestions: [],
    questions_type: null,
    search: null,
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
        setQuestionsList: (state, action) => {
            state.questionsList = action.payload;
            state.filteredQuestion = action.payload;
        },
        setFilteredQuestion: (state, action) => {
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
            state.questions_type = action.payload;
            if (action?.payload) {
                state.filteredQuestion = state?.questionsList?.filter(
                    (question) => question?.type === action.payload
                );
            } else {
                state.filteredQuestion = state?.questionsList;
            }
        },
        setSearch: (state, action) => {
            state.search = action.payload;
            state.filteredQuestion = state?.questionsList?.filter((question) =>
                question?.question?.includes(action?.payload)
            );
        },
        setMarks: (state, action) => {
            console.log(action.payload);
            state.marks = action.payload;
        },
        resetQuestions: (state) => {
            state.filteredQuestion = state.questionsList;
            state.selectedQuestions = [];
            state.questions_type = null;
            state.search = null;
        },
        setSelectedQuestions: (state, action) => {
            state.selectedQuestions = action.payload;
        },
    },
});

export const {
    setQuestionsList,
    setFilteredQuestion,
    addQuestion,
    removeQuestion,
    setMarks,
    setQuestionsType,
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
        mcq: "Multiple Choice Questions (MCQs)",
        blanks: "Fill in the Blanks",
        true_false: "True or False",
        onetwo: "One-liner Questions",
        short: "Short Questions",
        long: "Long Questions",
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

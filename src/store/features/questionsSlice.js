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
    language: "english",
};

const questionSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload; // Update language
        },
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
    setLanguage,
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

    const hindiTitles = {
        mcq: "&#2348;&#2361;&#2369;&#2357;&#2367;&#2325;&#2354;&#2381;&#2346;&#2368;&#2351; &#2346;&#2381;&#2352;&#2358;&#2381;&#2344; (MCQs)&#2404; &#2360;&#2361;&#2368; &#2357;&#2367;&#2325;&#2354;&#2381;&#2346;&#2379;&#2306; &#2346;&#2352; &#2335;&#2367;&#2325; (&#10003;) &#2325;&#2368;&#2332;&#2367;&#2319;&#2404;",
        blanks: "⁠प्रत्येक वाक्य में रिक्त स्थानों को एक उपयुक्त शब्द से भरें।",
        true_false: "⁠सत्य के लिए (T) और असत्य के लिए (F) लिखें।",
        onetwo: "⁠निम्नलिखित प्रश्नों के उत्तर एक या दो वाक्यों में दीजिए।",
        short: "⁠लघु उत्तरीय प्रश्न।",
        long: "दीर्घ उत्तरीय प्रश्न।",
    };
    const gujaratiTitles = {
        mcq: "ઇ પ્રભામંડળ",
        blanks: "યોગ્ય શબ્દ પસંદ કરી ખાલી જગ્યા પૂરો.",
        true_false:
            "ખરાં વાક્ય સામે ખરાં  ✓ અને ખોટાં વાક્ય સામે ખોટાં × ની નિશાની કરો.",
        onetwo: "નીચે આપેલા પ્રશ્નોના બે ત્રણ વાક્યમાં જવાબ લખો. ",
        short: "નીચે આપેલા પ્રશ્નોના જવાબ ટૂંકમાં લખો.",
        long: "નીચે આપેલા પ્રશ્નોના જવાબ વિસ્તારપૂર્વક લખો.",
    };

    const selectedTitles =
        state.language === "hindi"
            ? hindiTitles
            : state.language === "english"
            ? gujaratiTitles
            : titles;

    const groupedQuestions = state.selectedQuestions.reduce((acc, question) => {
        if (!acc[question.type]) {
            acc[question.type] = {
                title: selectedTitles[question.type],
                questions: [],
                marks: state.marks[question.type] || 0,
            };
        }
        acc[question.type].questions.push(question);
        return acc;
    }, {});

    return groupedQuestions;
};

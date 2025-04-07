import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    questionsList: [],
    filteredQuestion: [],
    selectedQuestions: [],
    marks: { mcq: 0, blanks: 0, true_false: 0, onetwo: 0, short: 0, long: 0 },
    language: "english",
    selectedQuestionType: null,  // Added
    selectedChapter: null        // Added
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
            state.selectedQuestionType = action.payload;
        
            state.filteredQuestion = state.questionsList.filter((question) => {
                const matchesType = action.payload
                    ? question?.type?.trim().toLowerCase() === String(action.payload).trim().toLowerCase()
                    : true; 
                const matchesChapter = state.selectedChapter
                    ? String(question?.chapter) === String(action.payload)
                    : true; 
                return matchesType && matchesChapter;
            });
        },
        
        setChapter: (state, action) => {
            state.selectedChapter = action.payload;
        
            state.filteredQuestion = state.questionsList.filter((question) => {
                const matchesType = state.selectedQuestionType
                    ? question?.type?.trim().toLowerCase() === String(state.selectedQuestionType).trim().toLowerCase()
                    : true; 
                
                const matchesChapter = action.payload
                    ? String(question?.chapter) === String(action.payload)  // Convert both to string
                    : true; 
                
                return matchesType && matchesChapter;
            });
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
        mcq: "⁠बहुविकल्पीय प्रश्न (MCQs)। सही विकल्पों पर टिक कीजिए।",
        blanks: "⁠प्रत्येक वाक्य में रिक्त स्थानों को एक उपयुक्त शब्द से भरें।",
        true_false: "⁠सत्य के लिए (T) और असत्य के लिए (F) लिखें।",
        onetwo: "⁠निम्नलिखित प्रश्नों के उत्तर एक या दो वाक्यों में दीजिए।",
        short: "⁠लघु उत्तरीय प्रश्न।",
        long: "दीर्घ उत्तरीय प्रश्न।",
    };
    const gujaratiTitles = {
        mcq: "નીચે આપેલા વિકલ્પોમાંથી યોગ્ય વિકલ્પ પસંદ કરી ખરાં ✓ ની નિશાની કરો.",
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
            : state.language === "gujarati"
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

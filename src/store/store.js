import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./features/appSlice";
import questionsReducer from "../pages/teachers_dashboard/questions_list/questionsSlice";

export const store = configureStore({
    reducer: {
        app: appReducer,
        questions: questionsReducer,
    },
});

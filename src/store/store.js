import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./features/appSlice";
import createPaperReducer from "../pages/teachers_dashboard/paper/create_paper/createPaperSlice";
import questionsReducer from "../pages/teachers_dashboard/questions_list/questionsSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    createPaper: createPaperReducer,
    questions: questionsReducer,
  },
});

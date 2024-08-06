import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./features/appSlice";
import questionsReducer from "./features/questionsSlice";
import ncertBookReducer from "../pages/ncert/ncert_books/ncertBooksSlice";
import ncertBooksSolutionReducer from "../pages/ncert/ncert_books_solution/ncertBooksSolutionSlice";
import stateBoardBooksReducer from "../pages/state_board/state_board_books/stateBoardBooksSlice";
import stateBoardBooksSolutionReducer from "../pages/state_board/state_board_books_solution/stateBoardBooksSolutionSlice";

export const store = configureStore({
    reducer: {
        app: appReducer,
        questions: questionsReducer,
        ncertBooks: ncertBookReducer,
        ncertBooksSolution: ncertBooksSolutionReducer,
        stateBoardBooks: stateBoardBooksReducer,
        stateBoardBooksSolution: stateBoardBooksSolutionReducer,
    },
});

import { createSlice } from "@reduxjs/toolkit";

const stateBoardBooksSolutionSlice = createSlice({
  name: "stateBoardBooksSolution",
  initialState: {
    books: [],
    filtered_books: [],
    selected_standard: 1,
    selected_subject: null,
    selected_board: null,
    search_Query: null,
  },
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
      state.filtered_books = state.books?.filter((book) => Number(book.std) === Number(state.selected_standard));
    },
    setSelectedStandard: (state, action) => {
      state.selected_standard = action.payload;
      state.filtered_books = state.books?.filter((book) => Number(book.std) === Number(action.payload));
    },
    setSelectedSubject: (state, action) => {
      if (action.payload == 0) {
        state.filtered_books = state.books?.filter((book) => Number(book.std) === Number(state.selected_standard));
      } else {
        state.selected_subject = action.payload;
        state.filtered_books = state.books?.filter((book) => book.name.toLowerCase() === action.payload.toLowerCase());
      }
    },
    setBoard: (state, action) => {
      if (action.payload == 0) {
        state.filtered_books = state.books?.filter((book) => Number(book.std) === Number(state.selected_standard));
      } else {
        state.selected_board = action.payload;
        state.filtered_books = state.books?.filter((book) => book.board_name.toLowerCase() === action.payload.toLowerCase());
      }
    },
    setSearchQuery: (state, action) => {
      state.search_Query = action.payload;
      state.filtered_books = state.books?.filter((book) => book.name.toLowerCase().includes(action.payload.toLowerCase()) || book.chapter_name.toLowerCase().includes(action.payload.toLowerCase()));
    },
  },
});

export const { setSelectedStandard, setSelectedSubject, setSearchQuery, setBooks, setBoard } = stateBoardBooksSolutionSlice.actions;

export default stateBoardBooksSolutionSlice.reducer;

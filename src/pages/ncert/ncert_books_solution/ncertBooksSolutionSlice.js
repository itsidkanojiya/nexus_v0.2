import { createSlice } from "@reduxjs/toolkit";

const ncertBooksSolutionSlice = createSlice({
  name: "ncertBooksSolution",
  initialState: {
    books: [],
    filtered_books: [],
    selected_standard: 1,
    selected_subject: null,
    search_query: null,
  },
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
      // Apply filtering logic after setting books
      state.filtered_books = state.books.filter(
        (book) =>
          Number(book.std) === Number(state.selected_standard) &&
          (!state.selected_subject || book.name.toLowerCase() === state.selected_subject.toLowerCase()) &&
          (!state.search_query ||
            book.name.toLowerCase().includes(state.search_query.toLowerCase()) ||
            book.chapter_name.toLowerCase().includes(state.search_query.toLowerCase()))
      );
    },
    setSelectedStandard: (state, action) => {
      state.selected_standard = action.payload;
      // Apply filtering logic when standard is changed
      state.filtered_books = state.books.filter(
        (book) =>
          Number(book.std) === Number(action.payload) &&
          (!state.selected_subject || book.name.toLowerCase() === state.selected_subject.toLowerCase()) &&
          (!state.search_query ||
            book.name.toLowerCase().includes(state.search_query.toLowerCase()) ||
            book.chapter_name.toLowerCase().includes(state.search_query.toLowerCase()))
      );
    },
    setSelectedSubject: (state, action) => {
      state.selected_subject = action.payload === 0 ? null : action.payload;
      // Apply filtering logic when subject is changed
      state.filtered_books = state.books.filter(
        (book) =>
          Number(book.std) === Number(state.selected_standard) &&
          (!state.selected_subject || book.name.toLowerCase() === state.selected_subject.toLowerCase()) &&
          (!state.search_query ||
            book.name.toLowerCase().includes(state.search_query.toLowerCase()) ||
            book.chapter_name.toLowerCase().includes(state.search_query.toLowerCase()))
      );
    },
    setSearchQuery: (state, action) => {
      state.search_query = action.payload;
      // Apply filtering logic when search query is updated
      state.filtered_books = state.books.filter(
        (book) =>
          Number(book.std) === Number(state.selected_standard) &&
          (!state.selected_subject || book.name.toLowerCase() === state.selected_subject.toLowerCase()) &&
          (!state.search_query ||
            book.name.toLowerCase().includes(state.search_query.toLowerCase()) ||
            book.chapter_name.toLowerCase().includes(state.search_query.toLowerCase()))
      );
    },
  },
});

export const { setBooks, setSelectedStandard, setSelectedSubject, setSearchQuery } =
  ncertBooksSolutionSlice.actions;

export default ncertBooksSolutionSlice.reducer;

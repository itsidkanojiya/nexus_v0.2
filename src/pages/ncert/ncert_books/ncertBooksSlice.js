import { createSlice } from "@reduxjs/toolkit";

const ncertBooksSlice = createSlice({
  name: "ncertBooks",
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
      state.filtered_books = state.books; // Initialize with all books
    },
    setSelectedStandard: (state, action) => {
      state.selected_standard = action.payload;
      state.filtered_books = state.books.filter(
        (book) =>
          Number(book.std) === Number(state.selected_standard) &&
          (!state.selected_subject || book.name.toLowerCase() === state.selected_subject.toLowerCase()) &&
          (!state.search_query || 
            book.name.toLowerCase().includes(state.search_query.toLowerCase()) ||
            book.chapter_name.toLowerCase().includes(state.search_query.toLowerCase()))
      );
    },
    setSelectedSubject: (state, action) => {
      state.selected_subject = action.payload === 0 ? null : action.payload;
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

export const { setBooks, setSelectedStandard, setSelectedSubject, setSearchQuery } = ncertBooksSlice.actions;

export default ncertBooksSlice.reducer;

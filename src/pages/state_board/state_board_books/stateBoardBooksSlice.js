import { createSlice } from "@reduxjs/toolkit";

const stateBoardBooksSlice = createSlice({
  name: "stateBoardBooks",
  initialState: {
    books: [],
    filtered_books: [],
    selected_standard: 1,
    selected_subject: null,
    selected_board: null,
    search_query: null,
  },
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
      // Apply all active filters after books are set
      state.filtered_books = state.books.filter(
        (book) =>
          Number(book.std) === Number(state.selected_standard) &&
          (!state.selected_subject || book.name.toLowerCase() === state.selected_subject.toLowerCase()) &&
          (!state.selected_board || book.board_name.toLowerCase() === state.selected_board.toLowerCase()) &&
          (!state.search_query || 
            book.name.toLowerCase().includes(state.search_query.toLowerCase()) ||
            book.chapter_name.toLowerCase().includes(state.search_query.toLowerCase()))
      );
    },
    setSelectedStandard: (state, action) => {
      state.selected_standard = action.payload;
      // Apply all active filters when standard changes
      state.filtered_books = state.books.filter(
        (book) =>
          Number(book.std) === Number(action.payload) &&
          (!state.selected_subject || book.name.toLowerCase() === state.selected_subject.toLowerCase()) &&
          (!state.selected_board || book.board_name.toLowerCase() === state.selected_board.toLowerCase()) &&
          (!state.search_query || 
            book.name.toLowerCase().includes(state.search_query.toLowerCase()) ||
            book.chapter_name.toLowerCase().includes(state.search_query.toLowerCase()))
      );
    },
    setSelectedSubject: (state, action) => {
      state.selected_subject = action.payload === 0 ? null : action.payload;
      // Apply all active filters when subject changes
      state.filtered_books = state.books.filter(
        (book) =>
          Number(book.std) === Number(state.selected_standard) &&
          (!state.selected_subject || book.name.toLowerCase() === state.selected_subject.toLowerCase()) &&
          (!state.selected_board || book.board_name.toLowerCase() === state.selected_board.toLowerCase()) &&
          (!state.search_query || 
            book.name.toLowerCase().includes(state.search_query.toLowerCase()) ||
            book.chapter_name.toLowerCase().includes(state.search_query.toLowerCase()))
      );
    },
    setBoard: (state, action) => {
      state.selected_board = action.payload === 0 ? null : action.payload;
      // Apply all active filters when board changes
      state.filtered_books = state.books.filter(
        (book) =>
          Number(book.std) === Number(state.selected_standard) &&
          (!state.selected_subject || book.name.toLowerCase() === state.selected_subject.toLowerCase()) &&
          (!state.selected_board || book.board_name.toLowerCase() === state.selected_board.toLowerCase()) &&
          (!state.search_query || 
            book.name.toLowerCase().includes(state.search_query.toLowerCase()) ||
            book.chapter_name.toLowerCase().includes(state.search_query.toLowerCase()))
      );
    },
    setSearchQuery: (state, action) => {
      state.search_query = action.payload;
      // Apply all active filters when search query changes
      state.filtered_books = state.books.filter(
        (book) =>
          Number(book.std) === Number(state.selected_standard) &&
          (!state.selected_subject || book.name.toLowerCase() === state.selected_subject.toLowerCase()) &&
          (!state.selected_board || book.board_name.toLowerCase() === state.selected_board.toLowerCase()) &&
          (!state.search_query || 
            book.name.toLowerCase().includes(state.search_query.toLowerCase()) ||
            book.chapter_name.toLowerCase().includes(state.search_query.toLowerCase()))
      );
    },
  },
});

export const { setBooks, setSelectedStandard, setSelectedSubject, setSearchQuery, setBoard } = stateBoardBooksSlice.actions;

export default stateBoardBooksSlice.reducer;

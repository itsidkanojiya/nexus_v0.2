import React, { useEffect } from "react";
import { getBooks } from "../../../services/apis_services";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  setBoard,
  setBooks,
  setSearchQuery,
  setSelectedStandard,
  setSelectedSubject,
} from "./stateBoardBooksSlice";
import ContainerBox from "../../../components/ContainerBox";
import SelectBox from "../../../components/select_box/SelectBox";
import { standards, subjects } from "../../../components/constants/data";
import GetSubjects from "../../../components/get_subjects/GetSubjects";
import SerachBox from "../../../components/serach_box/SerachBox";
import ErrorMessage from "../../../components/error_message/ErrorMessage";
import AppLoader from "../../../components/loader/AppLoader";
import BookCard from "../../../components/book_card/BookCard";
import GetBoards from "../../../components/get_boards/GetBoards";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";

export default function StateBoardBooks() {
  const dispatch = useDispatch();
  const { filtered_books } = useSelector((state) => state.stateBoardBooks);

  // Get Books Data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getBooks"],
    queryFn: () => getBooks(),
  });

  useEffect(() => {
    if (data) {
      const books = data?.books.filter(
        (book) => book?.board_name.toLowerCase() !== "ncert"
      );
      dispatch(setBooks(books));
    }
  }, [data]);

  const handleStandardChange = (value) => {
    dispatch(setSelectedStandard(value));
  };
  const handleSearch = (value) => {
    dispatch(setSearchQuery(value));
  };
  const handleSubjectChange = (value) => {
    dispatch(setSelectedSubject(value));
  };
  const handleBoardChange = (value) => {
    dispatch(setBoard(value));
  };

  return (
    <ContainerBox className="py-6 sm:py-8">
      <div className="grid grid-cols-2 sm:grid-cols-[100px_200px_1fr] md:grid-cols-[100px_200px_200px_1fr] gap-2 sm:gap-4">
        <div>
          <SelectBox handleChange={handleStandardChange}>
            {standards?.map((standard) => (
              <option key={standard} value={standard}>
                {standard}
              </option>
            ))}
          </SelectBox>
        </div>
        <div>
          <SelectBox handleChange={handleSubjectChange}>
            {subjects?.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </SelectBox>
        </div>
        {/* <div className="col-span-2 sm:col-auto">
                    <GetSubjects handleChange={handleSubjectChange} />
                </div> */}
        <div className="col-span-3 sm:col-auto">
          <GetBoards validate={true} handleChange={handleBoardChange} />
        </div>
        <div className=" col-span-3 md:col-auto">
          <SerachBox
            name="serach"
            handleSearch={handleSearch}
            placeholder="Serach..."
          />
        </div>
      </div>

      {isError && (
        <ErrorMessage>{error?.message || "Something went wrong"}</ErrorMessage>
      )}

      {isLoading ? (
        <AppLoader />
      ) : (
        <div className="mt-8">
          {filtered_books?.length > 0 ? (
            <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
              {filtered_books?.map((book) => (
                <BookCard key={book?.id} book={book} />
              ))}
            </div>
          ) : (
            <ErrorMessage>No Result Found</ErrorMessage>
          )}
        </div>
      )}
    </ContainerBox>
  );
}

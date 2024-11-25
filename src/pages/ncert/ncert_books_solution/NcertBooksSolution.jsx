import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSolutions } from "../../../services/apis_services";
import {
  setBooks,
  setSearchQuery,
  setSelectedStandard,
  setSelectedSubject,
} from "./ncertBooksSolutionSlice";
import ContainerBox from "../../../components/ContainerBox";
import SelectBox from "../../../components/select_box/SelectBox";
import GetSubjects from "../../../components/get_subjects/GetSubjects";
import SerachBox from "../../../components/serach_box/SerachBox";
import ErrorMessage from "../../../components/error_message/ErrorMessage";
import AppLoader from "../../../components/loader/AppLoader";
import BookCard from "../../../components/book_card/BookCard";
import { standards } from "../../../components/constants/data";
import { subjects } from "../../../constants/useFullData";

export default function NcertBooksSolution() {
  const dispatch = useDispatch();
  const { filtered_books } = useSelector((state) => state.ncertBooksSolution);

  // Get Books Data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getSolutions"],
    queryFn: () => getSolutions(),
  });

  useEffect(() => {
    if (data) {
      dispatch(setBooks(data?.solutions));
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
  return (
    <ContainerBox className="py-6 sm:py-8">
      <div className="grid grid-cols-2 sm:grid-cols-[100px_200px_1fr] gap-2 sm:gap-4">
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
              <option key={subject.name} value={subject.name}>
                {subject.name}
              </option>
            ))}
          </SelectBox>
        </div>
        {/* <div>
          <GetSubjects handleChange={handleSubjectChange} />
        </div> */}
        <div className=" col-span-2 sm:col-auto">
          <SerachBox
            name="serach"
            handleSearch={handleSearch}
            placeholder="Search..."
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

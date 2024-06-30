import { useQuery } from "@tanstack/react-query";
import React from "react";
import getData from "../../helpers/getData";
import PdfViewer from "../../components/pdfViewer/PdfViewer";

const Home = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["books"],
    queryFn: () => getData("books"),
  });
  return (
    <div>
      {/* {data?.books?.map((book) => (
        <div key={book?.id}>
          <PdfViewer file={book?.pdf_link} />
          </div>
          ))} */}
      <PdfViewer file={data?.books[0] && data?.books[0].pdf_link} />
    </div>
  );
};

export default Home;

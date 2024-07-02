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
    <div className=" grid grid-cols-4 gap-4">
      {data?.books?.map((book) => (
        <div key={book?.id}>
          <PdfViewer file={book?.pdf_link} />
        </div>
      ))}
    </div>
  );
};

export default Home;

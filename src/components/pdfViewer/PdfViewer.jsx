import React, { useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";
import { Document, Page } from "react-pdf";

const PdfViewer = ({ file }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  };

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prevPageNumber) => prevPageNumber - 1);
    }
  };

  return (
    <div className="border p-4 space-y-2 w-fit">
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        <Page height={200} width={300} pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
      </Document>
      <div className=" flex justify-center items-center">
        <div className="flex justify-center space-x-4 bg-white shadow-lg px-3 rounded-full">
          <button onClick={goToPreviousPage} disabled={pageNumber <= 1} className=" disabled:opacity-50">
            <GrFormPrevious className=" text-2xl" />
          </button>
          <p className="text-center my-2">
            Page {pageNumber} of {numPages}
          </p>
          <button onClick={goToNextPage} disabled={pageNumber >= numPages} className="disabled:opacity-50">
            <MdOutlineNavigateNext className=" text-2xl " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;

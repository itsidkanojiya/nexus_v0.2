import React, { useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";
import { Document, Page } from "react-pdf";
import "ldrs/ring";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const PdfViewer = ({ file }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(false);
  };

  const onDocumentLoadError = () => {
    setError(true);
    setLoading(false);
  };

  const goToNextPage = () => pageNumber < numPages && setPageNumber(p => p + 1);
  const goToPreviousPage = () => pageNumber > 1 && setPageNumber(p => p - 1);

  return (
    <div className="flex flex-col items-center w-full">
      {isLoading && !error && (
        <div className="my-8">
          <l-ring size="60" color="#14b8a6" />
        </div>
      )}

      {error && (
        <p className="text-red-500 text-sm mt-4">Failed to load PDF document.</p>
      )}

      {!error && (
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
        >
          {!isLoading && (
            <Page
              pageNumber={pageNumber}
              width={500}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="border shadow-md rounded-lg bg-white"
            />
          )}
        </Document>
      )}

      {!isLoading && !error && (
        <div className="flex items-center mt-4 space-x-4 bg-white px-4 py-2 rounded-full shadow">
          <button
            onClick={goToPreviousPage}
            disabled={pageNumber <= 1}
            className="disabled:opacity-30"
            title="Previous Page"
          >
            <GrFormPrevious className="text-2xl" />
          </button>

          <span className="text-sm font-medium text-gray-700">
            Page {pageNumber} of {numPages}
          </span>

          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="disabled:opacity-30"
            title="Next Page"
          >
            <MdOutlineNavigateNext className="text-2xl" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PdfViewer;

import React, { useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";
import { Document, Page } from "react-pdf";
import "ldrs/ring";

const PdfViewer = ({ file }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setLoading(false);
        setError(false); // Reset error on successful load
    };

    const onDocumentLoadError = () => {
        setError(true);
        setLoading(false);
    };

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
        <div className="p-0 m-0 w-fit"> {/* Remove padding and margin */}
            {isLoading && !error && <l-ring size="60" color="coral" />}
            {error && <p className="text-red-500">Failed to load PDF document.</p>}
            
            {!error && (
                <Document
                    file={file}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                >
                    {!isLoading && (
                        <Page
                            height={200}
                            width={300}
                            pageNumber={pageNumber}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            className="m-0 p-0" // Remove margins and paddings
                        />
                    )}
                </Document>
            )}

            {!isLoading && !error && (
                <div className="flex justify-center items-center">
                    <div className="flex justify-center space-x-4 bg-white shadow-lg px-3 rounded-full">
                        <button
                            onClick={goToPreviousPage}
                            disabled={pageNumber <= 1}
                            className="disabled:opacity-50"
                        >
                            <GrFormPrevious className="text-2xl" />
                        </button>
                        <p className="text-center my-2">
                            Page {pageNumber} of {numPages}
                        </p>
                        <button
                            onClick={goToNextPage}
                            disabled={pageNumber >= numPages}
                            className="disabled:opacity-50"
                        >
                            <MdOutlineNavigateNext className="text-2xl" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PdfViewer;

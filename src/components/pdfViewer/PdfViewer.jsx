import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import ReactDOMServer from "react-dom/server";

const PdfViewer = ({ file }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1); // Reset to first page when a new document is loaded
  }

  const goToPrevPage = () => setPageNumber(pageNumber - 1);
  const goToNextPage = () => setPageNumber(pageNumber + 1);

  const jsx = (
    <div>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <div className="controls">
        <button disabled={pageNumber <= 1} onClick={goToPrevPage}>
          Previous
        </button>
        <button disabled={pageNumber >= numPages} onClick={goToNextPage}>
          Next
        </button>
      </div>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );

  const jsxString = ReactDOMServer.renderToStaticMarkup(jsx);

  return <div dangerouslySetInnerHTML={{ __html: jsxString }} style={{ textAlign: "center" }} />;
};

export default PdfViewer;

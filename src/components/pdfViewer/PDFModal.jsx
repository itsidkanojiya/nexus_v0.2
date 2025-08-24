import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import { IoCloseOutline } from "react-icons/io5";
import { useState, useEffect } from "react";

export default function PDFModal({ isOpen, onClose, pdf, title }) {
  const [pdfError, setPdfError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (pdf && isOpen) {
      setPdfError(false);
      setIsLoading(true);

      // Set a timeout to simulate loading and then show PDF
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [pdf, isOpen]);

  return (
    <Modal
      size="l"
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      scrollBehavior="inside"
    >
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(5px)" />
      <ModalContent m={2} className="rounded-xl overflow-hidden">
        <ModalHeader p={2} className="bg-primary border-none">
          <div className="flex justify-between items-center">
            <h1 className="text-base pe-8 text-white font-semibold tracking-wide">
              {title}
            </h1>
            <button onClick={onClose} aria-label="Close Modal">
              <IoCloseOutline className="text-3xl text-white hover:border rounded-xl" />
            </button>
          </div>
        </ModalHeader>

        <ModalBody p={0} className="bg-white">
          <div>
            {isLoading ? (
              <div className="p-8 text-center">
                <p>Loading PDF...</p>
              </div>
            ) : pdfError ? (
              <div className="p-8 text-center">
                <p className="text-red-600 mb-4">Failed to load PDF</p>
              </div>
            ) : pdf ? (
              <iframe
                src={`${pdf}#toolbar=1&navpanes=1&scrollbar=1`}
                width="100%"
                height="600px"
                style={{ border: "none" }}
                title={title}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setPdfError(true);
                  setIsLoading(false);
                }}
              />
            ) : null}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

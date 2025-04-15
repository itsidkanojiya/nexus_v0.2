import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody } from "@chakra-ui/react";
import { IoCloseOutline } from "react-icons/io5";

export default function PDFModal({ isOpen, onClose, pdf, title }) {
    // Function to detect if the device is mobile
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    // Function to handle the PDF display based on the device
    const handlePDFDisplay = () => {
        if (isMobile) {
            // For mobile devices, we open the PDF in a new tab
            window.open(pdf, "_blank");
        } else {
            // For non-mobile devices, display the PDF in iframe within the modal
            return (
                <iframe
                    id="pdfIframe"
                    src={pdf}
                    title="PDF Viewer"
                    width="100%" // Full width of the modal
                    height="500px" // Set a fixed height, adjust if necessary
                    className="rounded-xl"
                    frameBorder="0"
                />
            );
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            scrollBehavior="inside"
            size="full" // Ensures the modal uses the full available width
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
                <ModalBody p={2} className="bg-gray-500 flex justify-center">
                    <div className="w-full h-full object-contain rounded-xl shadow-lg">
                        {handlePDFDisplay()}
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

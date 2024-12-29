import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
} from "@chakra-ui/react";
import { IoCloseOutline } from "react-icons/io5";

export default function PDFModal({ isOpen, onClose, pdf, title }) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            scrollBehavior="inside"
            size="xl"
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
                    <div className="h-full w-full object-contain rounded-xl shadow-lg">
                        <iframe
                            src={pdf}
                            title="PDF Viewer"
                            width="100%"
                            height="500px" // Adjust height as per your needs
                            className="rounded-xl"
                        ></iframe>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

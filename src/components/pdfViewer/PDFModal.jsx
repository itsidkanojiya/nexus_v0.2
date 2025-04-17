import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
} from "@chakra-ui/react";
import { IoCloseOutline } from "react-icons/io5";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";

import "@react-pdf-viewer/core/lib/styles/index.css";

export default function PDFModal({ isOpen, onClose, pdf, title }) {
    const zoomPluginInstance = zoomPlugin();
    const pageNavigationPluginInstance = pageNavigationPlugin();

    const { ZoomInButton, ZoomOutButton } = zoomPluginInstance;
    const { GoToNextPage, GoToPreviousPage, CurrentPageLabel } = pageNavigationPluginInstance;

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

                <ModalBody p={0} className="bg-white">
                    {/* Custom Toolbar */}
                    <div className="flex items-center justify-between px-4 py-2 border-b bg-gray-100">
                        <div className="flex gap-2 items-center">
                            <ZoomOutButton />
                            <ZoomInButton />
                        </div>
                        <div className="flex items-center gap-2">
                            <GoToPreviousPage />
                            <CurrentPageLabel /> {/* shows like "Page 2 of 10" */}
                            <GoToNextPage />
                        </div>
                    </div>

                    <div style={{ height: "600px" }}>
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                            <Viewer
                                fileUrl={pdf}
                                plugins={[zoomPluginInstance, pageNavigationPluginInstance]}
                            />
                        </Worker>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

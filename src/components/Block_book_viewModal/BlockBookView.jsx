import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import { IoCloseOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

export default function BlockBookView({ isOpen, onOpen, onClose }) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            scrollBehavior="inside"
            size="xs"
        >
            <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(5px)" />
            <ModalContent m={2} bg="transparent" shadow="none">
                <ModalBody p={0} bg="transparent" className=" overflow-hidden">
                    <div className="flex justify-center items-center  p-8 rounded-xl ">
                        <div className="flex flex-col justify-center items-center">
                            <div>
                                <img
                                    src="/icons/restriction.png"
                                    className="h-28"
                                />
                            </div>
                            <h1 className="text-2xl font-bold text-white tracking-wider">
                                Restricted View
                            </h1>
                            <p className="text-white text-center">
                                Please login to access this content.
                            </p>
                            <div className="mt-5">
                                <NavLink
                                    to="/login"
                                    className="py-2 px-4 rounded-xl font-semibold text-white bg-primary"
                                >
                                    Login
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

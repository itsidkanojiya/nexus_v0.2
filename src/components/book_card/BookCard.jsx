import { useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import PDFModal from "../pdfViewer/PDFModal";
import BlockBookView from "../Block_book_viewModal/BlockBookView";
import useAuth from "../../hooks/useAuth";

export default function BookCard({ book }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [showBook, setShowBook] = useState(true);
    const { isActive, user } = useAuth();

    const OpenABook = () => {
        if (!isActive) {
            const viewCount = JSON.parse(localStorage.getItem("bookCount"));
            localStorage.setItem("bookCount", viewCount + 1);
            if (viewCount > 2) {
                setShowBook(false);
            }
        }
        onOpen();
    };

    return (
        <div
            onClick={OpenABook}
            className="bg-white border rounded-xl shadow-md p-2 relative overflow-hidden group transition-all ease-in duration-200"
        >
            <p className="text-sm text-center text-primary p-0.5 font-semibold bg-primary/20 rounded-xl mb-1">
                {book?.name}
            </p>
            <div className="h-42 min-h-42 relative">
                <div className="p-1 rounded-xl shadow-md">
                    <img
                        src={book?.cover_link}
                        className="h-full rounded-xl border-4 border-black min-h-42 w-full object-contain"
                        alt="bookImage"
                    />
                </div>
                <div className=" absolute bottom-2 left-2">
                    <p className="text-[12px] py-0.5 px-3 border bgGlass rounded-full  font-bold tracking-wider">
                        Chaper : {book?.chapter_no}
                    </p>
                </div>
                <div className=" absolute top-2 right-2">
                    <p className="text-[12px] py-0.5 px-3 border bgGlass rounded-full font-bold tracking-wider">
                        Std : {book?.std}
                    </p>
                </div>
            </div>
            <div className="mt-3">
                <p className="text-sm font-semibold">{book?.chapter_name}</p>
            </div>
            <div className=" group-hover:flex  absolute top-0 left-0 h-full w-full bgGlassBook bg-black/60  justify-center items-center cursor-pointer  hidden transition-all ease-in duration-200">
                <div className="text-white flex justify-center items-center flex-col">
                    <FaEye className="text-2xl" />
                    <p>View Book</p>
                </div>
            </div>  
            { (
                <PDFModal
                    title={book?.chapter_name}
                    onClose={onClose}
                    onOpen={onOpen}
                    isOpen={isOpen}
                    pdf={book?.pdf_link}
                />
            )}
        </div>
    );
}

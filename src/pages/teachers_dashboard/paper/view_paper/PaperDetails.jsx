import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputBox, { validateTime } from "../../../../components/inputs/InputBox";
import AppButton from "../../../../components/buttons/AppButton";
import GetBoards from "../../../../components/get_boards/GetBoards";
import GetStandard from "../../../../components/get_standard/GetStandard";
import GetSubjects from "../../../../components/get_subjects/GetSubjects";
import { getDayName } from "../../../../functions/getDay";
import FileInputBox from "../../../../components/inputs/FileInputBox";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import getData from "../../../../helpers/getData";
import useAuth from "../../../../hooks/useAuth";
import { object } from "yup";
import updateData from "../../../../helpers/updateData";
import toast from "react-hot-toast";
import { usePaperStore } from "../../../../zustand/store";
import { IoArrowBack } from "react-icons/io5";

const PaperDetails = ({ step, goNext, goPrev }) => {
    const { token, user } = useAuth();
    const [logo, setLogo] = useState(null);
    const paper = usePaperStore((state) => state.paper);
    const setPaper = usePaperStore((state) => state.setPaper);

    const dispatch = useDispatch();

    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (paper) {
            setPaper(paper);
            setLogo(paper?.logo);
            const keys = Object.keys(paper);
            keys.forEach((key) => {
                setValue(key, paper[key]);
            });
        }
    }, [paper]);

    const changeLogo = (file) => {
        setLogo(file);
    };

    // Edit Paper Details
    const { mutateAsync: editPaper, isPending: isPendingEdit } = useMutation({
        mutationFn: (data) =>
            updateData("edit-paper-details", data, token, "POST"),
        onSuccess: (data) => {
            toast.success(data?.message);
            goNext();
            setPaper(data?.paper_details);
        },
        onError: (error) => {
            toast.error(error?.message);
        },
    });

    const onSubmit = async (data) => {
        if (paper) {
            await editPaper({
                ...data,
                day: getDayName(data?.date),
                logo: logo,
                uid: user?.id,
            });
        }
    };

    return (
        <div className="">
            <div className="  mb-4 flex">
                <button onClick={() => goPrev()}>
                    <IoArrowBack />
                </button>
                <div className="w-fit py-0.5 px-2  text-sm font-bold uppercase  border shadow-sm rounded-full">
                    Paper Details
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4">
                <FileInputBox
                    isRequired={!logo}
                    register={register}
                    handleFileChange={changeLogo}
                    errors={errors}
                    image={logo}
                    setValue={setValue}
                    name="logo"
                    label="School Logo"
                />
                <div className=" grid  sm:grid-cols-2 md:grid-cols-3  gap-3">
                    <InputBox
                        register={register}
                        errors={errors}
                        name="school_name"
                        placeholder="School Name"
                        label="School Name"
                    />
                    <InputBox
                        register={register}
                        errors={errors}
                        name="timing"
                        placeholder="2 hours / 30 mins"
                        label="Paper Timing"
                    />
                    <InputBox
                        type="date"
                        register={register}
                        errors={errors}
                        name="date"
                        placeholder="Paper Date"
                        label="Exam Date"
                    />
                    {/* <InputBox
                        register={register}
                        errors={errors}
                        name="division"
                        placeholder="division"
                        label="division"
                    /> */}
                    <InputBox
                        register={register}
                        errors={errors}
                        name="address"
                        placeholder="School Address"
                        label="Address"
                    />
                    <GetBoards register={register} errors={errors} />
                    <GetStandard register={register} errors={errors} />
                    <GetSubjects register={register} errors={errors} />
                </div>
                <div>
                    <AppButton
                        isLoading={isPendingEdit}
                        type="submit"
                        className=" text-sm"
                    >
                        Save & Next
                    </AppButton>
                </div>
            </form>
        </div>
    );
};

export default PaperDetails;

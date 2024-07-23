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

const AssignmentDetails = ({ step, goNext, goPrev }) => {
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

    const {
        data: details,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["getPaperDetails"],
        queryFn: () => getData("get-last-paper", token),
        enabled: !!token,
    });

    useEffect(() => {
        if (details) {
            setPaper(details?.data);
            setLogo(details?.data?.logo);
            const keys = Object.keys(details?.data);
            keys.forEach((key) => {
                setValue(key, details?.data[key]);
            });
        }
    }, [details]);

    const changeLogo = (file) => {
        setLogo(file);
    };

    // Add Paper Details
    const { mutateAsync: addNewPaper, isPending } = useMutation({
        mutationFn: (data) =>
            updateData("add-assignment-details", data, token, "POST"),
        onSuccess: (data) => {
            toast.success("success");
            setPaper(data?.assignment_details);
            goNext();
        },
        onError: (error) => {
            toast.error(error?.message);
        },
    });

    // Edit Paper Details
    const { mutateAsync: editPaper, isPending: isPendingEdit } = useMutation({
        mutationFn: (data) =>
            updateData("edit-assignment-details", data, token, "POST"),
        onSuccess: (data) => {
            toast.success(data?.message);
            goNext();
            setPaper(data?.assignment_details);
        },
        onError: (error) => {
            toast.error(error?.message);
        },
    });

    const onSubmit = async (data) => {
        console.log({
            ...data,
            day: getDayName(data?.date),
            logo: logo,
        });
        await addNewPaper({
            ...data,
            day: getDayName(data?.date),
            logo: logo,
        });
    };

    return (
        <div className="">
            <div className="  mb-4 flex">
                <div className="w-fit py-0.5 px-2  text-sm font-bold uppercase  border shadow-sm rounded-full">
                    Assignment Details
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
                        mask="99:99"
                        register={register}
                        errors={errors}
                        name="timing"
                        placeholder="hh:mm"
                        label="Paper Timing"
                        validate={validateTime}
                    />
                    <InputBox
                        type="date"
                        register={register}
                        errors={errors}
                        name="date"
                        placeholder="Paper Date"
                        label="Exam Date"
                    />
                    <InputBox
                        register={register}
                        errors={errors}
                        name="division"
                        placeholder="division"
                        label="division"
                    />
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
                        isLoading={isPending}
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

export default AssignmentDetails;

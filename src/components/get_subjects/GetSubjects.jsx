import { useQuery } from "@tanstack/react-query";
import React from "react";
import SelectBox from "../inputs/SelectBox";
import getData from "../../helpers/getData";

const GetSubjects = ({ register, errors }) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["GetSubjects"],
        queryFn: () => getData("subject"),
    });

    const options = data?.subjects?.map((sub) => ({
        value: sub.name,
        label: sub.name,
    }));

    if (isLoading) return;
    return (
        <>
            <SelectBox
                name="subject"
                placeholder="Select Subject"
                label="Select Subject"
                register={register}
                errors={errors}
                options={options}
            />
        </>
    );
};

export default GetSubjects;

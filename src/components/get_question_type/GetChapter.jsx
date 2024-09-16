import React from "react";
import { chapters } from "../../constants/useFullData";
import SelectBox from "../inputs/SelectBox";

const GetChapter = ({
    register = () => {},
    errors = {},
    handleChange,
    defaultValue,
}) => {
    const options = chapters?.map((chapter) => ({
        value: chapter,
        label: chapter,
    }));

    return (
        <>
            <SelectBox
                name="chapter_type"
                handleChange={handleChange}
                defaultValue={defaultValue}
                placeholder="Chapter"
                label="Select Chapter"
                register={register}
                errors={errors}
                options={options}
            />
        </>
    );
};

export default GetChapter;

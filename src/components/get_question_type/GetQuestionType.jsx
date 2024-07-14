import React from "react";
import { questionsType } from "../../constants/useFullData";
import SelectBox from "../inputs/SelectBox";

const GetQuestionType = ({ register = () => {}, errors = {}, handleChange, defaultValue }) => {
  //   console.log(standards);
  const options = questionsType?.map((question) => ({ value: question?.value, label: question?.name }));

  return (
    <>
      <SelectBox name="question_type" handleChange={handleChange} defaultValue={defaultValue} placeholder="Select Type" label="Select Question Type" register={register} errors={errors} options={options} />
    </>
  );
};

export default GetQuestionType;

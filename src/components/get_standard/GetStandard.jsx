import React from "react";
import { standards } from "../../constants/useFullData";
import SelectBox from "../inputs/SelectBox";

const GetStandard = ({ register, errors }) => {
  //   console.log(standards);
  const options = standards?.map((std) => ({ value: std, label: std }));

  return (
    <>
      <SelectBox name="std" placeholder="Select standard" label="Select Standard" register={register} errors={errors} options={options} />
    </>
  );
};

export default GetStandard;

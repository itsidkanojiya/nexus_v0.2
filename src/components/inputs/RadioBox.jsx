import React from "react";

const RadioBox = ({ name, label, register = () => {}, icon, errors = {}, isRequired = true, value, id }) => {
  return (
    <div>
      <input {...register(name, { required: isRequired ? `${label} is required.` : false })} type="radio" id={id} value={value} className="hidden peer" />
      <label htmlFor={id} className="inline-flex items-center justify-center w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer   peer-checked:border-primary peer-checked:text-primary hover:text-gray-600 hover:bg-gray-100 ">
        <div className=" flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-center">{icon}</div>
          <p className=" capitalize text-base  font-semibold">{value}</p>
        </div>
      </label>
      {/* {errors?.[name] && <p className=" text-red-600 text-sm font-semibold">{errors?.[name]?.message}</p>} */}
    </div>
  );
};

export default RadioBox;

import React, { useState } from "react";
import InputBox from "../../components/inputs/InputBox";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MdEmail } from "react-icons/md";
import { useForm } from "react-hook-form";
import AppButton from "../../components/buttons/AppButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPass, setShowPass] = useState(false);

  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().min(8).required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className=" min-h-96  py-14 flex items-center justify-center">
      <div className=" max-w-sm mx-auto  bg-white shadow-md rounded-md w-full p-8">
        <div className=" flex justify-center">
          <img src="/public/logos/Nexus Logo png-01.png" className="h-28" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full  space-y-4">
          <InputBox register={register} errors={errors} label="Email" name="email" placeholder="Enter Email" />
          <InputBox
            register={register}
            errors={errors}
            label="Password"
            name="password"
            type={showPass ? "text" : "password"}
            placeholder="Enter Password"
            rightIcon={showPass ? <FaEye /> : <FaEyeSlash />}
            handleRightClick={() => {
              setShowPass((prev) => !prev);
            }}
          />
          <AppButton className="w-full" type="submit">
            Submit
          </AppButton>
        </form>
      </div>
    </div>
  );
};

export default Login;

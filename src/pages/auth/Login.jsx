import React, { useState } from "react";
import InputBox from "../../components/inputs/InputBox";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import AppButton from "../../components/buttons/AppButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import updateData from "../../helpers/updateData";
import Message from "../../components/Message";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const { token, loading, login } = useAuth();
  const navigate = useNavigate();

  const schema = yup
    .object({
      number: yup
        .string()
        .required("Email or contact number is required")
        .test("email-or-contact", "Must be a valid email or contact number", (value) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const contactRegex = /^\d{10}$/; // assuming a 10-digit contact number
          return emailRegex.test(value) || contactRegex.test(value);
        }),
      password: yup.string().min(8, "Password must be at least 8 characters long").required("Password is required"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    mutateAsync: authLogin,
    isPending,
    error,
  } = useMutation({
    mutationFn: (formData) => updateData("login", formData),
    onSuccess: (data) => {
      login(data?.token, data?.user);
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = async (data) => {
    await authLogin(data);
  };

  return (
    <div className=" min-h-96  py-14 px-2 flex items-center justify-center">
      <div className=" max-w-md mx-auto  bg-white shadow-md rounded-md w-full p-2.5 sm:p-8 space-y-4 sm:space-y-6">
        <div className=" flex justify-center">
          <img src="/logos/Nexus Logo png-01.png" className=" h-16 sm:h-28" />
        </div>
        <div className="pb-3">
          <h1 className="text-2xl font-bold text-center uppercase pb-2 border-b text-primary border-dashed border-primary">Login</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full  space-y-4">
          <Message type="error" message={error?.message} />

          <InputBox register={register} errors={errors} label="Email or Number" name="number" placeholder="Enter Email or Number" />

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
          <div>
            <p className=" text-xs text-center">
              Create new account?
              <Link to="/sing-up" className=" underline">
                {" "}
                sing up
              </Link>
            </p>
          </div>
          <AppButton isLoading={isPending} className="w-full" type="submit">
            Submit
          </AppButton>
        </form>
      </div>
    </div>
  );
};

export default Login;

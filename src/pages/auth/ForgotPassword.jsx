import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputBox from "../../components/inputs/InputBox";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => { 
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const schema = yup.object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      console.log("Process start");
      const response = await fetch(
        "https://backend.nexuspublication.com/api/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        console.log(result);
        toast.error(result.message);
        throw new Error("Network response was not ok");
      }

      toast.success("A password reset link has been sent to your email");
      navigate("/login"); // navigate to login page after success

    } catch (error) {
      console.error("Error during forgot password request:", error);
      toast.error("Failed to send reset link");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-2">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-md w-full p-4 md:p-8 space-y-6">
        <div className="flex justify-center">
          <img
            src="/public/logos/logonexus.png"
            alt="Nexus Logo"
            className="h-20"
          />
        </div>
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-center uppercase pb-2 border-b text-primary border-dashed border-primary">
            Forgot Password
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <InputBox
            register={register}
            errors={errors}
            label="Email"
            name="email"
            placeholder="Enter your email"
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full px-4 py-2 text-center text-white bg-primary rounded-md hover:bg-primary-dark"
            >
              Send Reset Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputBox from "../../components/inputs/InputBox";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import AppButton from "../../components/buttons/AppButton";
import SelectBox from "../../components/inputs/SelectBox";
import { standards, subjects } from "../../constants/useFullData";
import RadioBox from "../../components/inputs/RadioBox";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
    const [showPass, setShowPass] = useState(false);
    const [showVerifyOtp, setShowConfirmPass] = useState(false);
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState("student");

    const schema = yup
        .object({
            name: yup.string().required("Full Name is required"),
            email: yup
                .string()
                .email("Invalid email format")
                .required("Email is required"),
            number: yup
                .string()
                .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
                .required("Contact Number is required"),
            user_type: yup.string().required("User type is required"),
            std:
                userType === "student"
                    ? yup.string().required("Please select an option")
                    : null,
            subject:
                userType === "teacher"
                    ? yup.string().required("Please select subject")
                    : null,
            school: yup.string().required("School Name is required"),
            password: yup
                .string()
                .min(8, "Password must be at least 8 characters")
                .required("Password is required"),
        })
        .required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
  
    const onSubmit = async (data) => {  console.log('Process start')
        try {
            console.log(data)
            const response = await fetch(
                "https://backend.nexuspublication.com/api/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                },
                console.log(data)
            );

            const result = await response.json();
            if (!response.ok) {
                console.log(result);
                toast.error(result.message);
                throw new Error("Network response was not ok");
            }

            if (result?.is_verified) {
            } else {
                setEmail(data.email);
                setShowConfirmPass(true);
            }
            console.log(result); // Handle the response as needed
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    return (
        <>
            {showVerifyOtp ? (
                <VerifyOTP email={email} />
            ) : (
                <div className="min-h-96 py-8 flex items-center justify-center px-2">
                    <div className="max-w-md mx-auto bg-white shadow-md rounded-md w-full p-4 md:p-8 space-y-6">
                        <div className="flex justify-center">
                            <img
                                src="/public/logos/Nexus Logo png-01.png"
                                className="h-20"
                                alt="Nexus Logo"
                            />
                        </div>
                        <div className="mb-4">
                            <h1 className="text-2xl font-bold text-center uppercase pb-2 border-b text-primary border-dashed border-primary">
                                Create Account
                            </h1>
                        </div>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="w-full space-y-4"
                        >
                            <InputBox
                                register={register}
                                errors={errors}
                                label="Full Name"
                                name="name"
                                placeholder="Enter full name"
                            />
                            <InputBox
                                register={register}
                                errors={errors}
                                label="Email"
                                name="email"
                                placeholder="Enter Email"
                            />
                            <InputBox
                                register={register}
                                errors={errors}
                                label="Contact Number"
                                name="number"
                                placeholder="Enter Number"
                            />
                            <div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div
                                        onClick={() => {
                                            setUserType("student");
                                        }}
                                    >
                                        <RadioBox
                                            register={register}
                                            errors={errors}
                                            id="student"
                                            icon={
                                                <img
                                                    src="/icons/student.png"
                                                    alt="Student"
                                                />
                                            }
                                            name="user_type"
                                            value="student"
                                            label="User Type"
                                            onChange={(e) => {
                                                setUserType(e.target.value); // Update local state
                                            }}
                                        />
                                    </div>
                                    <div
                                        onClick={() => {
                                            setUserType("teacher");
                                        }}
                                    >
                                        <RadioBox
                                            register={register}
                                            errors={errors}
                                            id="teacher"
                                            icon={
                                                <img
                                                    src="/icons/teacher.png"
                                                    alt="Teacher"
                                                />
                                            }
                                            name="user_type"
                                            value="teacher"
                                            label="User Type"
                                            onChange={(e) => {
                                                setUserType(e.target.value); // Update local state
                                            }}
                                        />{" "}
                                    </div>
                                </div>
                                {errors?.user_type && (
                                    <p className="text-red-600 text-sm font-semibold">
                                        {errors?.user_type?.message}
                                    </p>
                                )}
                            </div>

                            {userType === "student" && (
                                <SelectBox
                                    register={register}
                                    errors={errors}
                                    label="Choose Standard"
                                    name="std"
                                    options={standards.map((standard) => ({
                                        value: standard,
                                        label: `Standard ${standard}`,
                                        
                                    }))}
                                    placeholder="Select Standard"
                                />
                            )}

                            {userType === "teacher" && (
                               
                                <SelectBox
                                    register={register} 
                                    errors={errors}
                                    label="Choose Subject"
                                    name="subject"
                                    options={subjects.map((sub) => ({
                                        value: sub.name,
                                        label: sub.name,
                                    }))}
                                    placeholder="Select Subject"
                                />
                            )}

                            <InputBox
                                register={register}
                                errors={errors}
                                label="School Name"
                                name="school"
                                placeholder="Enter school name"
                            />
                            <InputBox
                                register={register}
                                errors={errors}
                                label="Password"
                                name="password"
                                type={showPass ? "text" : "password"}
                                placeholder="Enter Password"
                                rightIcon={
                                    showPass ? <FaEye /> : <FaEyeSlash />
                                }
                                handleRightClick={() =>
                                    setShowPass((prev) => !prev)
                                }
                            />
                            <div>
                                <p className="text-xs text-center">
                                    Already have an account?{" "}
                                    <Link to="/login" className="underline">
                                        Login
                                    </Link>
                                </p>    
                            </div>
                            <AppButton className="w-full" type="submit">
                                Submit
                            </AppButton>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export function VerifyOTP({ email }) {
    const { token, loading, login } = useAuth();
    const navigate = useNavigate();
    const schema = yup
        .object({
            otp: yup
                .string()
                .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
                .required("OTP is required."),
        })
        .required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data) => {
        try {
            const response = await fetch(
                "https://backend.nexuspublication.com/api/verify-otp",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                    },
                    body: new URLSearchParams({
                        email,
                        otp: data.otp,
                    }),
                }
            );

            if (!response.ok) {
                toast.error("Invalid OTP!");
                throw new Error("Failed to verify OTP");
            }

            const result = await response.json();
            console.log("OTP Verified", result);

            login(result.token, result.user);
            navigate("/");
            // Handle success (e.g., navigate to the next page or show a success message)
        } catch (error) {
            console.error("Error verifying OTP:", error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <div className="min-h-96 py-8 flex items-center justify-center px-2">
            <div className="max-w-md mx-auto bg-white shadow-md rounded-md w-full p-4 md:p-8 space-y-6">
                <div className="flex justify-center">
                    <img
                        src="/logos/Nexus Logo png-01.png"
                        className="h-20"
                        alt="Nexus Logo"
                    />
                </div>
                <div className="mb-4">
                    <h1 className="text-2xl font-bold text-center uppercase pb-2 border-b text-primary border-dashed border-primary">
                        Verify OTP
                    </h1>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full space-y-4"
                >
                    <InputBox
                        register={register}
                        errors={errors}
                        label="OTP"
                        name="otp"
                        placeholder="Enter 6 digits otp"
                    />
                    <AppButton className="w-full" type="submit">
                        Submit
                    </AppButton>
                </form>
            </div>
        </div>
    );
}

import React, { useState } from "react";

export default function FileInputBox({
    register = () => {},
    errors = {},
    label = "Upload File",
    isRequired = true,
    name,
    className = "",
    image,
    handleFileChange = () => {},
    topLabel = true,
}) {
    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
        handleFileChange(file);
    };

    return (
        <div
            className={`flex items-start flex-col justify-start w-full ${className}`}
        >
            <label
                htmlFor="dropzone-file"
                className={` relative flex flex-col items-center justify-center w-full h-64 border-2 ${
                    errors?.[name] ? "border-red-600" : "border-gray-300"
                } border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100`}
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {preview || image ? (
                        <img
                            src={preview ?? image}
                            alt="Preview"
                            className="max-h-52 h-full object-cover rounded-lg"
                        />
                    ) : (
                        <>
                            <svg
                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                    Click to upload
                                </span>{" "}
                                or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                        </>
                    )}
                </div>
                <input
                    {...register(name, {
                        required: isRequired ? `${label} is required.` : false,
                    })}
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleChange}
                />
                {topLabel && (
                    <div className=" absolute -top-3 left-0  text-slate-700 flex justify-center w-full">
                        <p className=" text-sm font-semibold text-slate-400 tracking-wide w-fit bg-white rounded-full  px-3 py-0.5">
                            {label}
                        </p>
                    </div>
                )}
            </label>
            {errors?.[name] && (
                <p className="text-red-600 text-sm font-semibold">
                    {errors?.[name].message}
                </p>
            )}
        </div>
    );
}

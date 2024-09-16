import React from "react";
import InputMask from "react-input-mask";

export default function InputBox({
    register = () => {},
    errors = {},
    label = "Add Label",
    topLabel = true,
    isRequired = true,
    name,
    placeholder,
    className = "",
    handleChange = () => {},
    type = "text",
    handleRightClick = () => {},
    handleLeftClick = () => {},
    rightIcon = null,
    leftIcon = null,
    mask = null,
    validate = null, // Add validate prop
    readonly = false,
    disabled = false,
}) {
    const inputProps = {
        readOnly: readonly,
        disabled: disabled,
        onChange: (e) => handleChange(e),
        ...register(name, {
            required: isRequired ? `${label} is required.` : false,
            validate: validate, // Pass validate function here
        }),
        autoComplete: "false",
        type,
        placeholder,
        className: `w-full p-2.5 border-2 rounded-md focus:outline-none ${
            rightIcon ? "pe-8" : ""
        } ${leftIcon ? "ps-8" : ""} ${className} ${
            errors?.[name] ? "border-red-600" : ""
        }`,
    };

    return (
        <div>
            <div className="relative">
                {leftIcon && (
                    <div
                        className={`absolute top-0 left-0 h-full w-8 flex items-center justify-center`}
                    >
                        <button
                            type="button"
                            onClick={handleLeftClick}
                            className="text-xl text-slate-600 opacity-50"
                        >
                            {leftIcon}
                        </button>
                    </div>
                )}

                <div className="relative">
                    {mask ? (
                        <InputMask mask={mask} maskChar={null} {...inputProps}>
                            {(inputProps) => <input {...inputProps} />}
                        </InputMask>
                    ) : (
                        <input {...inputProps} />
                    )}

                    {topLabel && (
                        <div className="absolute -top-2.5 left-2 bg-white px-1 text-slate-700">
                            <p className="text-sm font-semibold text-slate-400 tracking-wide">
                                {label}
                            </p>
                        </div>
                    )}
                </div>

                {rightIcon && (
                    <div
                        className={`absolute top-0 right-0 h-full w-8 flex items-center justify-center`}
                    >
                        <button
                            type="button"
                            onClick={handleRightClick}
                            className="text-xl text-slate-600 opacity-50"
                        >
                            {rightIcon}
                        </button>
                    </div>
                )}
            </div>
            {errors?.[name] && (
                <p className="text-red-600 text-sm font-semibold">
                    {errors?.[name]?.message}
                </p>
            )}
        </div>
    );
}

// utils/validateTime.js
export function validateTime(value) {
    // Check if the format is hh:mm
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!regex.test(value)) {
        return "Invalid time.";
    }

    // Split the value into hours and minutes
    const [hours, minutes] = value.split(":").map(Number);

    // Validate minutes
    if (minutes > 59) {
        return "Minutes should not be more than 59.";
    }

    return true; // Valid time
}

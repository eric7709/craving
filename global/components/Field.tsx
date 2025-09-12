"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { TOption } from "../types/option";

// Shared styles
const baseFieldStyles =
  "w-full px-2 py-1.5 h-8 rounded-md border focus:ring-2 focus:outline-none transition md:text-[13px] text-[16px]";
// Default text 14px (desktop), 16px on small/mobile screens



type FieldProps = {
  label?: string;
  error?: string | null;
  containerClassName?: string;
  fieldClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  options?: TOption[]; // only for select
  placeholder?: string;
} & (
  | (React.InputHTMLAttributes<HTMLInputElement> & {
      type?: "text" | "email" | "password" | "number";
    })
  | (React.SelectHTMLAttributes<HTMLSelectElement> & { type: "select" })
);

export const Field: React.FC<FieldProps> = ({
  label,
  error,
  containerClassName = "",
  fieldClassName = "",
  labelClassName = "",
  errorClassName = "",
  type = "text",
  options = [],
  placeholder,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  // Detect if controlled
  const isInputControlled =
    (props as React.InputHTMLAttributes<HTMLInputElement>).value !== undefined;
  const isSelectControlled =
    (props as React.SelectHTMLAttributes<HTMLSelectElement>).value !== undefined;

  return (
    <div className={`flex flex-col gap-1 ${containerClassName}`}>
      {label && (
        <label
          className={`text-[11px] font-medium text-gray-700 ${labelClassName}`}
        >
          {label}
        </label>
      )}

      {/* Input Field */}
      {type !== "select" ? (
        <div className="relative">
          <input
            type={isPassword && showPassword ? "text" : type}
            className={`${baseFieldStyles} ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            } ${fieldClassName} ${isPassword ? "pr-8" : ""}`}
            {...(isInputControlled
              ? {
                  value: (props as React.InputHTMLAttributes<HTMLInputElement>)
                    .value,
                  onChange: (
                    props as React.InputHTMLAttributes<HTMLInputElement>
                  ).onChange,
                }
              : {})}
            placeholder={placeholder}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      ) : (
        // Select Field
        <select
          className={`${baseFieldStyles} ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          } ${fieldClassName}`}
          {...(isSelectControlled
            ? {
                value: (props as React.SelectHTMLAttributes<HTMLSelectElement>)
                  .value,
                onChange: (
                  props as React.SelectHTMLAttributes<HTMLSelectElement>
                ).onChange,
              }
            : {})}
          {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
      {error && (
        <p className={`text-[10px] text-red-500 ${errorClassName}`}>{error}</p>
      )}
    </div>
  );
};

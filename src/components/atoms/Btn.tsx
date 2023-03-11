import React, { ButtonHTMLAttributes } from "react";

export const styling = {
  primary: "shadow-md hover:shadow-lg bg-blue-600 text-white hover:bg-blue-700",
  secondary:
    "shadow-md hover:shadow-lg bg-gray-400 text-white hover:bg-gray-500",
  outline:
    "shadow-md hover:shadow-lg bg-white border border-gray-500 text-gray-500 hover:bg-gray-100",
  close: "text-red-500 hover:text-red-700 outline-none focus:outline-none",
};

const Btn = ({
  kind = "primary",
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  kind?: keyof typeof styling;
}) => (
  <button
    {...rest}
    className={`${rest.disabled ? "opacity-60" : ""} ${
      styling[kind]
    } inline-block px-4 py-2 font-medium leading-snug uppercase rounded focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out ${className}`}
  />
);

export default Btn;

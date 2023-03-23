import React, { ButtonHTMLAttributes } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

const RefreshBtn = ({
  onClick,
  disabled,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`p-2 rounded-full text-gray-400 transition duration-300 ease-in-out ${
      disabled ? "cursor-not-allowed" : "hover:bg-gray-100 hover:text-gray-600"
    }`}
    {...rest}
  >
    <ArrowPathIcon className="h-4 w-4" />
  </button>
);

export default RefreshBtn;

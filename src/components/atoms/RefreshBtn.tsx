import React, { ButtonHTMLAttributes } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

const RefreshBtn = ({
  onClick,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    type="button"
    onClick={onClick}
    className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition duration-300 ease-in-out"
    {...rest}
  >
    <ArrowPathIcon className="h-4 w-4" />
  </button>
);

export default RefreshBtn;

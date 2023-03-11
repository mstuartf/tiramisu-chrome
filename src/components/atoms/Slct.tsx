import React, { SelectHTMLAttributes } from "react";

export interface SlctProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  onChange: (value: string) => void;
}
const Slct = ({ onChange, className, ...rest }: SlctProps) => (
  <select
    {...rest}
    onChange={({ target: { value } }) => onChange(value)}
    className={`h-full cursor-pointer form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-600 focus:outline-none ${className}`}
  ></select>
);

export default Slct;

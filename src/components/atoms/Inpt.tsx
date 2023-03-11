import React, { InputHTMLAttributes } from "react";

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & { onChange: (value: string) => void };

const Inpt = ({ onChange, className, ...rest }: InputProps) => (
  <input
    {...rest}
    onChange={({ target: { value } }) => onChange(value)}
    className={`form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-600 focus:outline-none ${className}`}
  />
);

export default Inpt;

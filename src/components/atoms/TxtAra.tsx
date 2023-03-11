import React, { TextareaHTMLAttributes } from "react";

export type TxtAraProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "onChange"
> & { onChange: (value: string) => void };

const TxtAra = ({ className, onChange, ...rest }: TxtAraProps) => (
  <textarea
    {...rest}
    onChange={({ target: { value } }) => onChange(value)}
    className={`resize-none form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-600 focus:outline-none ${className}`}
  />
);

export default TxtAra;

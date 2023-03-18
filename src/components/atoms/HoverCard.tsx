import React, { ButtonHTMLAttributes } from "react";

const HoverCard = ({
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`border p-2 rounded shadow hover:bg-gray-100 hover:scale-[1.02] transition ease-in duration-300 ${className}`}
    {...rest}
  />
);

export default HoverCard;

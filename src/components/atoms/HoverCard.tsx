import React, { ButtonHTMLAttributes } from "react";

const HoverCard = ({
  className,
  disabled,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    disabled={disabled}
    className={`border p-2 rounded shadow ${
      disabled ? "cursor-not-allowed" : "hover:bg-gray-100 hover:scale-[1.02]"
    } transition ease-in duration-300 ${className}`}
    {...rest}
  />
);

export default HoverCard;

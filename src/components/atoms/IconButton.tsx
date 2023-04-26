import React, { ButtonHTMLAttributes } from "react";
import { Link, LinkProps } from "react-router-dom";

type IIconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> | LinkProps;

function isLink(props: IIconButtonProps): props is LinkProps {
  return (props as LinkProps).to !== undefined;
}

const IconButton = (props: IIconButtonProps) => {
  if (isLink(props)) {
    const { children, ...rest } = props;
    return (
      <Link
        {...rest}
        className="font-bold inline-flex items-center justify-center w-10 h-10 text-gray-600 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-gray-100"
      >
        <div className="h-6 w-6">{children}</div>
      </Link>
    );
  }

  const { children, ...rest } = props;
  return (
    <button
      {...rest}
      className="font-bold inline-flex items-center justify-center w-10 h-10 text-gray-600 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-gray-100"
    >
      <div className="h-6 w-6">{children}</div>
    </button>
  );
};

export default IconButton;

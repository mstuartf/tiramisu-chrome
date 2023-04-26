import React, { HTMLAttributes } from "react";

const H = (props: HTMLAttributes<HTMLHeadingElement>) => {
  return <h1 {...props} className="text-xl font-semibold text-gray-600"></h1>;
};

export default H;

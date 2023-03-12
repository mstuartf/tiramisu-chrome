import React from "react";

const Feedback = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`text-gray-400 italic transition ease-in duration-300 ${className}`}
  >
    {children}
  </div>
);

export default Feedback;

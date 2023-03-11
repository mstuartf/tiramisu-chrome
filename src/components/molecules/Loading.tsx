import React from "react";
import Spinner from "../atoms/Spinner";

const Loading = () => (
  <div className="w-full h-full flex items-center justify-center">
    <Spinner />
  </div>
);

export default Loading;

import React, { useEffect, useState } from "react";
import Spinner from "../atoms/Spinner";

interface ILoadingPercent {
  seconds: number;
}

const LoadingPercent = ({ seconds }: ILoadingPercent) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (percent < 100) {
      setTimeout(() => {
        setPercent(percent + 1);
      }, (seconds * 1000) / 100);
    }
  }, [percent]);

  return (
    <div className="flex items-center justify-center gap-2">
      <Spinner />
      <div>{percent}%</div>
    </div>
  );
};

export default LoadingPercent;

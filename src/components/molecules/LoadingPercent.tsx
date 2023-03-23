import React, { useEffect } from "react";
import Spinner from "../atoms/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { selectProspectMessagesLoadingPercent } from "../../redux/prospect/selectors";
import { updateMessagesLoadingPercent } from "../../redux/prospect/slice";

interface ILoadingPercent {
  seconds: number;
}

const LoadingPercent = ({ seconds }: ILoadingPercent) => {
  const dispatch = useDispatch();
  const percent = useSelector(selectProspectMessagesLoadingPercent) || 0;

  useEffect(() => {
    if (percent < 100) {
      setTimeout(() => {
        dispatch(updateMessagesLoadingPercent(percent + 1));
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

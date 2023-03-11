import React from "react";
import Btn from "./Btn";

interface RetryProps {
  status: number;
  onRetry: () => void;
  noRetryMessage: string;
}

const retryErrorCodes = [502, 503, 504];

const Retry = ({ status, onRetry, noRetryMessage }: RetryProps) => (
  <>
    {retryErrorCodes.includes(status) ? (
      <div>
        <div>Temporary server issue.</div>
        <Btn onClick={onRetry}>Retry</Btn>
      </div>
    ) : (
      <div>{noRetryMessage}</div>
    )}
  </>
);

export default Retry;

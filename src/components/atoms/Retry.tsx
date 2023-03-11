import React from "react";

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
        <button onClick={onRetry}>Retry</button>
      </div>
    ) : (
      <div>{noRetryMessage}</div>
    )}
  </>
);

export default Retry;

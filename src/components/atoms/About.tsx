import React, { useState } from "react";

const LIMIT = 100;

const About = ({ summary }: { summary: string }) => {
  const [show, setShow] = useState(false);

  if (!summary) {
    return null;
  }

  const truncate = summary.length > LIMIT;

  if (!truncate) {
    return <div className="text-xs text-gray-400">{summary}</div>;
  }

  return (
    <div className="text-xs text-gray-400">
      {!show ? <>{summary.slice(0, LIMIT - 20)}...</> : <>{summary}</>}&nbsp;
      <button
        onClick={() => setShow(!show)}
        className="text-blue-400 hover:text-blue-500 hover:underline transition duration-300 ease-in-out"
      >
        ...show {show ? "less" : "more"}
      </button>
    </div>
  );
};

export default About;

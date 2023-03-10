import React from "react";
import { useSelector } from "react-redux";
import { selectPromptTemplates } from "../../redux/selectors";
import { Link } from "react-router-dom";

const Prompts = () => {
  const templates = useSelector(selectPromptTemplates);
  return (
    <>
      {templates.map(({name}) => (
        <div>
          {name}
        </div>
      ))}
      <Link to="/prospect">
        Prospect
      </Link>
    </>
  );
}

export default Prompts;

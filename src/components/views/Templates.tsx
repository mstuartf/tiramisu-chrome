import React, { useState } from "react";
import AddTemplate from "../molecules/AddTemplate";
import { useSelector } from "react-redux";
import { selectTemplateIds } from "../../redux/templates/selectors";
import Loading from "../molecules/Loading";
import Btn from "../atoms/Btn";

const Templates = () => {
  const [isAdding, setIsAdding] = useState(false);
  const templateIds = useSelector(selectTemplateIds);

  if (!templateIds) {
    return <Loading />;
  }

  if (isAdding) {
    return (
      <AddTemplate onCancel={() => setIsAdding(false)} onAdd={console.log} />
    );
  }

  return (
    <>
      List templates here
      <Btn onClick={() => setIsAdding(true)}>Add</Btn>
    </>
  );
};

export default Templates;

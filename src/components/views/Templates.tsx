import React, { useState } from "react";
import AddOrEditTemplate from "../molecules/AddOrEditTemplate";
import { useSelector } from "react-redux";
import { selectTemplateIds } from "../../redux/templates/selectors";
import Loading from "../molecules/Loading";
import Btn from "../atoms/Btn";
import TemplateCard from "../molecules/TemplateCard";
import EditTemplateContainer from "../molecules/EditTemplateContainer";
import AddTemplateContainer from "../molecules/AddTemplateContainer";

const Templates = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [editTemplateId, setEditTemplateId] = useState<string | undefined>();
  const templateIds = useSelector(selectTemplateIds);

  if (!templateIds) {
    return <Loading />;
  }

  if (editTemplateId) {
    return (
      <EditTemplateContainer
        id={editTemplateId}
        onAdd={console.log}
        onCancel={() => setEditTemplateId(undefined)}
      />
    );
  }

  if (isAdding) {
    return (
      <AddTemplateContainer
        onAdd={console.log}
        onCancel={() => setIsAdding(false)}
      />
    );
  }

  return (
    <div className="grid gap-2">
      {templateIds.map((id) => (
        <TemplateCard id={id} key={id} onEdit={() => setEditTemplateId(id)} />
      ))}
      <Btn onClick={() => setIsAdding(true)}>Add</Btn>
    </div>
  );
};

export default Templates;

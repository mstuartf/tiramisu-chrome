import React, { useState } from "react";
import AddOrEditTemplate from "../molecules/AddOrEditTemplate";
import { useSelector } from "react-redux";
import { selectTemplateIds } from "../../redux/templates/selectors";
import Loading from "../molecules/Loading";
import Btn from "../atoms/Btn";
import TemplateCard from "../molecules/TemplateCard";

const Templates = () => {
  const [isAddingOrEditing, setIsAddingOrEditing] = useState(false);
  const [editTemplateId, setEditTemplateId] = useState<string | undefined>();
  const templateIds = useSelector(selectTemplateIds);

  if (!templateIds) {
    return <Loading />;
  }

  if (isAddingOrEditing) {
    return (
      <AddOrEditTemplate
        id={editTemplateId}
        onCancel={() => {
          setIsAddingOrEditing(false);
          setEditTemplateId(undefined);
        }}
        onAdd={console.log}
      />
    );
  }

  return (
    <div className="grid gap-2">
      {templateIds.map((id) => (
        <TemplateCard
          id={id}
          key={id}
          onEdit={() => {
            setIsAddingOrEditing(true);
            setEditTemplateId(id);
          }}
        />
      ))}
      <Btn onClick={() => setIsAddingOrEditing(true)}>Add</Btn>
    </div>
  );
};

export default Templates;

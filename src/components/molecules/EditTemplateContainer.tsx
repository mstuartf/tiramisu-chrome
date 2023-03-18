import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createSelectTemplate } from "../../redux/templates/selectors";
import AddOrEditTemplate from "./AddOrEditTemplate";
import { ITemplate } from "../../redux/templates/types";

interface IEditTemplateContainer {
  id: string;
  onClose: () => void;
}

const EditTemplateContainer = ({ id, onClose }: IEditTemplateContainer) => {
  const template = useSelector(createSelectTemplate(id));

  const [isSaving, setIsSaving] = useState(false);

  const onSave = (updated: ITemplate) => {
    setIsSaving(true);
    console.log(updated);
    // todo: request
    // todo: onClose
  };

  return (
    <AddOrEditTemplate
      template={template}
      onCancel={onClose}
      onSave={onSave}
      isSaving={isSaving}
    />
  );
};

export default EditTemplateContainer;

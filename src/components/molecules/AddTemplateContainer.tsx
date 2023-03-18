import React, { useState } from "react";
import AddOrEditTemplate from "./AddOrEditTemplate";
import { ITemplate } from "../../redux/templates/types";

interface IAddTemplateContainer {
  onClose: () => void;
}

const AddTemplateContainer = ({ onClose }: IAddTemplateContainer) => {
  const template: Omit<ITemplate, "id"> & { id?: string } = {
    name: "",
    style: "",
    sections: [],
    custom: true,
  };

  const [isSaving, setIsSaving] = useState(false);

  const onSave = () => {
    setIsSaving(true);
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

export default AddTemplateContainer;

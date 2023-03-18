import React, { useState } from "react";
import AddOrEditTemplate from "./AddOrEditTemplate";
import { INewTemplate, ITemplate } from "../../redux/templates/types";
import { templateStyles } from "../../constants";

interface IAddTemplateContainer {
  onClose: () => void;
}

const AddTemplateContainer = ({ onClose }: IAddTemplateContainer) => {
  const template: ITemplate = {
    id: "__placeholder__",
    name: "",
    style: templateStyles[0].name,
    sections: [],
  };

  const [isSaving, setIsSaving] = useState(false);

  const onSave = ({ name, sections, style }: ITemplate) => {
    setIsSaving(true);
    const updated: INewTemplate = {
      name,
      style,
      sections: sections.map(({ content, meta, order }) => ({
        content,
        meta,
        order,
      })),
    };
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

export default AddTemplateContainer;

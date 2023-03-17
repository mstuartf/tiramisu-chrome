import React from "react";
import AddOrEditTemplate from "./AddOrEditTemplate";
import { ITemplate } from "../../redux/templates/types";

interface IAddTemplateContainer {
  onAdd: () => void;
  onCancel: () => void;
}

const AddTemplateContainer = (props: IAddTemplateContainer) => {
  const template: ITemplate = {
    id: "",
    name: "",
    style: "",
    sections: [],
    custom: true,
  };
  return <AddOrEditTemplate template={template} {...props} />;
};

export default AddTemplateContainer;

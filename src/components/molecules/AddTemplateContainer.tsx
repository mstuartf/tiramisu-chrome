import React from "react";
import AddOrEditTemplate from "./AddOrEditTemplate";
import { ITemplate } from "../../redux/templates/types";

interface IAddTemplateContainer {
  onClose: () => void;
}

const AddTemplateContainer = (props: IAddTemplateContainer) => {
  const template: Omit<ITemplate, "id"> & { id?: string } = {
    name: "",
    style: "",
    sections: [],
    custom: true,
  };
  return <AddOrEditTemplate template={template} {...props} />;
};

export default AddTemplateContainer;

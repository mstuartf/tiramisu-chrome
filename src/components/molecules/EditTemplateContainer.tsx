import React from "react";
import { useSelector } from "react-redux";
import { createSelectTemplate } from "../../redux/templates/selectors";
import AddOrEditTemplate from "./AddOrEditTemplate";

interface IEditTemplateContainer {
  id: string;
  onAdd: () => void;
  onCancel: () => void;
}

const EditTemplateContainer = ({ id, ...rest }: IEditTemplateContainer) => {
  const template = useSelector(createSelectTemplate(id));
  return <AddOrEditTemplate template={template} {...rest} />;
};

export default EditTemplateContainer;

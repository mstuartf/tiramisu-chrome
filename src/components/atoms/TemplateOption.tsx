import React from "react";
import { useSelector } from "react-redux";
import { createSelectTemplate } from "../../redux/templates/selectors";

const TemplateOption = ({
  id,
  selected,
}: {
  id: string;
  selected: boolean;
}) => {
  const { name } = useSelector(createSelectTemplate(id));
  return (
    <option value={id} selected={selected}>
      {name}
    </option>
  );
};

export default TemplateOption;

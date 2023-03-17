import React from "react";
import { useSelector } from "react-redux";
import { createSelectTemplate } from "../../redux/templates/selectors";

interface ITemplateCard {
  id: string;
  onEdit: () => void;
}

const TemplateCard = ({ id, onEdit }: ITemplateCard) => {
  const { name, sections, style } = useSelector(createSelectTemplate(id));
  return (
    <div className="p-2 border shadow rounded" onClick={onEdit}>
      <div>{name}</div>
      <div>{style}</div>
    </div>
  );
};

export default TemplateCard;

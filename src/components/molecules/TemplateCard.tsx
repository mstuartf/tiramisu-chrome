import React from "react";
import { useSelector } from "react-redux";
import { createSelectTemplate } from "../../redux/templates/selectors";
import HoverCard from "../atoms/HoverCard";

interface ITemplateCard {
  id: string;
  onEdit: () => void;
}

const TemplateCard = ({ id, onEdit }: ITemplateCard) => {
  const { name, sections, style } = useSelector(createSelectTemplate(id));
  return (
    <HoverCard onClick={onEdit}>
      <div className="text-left">
        <div>
          {name} ({sections.length} sections)
        </div>
        <div>{style}</div>
      </div>
    </HoverCard>
  );
};

export default TemplateCard;

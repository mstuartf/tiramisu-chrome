import React from "react";
import TemplateCard from "../molecules/TemplateCard";

interface ITemplateListProps {
  templateIds: string[];
  onEdit: (id: string) => void;
}

const TemplateList = ({ templateIds, onEdit }: ITemplateListProps) => {
  return (
    <div className="grid gap-2">
      {templateIds.map((id) => (
        <TemplateCard id={id} key={id} onEdit={() => onEdit(id)} />
      ))}
    </div>
  );
};

export default TemplateList;

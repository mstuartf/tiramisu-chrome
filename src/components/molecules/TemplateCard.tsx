import React from "react";
import { useSelector } from "react-redux";
import {
  createSelectTemplate,
  selectTemplateSectionTypes,
  selectTemplateStyles,
} from "../../redux/templates/selectors";
import HoverCard from "../atoms/HoverCard";
import { selectUser } from "../../redux/user/selectors";

interface ITemplateCard {
  id: string;
  onEdit: () => void;
}

const TemplateCard = ({ id, onEdit }: ITemplateCard) => {
  const {
    name,
    sections,
    meta,
    style,
    user: ownerId,
  } = useSelector(createSelectTemplate(id));
  const { id: userId } = useSelector(selectUser)!;
  const templateStyles = useSelector(selectTemplateStyles)!;
  const sectionTypes = useSelector(selectTemplateSectionTypes)!;
  return (
    <HoverCard onClick={onEdit} className="py-4" disabled={ownerId !== userId}>
      <div className="text-left grid grid-cols-4 gap-2 text-gray-700">
        <div className="text-gray-400">Name</div>
        <div className="col-span-3">{name}</div>
        <div className="text-gray-400">Message tone</div>
        <div className="col-span-3">
          {style === "custom" ? meta : templateStyles[style].description}
        </div>
        {!!sections.length && (
          <>
            <div className="text-gray-400">Sections</div>
            <div className="col-span-3">
              {sections
                .sort((a, b) => (a.order < b.order ? -1 : 1))
                .map(({ type, meta: sectionMeta }, index) => (
                  <div key={type}>
                    {index + 1}. {sectionTypes[type].description}
                    {!!sectionMeta && <>&nbsp;({sectionMeta})</>}
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </HoverCard>
  );
};

export default TemplateCard;

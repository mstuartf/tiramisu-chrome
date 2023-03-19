import React from "react";
import Inpt from "../atoms/Inpt";
import Slct from "../atoms/Slct";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { ITemplateSection } from "../../redux/templates/types";
import { useSelector } from "react-redux";
import {
  selectTemplateSectionTypes,
  selectTemplateStyles,
} from "../../redux/templates/selectors";

interface IAddTemplateSection {
  section: ITemplateSection;
  onUpdate: (updated: ITemplateSection) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, d: 1 | -1) => void;
  nbSections: number;
  isSaving: boolean;
}

const TemplateSection = ({
  section: { id, content, meta, order, ...rest },
  onUpdate,
  onMove,
  onDelete,
  nbSections,
  isSaving,
}: IAddTemplateSection) => {
  const sectionTypes = useSelector(selectTemplateSectionTypes)!;
  return (
    <div className="border rounded shadow p-2 grid gap-2">
      <div className="flex justify-between">
        <span>Section {order + 1}</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onMove(id, 1)}
            className={order >= nbSections - 1 ? "invisible" : ""}
            disabled={isSaving}
          >
            <ChevronDownIcon className="h-4 w-4 text-gray-400" />
          </button>
          <button
            type="button"
            onClick={() => onMove(id, -1)}
            className={order <= 0 ? "invisible" : ""}
            disabled={isSaving}
          >
            <ChevronUpIcon className="h-4 w-4 text-gray-400" />
          </button>
          <button
            onClick={() => onDelete(id)}
            disabled={isSaving}
            type="button"
          >
            <XMarkIcon className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>
      <div>
        <Slct
          required
          disabled={isSaving}
          value={content}
          onChange={(value) =>
            onUpdate({ id, content: value, meta, order, ...rest })
          }
        >
          {Object.values(sectionTypes).map(({ name, description }) => (
            <option value={name} key={name}>
              {description}
            </option>
          ))}
        </Slct>
      </div>

      <div>
        <Inpt
          disabled={isSaving}
          value={meta}
          onChange={(value) =>
            onUpdate({ id, content, meta: value, order, ...rest })
          }
          placeholder={
            sectionTypes[content].metaPlaceholder ||
            "Additional guidance (optional)"
          }
          required={sectionTypes[content].metaRequired}
        />
      </div>
    </div>
  );
};

export default TemplateSection;

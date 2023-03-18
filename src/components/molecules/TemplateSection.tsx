import React from "react";
import Inpt from "../atoms/Inpt";
import Slct from "../atoms/Slct";
import {
  XMarkIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { sectionTypes } from "../../constants";

interface IAddTemplateSection {
  id: string;
  index: number;
  content: string;
  meta?: string;
  onUpdate: (updated: { id: string; content: string; meta?: string }) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, d: 1 | -1) => void;
  nbSections: number;
}

const TemplateSection = ({
  id,
  index,
  content,
  meta,
  onUpdate,
  onMove,
  onDelete,
  nbSections,
}: IAddTemplateSection) => {
  return (
    <div className="border rounded shadow p-2 grid gap-2">
      <div className="flex justify-between">
        <span>Section {index + 1}</span>
        <div className="flex gap-2">
          {index < nbSections - 1 && (
            <button onClick={() => onMove(id, 1)}>
              <ChevronDownIcon className="h-4 w-4 text-gray-400" />
            </button>
          )}
          {index > 0 && (
            <button onClick={() => onMove(id, -1)}>
              <ChevronUpIcon className="h-4 w-4 text-gray-400" />
            </button>
          )}
          <button onClick={() => onDelete(id)}>
            <XMarkIcon className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>
      <div>
        <Slct onChange={(value) => onUpdate({ id, content: value, meta })}>
          {sectionTypes.map(({ name, description }) => (
            <option value={name} key={name}>
              {description}
            </option>
          ))}
        </Slct>
      </div>

      <div>
        <Inpt
          onChange={(value) => onUpdate({ id, content, meta: value })}
          placeholder="add any additional info here"
        />
      </div>
    </div>
  );
};

export default TemplateSection;

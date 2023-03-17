import React from "react";
import Inpt from "../atoms/Inpt";
import Slct from "../atoms/Slct";
import {
  TrashIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/solid";

interface IAddTemplateSection {
  id: string;
  index: number;
  content: string;
  meta?: string;
  onUpdate: (updated: { id: string; content: string; meta?: string }) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, d: 1 | -1) => void;
}

const TemplateSection = ({
  id,
  index,
  content,
  meta,
  onUpdate,
  onMove,
  onDelete,
}: IAddTemplateSection) => {
  return (
    <div className="border rounded shadow p-2 grid gap-2">
      <div className="flex justify-between">
        <span>Section {index + 1}</span>
        <div className="flex gap-2">
          <button onClick={() => onMove(id, 1)}>
            <ArrowDownIcon className="h-4 w-4 text-gray-400" />
          </button>
          <button onClick={() => onMove(id, -1)}>
            <ArrowUpIcon className="h-4 w-4 text-gray-400" />
          </button>
          <button onClick={() => onDelete(id)}>
            <TrashIcon className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>
      <div>
        <Slct onChange={(value) => onUpdate({ id, content: value, meta })}>
          <option value="observation">
            Observation about recipient's profile
          </option>
          <option value="question">Question about recipient's profile</option>
          <option value="product">Introduce my product or service</option>
          <option value="cta">Call to action</option>
        </Slct>
      </div>

      <div>
        <Inpt
          onChange={(value) => onUpdate({ id, content, meta: value })}
          placeholder="e.g. TM from CA"
        />
      </div>
    </div>
  );
};

export default TemplateSection;

import React, { useState } from "react";
import Inpt from "../atoms/Inpt";
import Slct from "../atoms/Slct";
import TemplateSection from "./TemplateSection";
import Btn from "../atoms/Btn";
import { PlusIcon } from "@heroicons/react/24/solid";
import { ITemplate, ITemplateSection } from "../../redux/templates/types";

function randomUUID() {
  const S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}

interface IAddTemplate {
  onAdd: () => void;
  onCancel: () => void;
  template: ITemplate;
}

const AddOrEditTemplate = ({
  template: { id, name, style, sections },
  onAdd,
  onCancel,
}: IAddTemplate) => {
  const [sectionIds, setSectionIds] = useState<string[]>(
    sections.map(({ id }) => id)
  );
  const [sectionObjs, setSectionObjs] = useState<{
    [key: string]: ITemplateSection;
  }>(
    sections.reduce(
      (prev, next) => ({
        ...prev,
        [next.id]: next,
      }),
      {}
    )
  );

  const onUpdate = ({
    id,
    ...rest
  }: {
    id: string;
    content: string;
    meta?: string;
  }) => {
    setSectionObjs({
      ...sectionObjs,
      [id]: {
        id,
        ...rest,
      },
    });
  };

  const onAddSection = () => {
    const id = randomUUID();
    setSectionIds([...sectionIds, id]);
    setSectionObjs({
      ...sectionObjs,
      [id]: {
        id,
        content: "observation",
      },
    });
  };

  const onDeleteSection = (id: string) => {
    setSectionIds(sectionIds.filter((sectionId) => sectionId !== id));
  };

  const onMoveSection = (id: string, d: 1 | -1) => {
    const arr = [...sectionIds];
    const fromIndex = arr.indexOf(id);
    const toIndex = fromIndex + d;
    if (toIndex < 0 || toIndex >= sectionIds.length) {
      return;
    }
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, id);
    setSectionIds(arr);
  };

  return (
    <div className="grid gap-2">
      <div className="border-b uppercase font-semibold flex justify-between items-center">
        asdfasgsag
      </div>

      <div className="grid grid-cols-3">
        <div>Name</div>
        <Inpt
          onChange={() => {}}
          placeholder="e.g. message 1"
          className="col-span-2"
        />
      </div>

      <div className="grid grid-cols-3">
        <div>Style</div>
        <Slct onChange={() => {}} className="col-span-2">
          <option>Cheeky and informal</option>
        </Slct>
      </div>

      <div className="py-2 grid gap-2">
        <div className="border-b uppercase font-semibold flex justify-between items-center">
          <span>Sections ({sectionIds.length})</span>
          <div>
            <button onClick={onAddSection}>
              <PlusIcon className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </div>
        {sectionIds
          .map((id) => sectionObjs[id])
          .map(({ id, content, meta }, index) => (
            <TemplateSection
              id={id}
              content={content}
              onUpdate={onUpdate}
              key={id}
              index={index}
              onDelete={onDeleteSection}
              onMove={onMoveSection}
            />
          ))}
      </div>

      <div className="flex justify-between">
        <Btn kind="outline" onClick={onCancel}>
          Cancel
        </Btn>
        <Btn>Save</Btn>
      </div>
    </div>
  );
};

export default AddOrEditTemplate;

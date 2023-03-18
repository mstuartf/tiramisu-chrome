import React, { useState } from "react";
import Inpt from "../atoms/Inpt";
import Slct from "../atoms/Slct";
import TemplateSection from "./TemplateSection";
import Btn from "../atoms/Btn";
import { PlusIcon } from "@heroicons/react/24/solid";
import { ITemplate, ITemplateSection } from "../../redux/templates/types";
import { templateStyles } from "../../constants";
import Spinner from "../atoms/Spinner";

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
  onSave: () => void;
  onCancel: () => void;
  template: Omit<ITemplate, "id"> & { id?: string };
  isSaving: boolean;
}

const AddOrEditTemplate = ({
  template: { id, name, style, sections },
  onSave,
  onCancel,
  isSaving,
}: IAddTemplate) => {
  const [localName, setLocalName] = useState(name);
  const [localStyle, setLocalStyle] = useState(style);
  const [customStyleMeta, setCustomStyleMeta] = useState<string | undefined>();

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

  const onUpdate = ({ id, ...rest }: ITemplateSection) => {
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
        order: sectionIds.length,
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
    setSectionObjs(
      arr.reduce(
        (prev, next, i) => ({
          ...prev,
          [next]: {
            ...sectionObjs[next],
            order: i,
          },
        }),
        {}
      )
    );
  };

  return (
    <div className="grid gap-2">
      <div className="border-b uppercase font-semibold flex justify-between items-center">
        {!!id ? "Edit template" : "Add template"}
      </div>

      <div className="grid grid-cols-3">
        <div className="flex items-center">Name</div>
        <Inpt
          disabled={isSaving}
          value={localName}
          onChange={setLocalName}
          placeholder="e.g. message 1"
          className="col-span-2"
        />
      </div>

      <div className="grid grid-cols-3">
        <div className="flex items-center">Style</div>
        <Slct
          disabled={isSaving}
          value={localStyle}
          onChange={setLocalStyle}
          className="col-span-2"
        >
          {templateStyles.map(({ name, description }) => (
            <option value={name} key={name}>
              {description}
            </option>
          ))}
        </Slct>
      </div>

      {localStyle === "custom" && (
        <div className="grid grid-cols-3">
          <div className="flex items-center">Custom style</div>
          <Inpt
            disabled={isSaving}
            value={customStyleMeta}
            onChange={setCustomStyleMeta}
            placeholder="e.g. wacky and goofy"
            className="col-span-2"
          />
        </div>
      )}

      <div className="py-2 grid gap-2">
        <div className="border-b uppercase font-semibold flex justify-between items-center">
          <span>Sections ({sectionIds.length})</span>
          <div>
            <button onClick={onAddSection} disabled={isSaving}>
              <PlusIcon className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </div>
        {sectionIds
          .map((id) => sectionObjs[id])
          .map((section) => (
            <TemplateSection
              section={section}
              onUpdate={onUpdate}
              key={section.id}
              onDelete={onDeleteSection}
              onMove={onMoveSection}
              nbSections={sectionIds.length}
              isSaving={isSaving}
            />
          ))}
      </div>

      <div className="flex justify-between">
        <Btn kind="outline" onClick={onCancel} disabled={isSaving}>
          Cancel
        </Btn>
        <div>{isSaving && <Spinner />}</div>
        <Btn onClick={onSave} disabled={isSaving}>
          Save
        </Btn>
      </div>
    </div>
  );
};

export default AddOrEditTemplate;

import React, { useState } from "react";
import Inpt from "../atoms/Inpt";
import Slct from "../atoms/Slct";
import TemplateSection from "./TemplateSection";
import Btn from "../atoms/Btn";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { ITemplate, ITemplateSection } from "../../redux/templates/types";
import Spinner from "../atoms/Spinner";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTemplateSectionTypes,
  selectTemplateStyles,
} from "../../redux/templates/selectors";
import { ErrorRes } from "../../redux/types";
import { createDeleteTemplate } from "../../redux/templates/actions";

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
  onSave: (template: ITemplate) => void;
  onCancel: () => void;
  onDelete?: () => void;
  template: ITemplate;
  isSaving: boolean;
  errors?: ErrorRes;
}

const AddOrEditTemplate = ({
  template: { id, name, style, sections, meta },
  onSave: onSaveProp,
  onCancel,
  isSaving,
  onDelete,
}: IAddTemplate) => {
  const { handleSubmit } = useForm();

  const [localName, setLocalName] = useState(name);
  const [localStyle, setLocalStyle] = useState(style);
  const [customStyleMeta, setCustomStyleMeta] = useState(meta);
  const templateStyles = useSelector(selectTemplateStyles)!;
  const sectionTypes = useSelector(selectTemplateSectionTypes)!;

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

  const onSave = () => {
    onSaveProp({
      id,
      name: localName,
      style: localStyle,
      meta: customStyleMeta,
      sections: sectionIds.map((sectionId) => sectionObjs[sectionId]),
    });
  };

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
        type: Object.values(sectionTypes)[0].id,
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
    <form className="grid gap-2" onSubmit={handleSubmit(onSave)}>
      <div className="border-b uppercase font-semibold flex justify-between items-center">
        <div>{id !== "__placeholder__" ? "Edit template" : "Add template"}</div>
        {id !== "__placeholder__" && (
          <button type="button" onClick={onDelete} disabled={isSaving}>
            <TrashIcon className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-3">
        <div className="flex items-center">Name</div>
        <Inpt
          disabled={isSaving}
          value={localName}
          required
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
          required
          onChange={setLocalStyle}
          className="col-span-2"
        >
          {Object.values(templateStyles).map(({ id, description }) => (
            <option value={id} key={id}>
              {description}
            </option>
          ))}
        </Slct>
      </div>

      {templateStyles[localStyle].meta_required && (
        <div className="grid grid-cols-3">
          <div className="flex items-center">Custom style</div>
          <Inpt
            disabled={isSaving}
            value={customStyleMeta}
            onChange={setCustomStyleMeta}
            placeholder={templateStyles[localStyle].meta_placeholder}
            className="col-span-2"
            required={templateStyles[localStyle].meta_required}
          />
        </div>
      )}

      <div className="py-2 grid gap-2">
        <div className="border-b uppercase font-semibold flex justify-between items-center">
          <span>Sections ({sectionIds.length})</span>
          <div>
            <button onClick={onAddSection} disabled={isSaving} type="button">
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
        <Btn
          kind="outline"
          onClick={onCancel}
          disabled={isSaving}
          type="button"
        >
          Cancel
        </Btn>
        <div>{isSaving && <Spinner />}</div>
        <Btn disabled={isSaving} type="submit">
          Save
        </Btn>
      </div>
    </form>
  );
};

export default AddOrEditTemplate;

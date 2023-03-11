import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPatchPrompt,
  createDeletePrompt,
} from "../../redux/prompts/actions";
import {
  createSelectPrompt,
  selectPromptsIsSaving,
} from "../../redux/prompts/selectors";
import Btn from "./Btn";
import TxtAra from "./TxtAra";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Spinner from "./Spinner";

const Prompt = ({ id }: { id: string }) => {
  const dispatch = useDispatch();

  const { text, name, custom } = useSelector(createSelectPrompt(id));
  const isSaving = useSelector(selectPromptsIsSaving);
  const [isEditing, setIsEditing] = useState(false);
  const [localText, setLocalText] = useState(text);

  const onSave = () => {
    dispatch(createPatchPrompt(id, { text: localText }));
  };

  const onDelete = () => {
    dispatch(createDeletePrompt(id));
  };

  const onCancel = () => {
    setLocalText(text);
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing && !isSaving) {
      onCancel();
    }
  }, [isSaving]);

  return (
    <div className="border p-2 pb-4 rounded shadow">
      <div className="flex items-center justify-between mb-2 h-4">
        <div className="font-semibold">{name}</div>
        {custom && !isEditing && (
          <div className="flex gap-2">
            <button onClick={() => setIsEditing(true)} disabled={isSaving}>
              <PencilSquareIcon className="h-4 w-4 text-gray-400" />
            </button>
            <button onClick={onDelete} disabled={isSaving}>
              <TrashIcon className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        )}
      </div>
      {isEditing ? (
        <div className="grid gap-2">
          <TxtAra
            disabled={isSaving}
            autoFocus
            className="w-full border"
            value={localText}
            onChange={setLocalText}
          />
          <div className="flex justify-between mt-2">
            <Btn disabled={isSaving} onClick={onCancel} kind="outline">
              cancel
            </Btn>
            {isSaving && <Spinner />}
            <Btn
              onClick={onSave}
              disabled={isSaving || !localText || localText === text}
            >
              save
            </Btn>
          </div>
        </div>
      ) : (
        <div className="text-gray-500">{text}</div>
      )}
    </div>
  );
};

export default Prompt;

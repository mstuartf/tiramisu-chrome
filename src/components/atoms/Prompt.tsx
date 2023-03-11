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
    <div className="border p-2 rounded shadow">
      <div className="flex justify-between">
        <div className="font-semibold">{name}</div>
        {custom && (
          <div className="">
            <button onClick={() => setIsEditing(true)} disabled={isSaving}>
              edit
            </button>
            <button onClick={onDelete} disabled={isSaving}>
              delete
            </button>
          </div>
        )}
      </div>
      {isEditing ? (
        <div>
          <textarea
            disabled={isSaving}
            autoFocus
            className="w-full border"
            value={localText}
            onChange={({ target: { value } }) => setLocalText(value)}
          />
          <div>
            <button disabled={isSaving} onClick={onCancel}>
              cancel
            </button>
            <button
              onClick={onSave}
              disabled={isSaving || !localText || localText === text}
            >
              save
            </button>
          </div>
        </div>
      ) : (
        <div>{text}</div>
      )}
    </div>
  );
};

export default Prompt;

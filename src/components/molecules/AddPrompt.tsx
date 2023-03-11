import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPromptsIsSaving } from "../../redux/prompts/selectors";
import { createCreatePrompt } from "../../redux/prompts/actions";

const AddPrompt = () => {
  const dispatch = useDispatch();

  const isSaving = useSelector(selectPromptsIsSaving);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const onSave = () => {
    dispatch(createCreatePrompt({ name, text }));
  };

  const onCancel = () => {
    setName("");
    setText("");
    setIsAdding(false);
  };

  useEffect(() => {
    if (isAdding && !isSaving) {
      onCancel();
    }
  }, [isSaving]);

  if (!isAdding) {
    return (
      <button onClick={() => setIsAdding(true)} disabled={isSaving}>
        add
      </button>
    );
  }

  return (
    <>
      <input
        value={name}
        onChange={({ target: { value } }) => setName(value)}
        disabled={isSaving}
      />
      <textarea
        value={text}
        onChange={({ target: { value } }) => setText(value)}
        disabled={isSaving}
      />
      <div>
        <button disabled={isSaving} onClick={onCancel}>
          cancel
        </button>
        <button onClick={onSave} disabled={isSaving || !text || !name}>
          save
        </button>
      </div>
    </>
  );
};

export default AddPrompt;

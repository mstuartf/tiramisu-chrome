import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPromptsIsSaving } from "../../redux/prompts/selectors";
import { createCreatePrompt } from "../../redux/prompts/actions";
import Btn from "../atoms/Btn";
import Inpt from "../atoms/Inpt";
import TxtAra from "../atoms/TxtAra";
import Spinner from "../atoms/Spinner";

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
      <Btn onClick={() => setIsAdding(true)} disabled={isSaving}>
        add
      </Btn>
    );
  }

  return (
    <div className="grid gap-2">
      <Inpt
        value={name}
        onChange={setName}
        disabled={isSaving}
        placeholder="Enter a name for this style"
      />
      <TxtAra
        value={text}
        onChange={setText}
        disabled={isSaving}
        placeholder="Enter a description of the style"
      />
      <div className="flex justify-between items-center mt-2">
        <Btn disabled={isSaving} onClick={onCancel} kind="outline">
          cancel
        </Btn>
        {isSaving && <Spinner />}
        <Btn onClick={onSave} disabled={isSaving || !text || !name}>
          save
        </Btn>
      </div>
    </div>
  );
};

export default AddPrompt;

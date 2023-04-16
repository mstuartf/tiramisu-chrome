import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selectors";
import { createPatchUser } from "../../redux/user/actions";
import Slct from "../atoms/Slct";

const SelectModel = () => {
  const dispatch = useDispatch();
  const { openai_model } = useSelector(selectUser)!;

  const [localModel, setLocalModel] = useState<string>(openai_model);

  useEffect(() => {
    setLocalModel(openai_model);
  }, [openai_model]);

  const patch = (value: string) => {
    setLocalModel(value);
    dispatch(createPatchUser({ openai_model: value }));
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex items-center">OpenAI model</div>
      <Slct value={localModel} required onChange={patch}>
        <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
        <option value="gpt-4">gpt-4</option>
      </Slct>
    </div>
  );
};

export default SelectModel;

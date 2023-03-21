import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSelectTemplateIds,
  selectSelectedTemplate,
} from "../../redux/templates/selectors";
import TemplateOption from "../atoms/TemplateOption";
import { selectTemplate } from "../../redux/templates/slice";
import Slct from "../atoms/Slct";
import { selectUser } from "../../redux/user/selectors";

const SelectTemplate = () => {
  const dispatch = useDispatch();
  const { id: userId } = useSelector(selectUser)!;
  const templateIds = useSelector(createSelectTemplateIds(userId));
  const selectedTemplateId = useSelector(selectSelectedTemplate);
  const onChange = (id: string) => {
    dispatch(selectTemplate(id));
  };
  return (
    <div>
      <Slct onChange={onChange}>
        {templateIds!.map((id) => (
          <TemplateOption
            id={id}
            key={id}
            selected={id === selectedTemplateId}
          />
        ))}
      </Slct>
    </div>
  );
};

export default SelectTemplate;

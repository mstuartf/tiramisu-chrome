import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTemplateIds,
  selectSelectedTemplate,
} from "../../redux/templates/selectors";
import TemplateOption from "../atoms/TemplateOption";
import { selectTemplate } from "../../redux/templates/slice";
import Slct from "../atoms/Slct";

const SelectTemplate = () => {
  const dispatch = useDispatch();
  const templateIds = useSelector(selectTemplateIds);
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
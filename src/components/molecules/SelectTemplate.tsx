import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSelectedTemplate,
  selectTemplateIds,
} from "../../redux/templates/selectors";
import TemplateOption from "../atoms/TemplateOption";
import { selectTemplate } from "../../redux/templates/slice";
import Slct from "../atoms/Slct";
import { selectMessagesLoadingState } from "../../redux/prospect/selectors";

const SelectTemplate = () => {
  const dispatch = useDispatch();
  const templateIds = useSelector(selectTemplateIds)!;
  const messagesIsLoading = useSelector(selectMessagesLoadingState);
  const selectedTemplateId = useSelector(selectSelectedTemplate);
  const onChange = (id: string) => {
    dispatch(selectTemplate(id));
  };

  useEffect(() => {
    // always select the first by default (and check it has not just been deleted)
    if (!selectedTemplateId || !templateIds?.includes(selectedTemplateId)) {
      dispatch(selectTemplate(templateIds[0]));
    }
  }, [templateIds, selectedTemplateId]);

  return (
    <div>
      <Slct onChange={onChange} disabled={messagesIsLoading}>
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

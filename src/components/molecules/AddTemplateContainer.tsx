import React, { useEffect, useState } from "react";
import AddOrEditTemplate from "./AddOrEditTemplate";
import { INewTemplate, ITemplate } from "../../redux/templates/types";
import { templateStyles } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { createCreateTemplate } from "../../redux/templates/actions";
import {
  selectTemplatesIsSaving,
  selectTemplatesSavingErrors,
} from "../../redux/templates/selectors";

interface IAddTemplateContainer {
  onClose: () => void;
}

const AddTemplateContainer = ({ onClose }: IAddTemplateContainer) => {
  const dispatch = useDispatch();
  const template: ITemplate = {
    id: "__placeholder__",
    name: "",
    style: templateStyles[0].name,
    sections: [],
  };

  const [localIsSaving, setLocalIsSaving] = useState(false);
  const isSaving = useSelector(selectTemplatesIsSaving);
  const errors = useSelector(selectTemplatesSavingErrors);

  const onSave = ({ name, sections, style }: ITemplate) => {
    setLocalIsSaving(true);
    const updated: INewTemplate = {
      name,
      style,
      sections: sections.map(({ content, meta, order }) => ({
        content,
        meta,
        order,
      })),
    };
    dispatch(createCreateTemplate(updated));
  };

  useEffect(() => {
    if (localIsSaving && !isSaving) {
      setLocalIsSaving(false);
      if (!errors.length) {
        onClose();
      }
    }
  }, [isSaving]);

  return (
    <AddOrEditTemplate
      template={template}
      onCancel={onClose}
      onSave={onSave}
      isSaving={localIsSaving}
      errors={errors}
    />
  );
};

export default AddTemplateContainer;

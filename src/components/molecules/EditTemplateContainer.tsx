import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSelectTemplate,
  selectTemplatesIsSaving,
  selectTemplatesSavingErrors,
} from "../../redux/templates/selectors";
import AddOrEditTemplate from "./AddOrEditTemplate";
import { ITemplate } from "../../redux/templates/types";
import { createPutTemplate } from "../../redux/templates/actions";

interface IEditTemplateContainer {
  id: string;
  onClose: () => void;
}

const EditTemplateContainer = ({ id, onClose }: IEditTemplateContainer) => {
  const dispatch = useDispatch();
  const template = useSelector(createSelectTemplate(id));

  const [localIsSaving, setLocalIsSaving] = useState(false);
  const isSaving = useSelector(selectTemplatesIsSaving);
  const errors = useSelector(selectTemplatesSavingErrors);

  const onSave = (updated: ITemplate) => {
    setLocalIsSaving(true);
    dispatch(createPutTemplate(id, updated));
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
    />
  );
};

export default EditTemplateContainer;

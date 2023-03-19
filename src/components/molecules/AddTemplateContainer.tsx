import React, { useEffect, useState } from "react";
import AddOrEditTemplate from "./AddOrEditTemplate";
import { INewTemplate, ITemplate } from "../../redux/templates/types";
import { useDispatch, useSelector } from "react-redux";
import { createCreateTemplate } from "../../redux/templates/actions";
import {
  selectTemplateSectionTypes,
  selectTemplatesIsSaving,
  selectTemplatesSavingErrors,
  selectTemplateStyles,
} from "../../redux/templates/selectors";

interface IAddTemplateContainer {
  onClose: () => void;
}

const AddTemplateContainer = ({ onClose }: IAddTemplateContainer) => {
  const dispatch = useDispatch();
  const templateStyles = useSelector(selectTemplateStyles)!;

  const template: ITemplate = {
    id: "__placeholder__",
    name: "",
    style: Object.values(templateStyles)[0].name,
    sections: [],
  };

  const [localIsSaving, setLocalIsSaving] = useState(false);
  const isSaving = useSelector(selectTemplatesIsSaving);
  const errors = useSelector(selectTemplatesSavingErrors);

  const onSave = ({ id, sections, ...rest }: ITemplate) => {
    setLocalIsSaving(true);
    const updated: INewTemplate = {
      sections: sections.map(({ id, ...rest }) => ({
        ...rest,
      })),
      ...rest,
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

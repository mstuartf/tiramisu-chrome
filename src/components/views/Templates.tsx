import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTemplateIds,
  selectTemplateSectionTypeIds,
  selectTemplateStyleIds,
} from "../../redux/templates/selectors";
import Loading from "../molecules/Loading";
import Btn from "../atoms/Btn";
import TemplateCard from "../molecules/TemplateCard";
import EditTemplateContainer from "../molecules/EditTemplateContainer";
import AddTemplateContainer from "../molecules/AddTemplateContainer";
import {
  createListTemplateSectionTypes,
  createListTemplateStyles,
} from "../../redux/templates/actions";

const Templates = () => {
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [editTemplateId, setEditTemplateId] = useState<string | undefined>();
  const templateIds = useSelector(selectTemplateIds);
  const templateStyleIds = useSelector(selectTemplateStyleIds);
  const templateSectionTypeIds = useSelector(selectTemplateSectionTypeIds);

  useEffect(() => {
    dispatch(createListTemplateStyles());
    dispatch(createListTemplateSectionTypes());
  }, []);

  const onClose = () => {
    setEditTemplateId(undefined);
    setIsAdding(false);
  };

  if (!templateIds || !templateStyleIds || !templateSectionTypeIds) {
    return <Loading />;
  }

  if (editTemplateId) {
    return <EditTemplateContainer id={editTemplateId} onClose={onClose} />;
  }

  if (isAdding) {
    return <AddTemplateContainer onClose={onClose} />;
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        {templateIds.map((id) => (
          <TemplateCard id={id} key={id} onEdit={() => setEditTemplateId(id)} />
        ))}
      </div>
      <Btn onClick={() => setIsAdding(true)}>Create new template</Btn>
    </div>
  );
};

export default Templates;

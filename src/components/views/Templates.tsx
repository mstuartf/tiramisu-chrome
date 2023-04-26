import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSelectMyTemplateIds,
  createSelectSharedTemplateIds,
  selectTemplateSectionTypeIds,
  selectTemplatesLoading,
  selectTemplateStyleIds,
} from "../../redux/templates/selectors";
import Loading from "../molecules/Loading";
import Btn from "../atoms/Btn";
import EditTemplateContainer from "../molecules/EditTemplateContainer";
import AddTemplateContainer from "../molecules/AddTemplateContainer";
import {
  createListTemplates,
  createListTemplateSectionTypes,
  createListTemplateStyles,
} from "../../redux/templates/actions";
import { selectUser } from "../../redux/user/selectors";
import RefreshBtn from "../atoms/RefreshBtn";
import TemplateList from "../molecules/TemplateList";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import NavBar, { NavBarItem } from "../molecules/NavBar";

const Templates = () => {
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [editTemplateId, setEditTemplateId] = useState<string | undefined>();
  const { id: userId } = useSelector(selectUser)!;
  const myTemplateIds = useSelector(createSelectMyTemplateIds(userId));
  const sharedTemplateIds = useSelector(createSelectSharedTemplateIds(userId));
  const templatesLoading = useSelector(selectTemplatesLoading);
  const templateStyleIds = useSelector(selectTemplateStyleIds);
  const templateSectionTypeIds = useSelector(selectTemplateSectionTypeIds);

  const location = useLocation();
  console.log(location);

  useEffect(() => {
    if (!templateStyleIds) {
      dispatch(createListTemplateStyles());
    }
    if (!templateSectionTypeIds) {
      dispatch(createListTemplateSectionTypes());
    }
  }, []);

  const onClose = () => {
    setEditTemplateId(undefined);
    setIsAdding(false);
  };

  const refresh = () => {
    dispatch(createListTemplates());
  };

  if (
    !myTemplateIds ||
    !sharedTemplateIds ||
    !templateStyleIds ||
    !templateSectionTypeIds ||
    templatesLoading
  ) {
    return <Loading />;
  }

  if (editTemplateId) {
    return <EditTemplateContainer id={editTemplateId} onClose={onClose} />;
  }

  if (isAdding) {
    return <AddTemplateContainer onClose={onClose} />;
  }

  return (
    <div>
      <NavBar />
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <ul className="flex h-full">
            <NavBarItem to="/templates/my" text="My templates" />
            <NavBarItem to="/templates/shared" text="Shared with me" />
          </ul>
          <RefreshBtn onClick={refresh} />
        </div>
        <Switch>
          <Route path="/templates/my">
            <TemplateList
              templateIds={myTemplateIds}
              onEdit={setEditTemplateId}
            />
            <Btn onClick={() => setIsAdding(true)}>Create new template</Btn>
          </Route>
          <Route path="/templates/shared">
            <TemplateList
              templateIds={sharedTemplateIds}
              onEdit={setEditTemplateId}
            />
          </Route>
          <Route path="*">
            <Redirect to="/templates/my" />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Templates;

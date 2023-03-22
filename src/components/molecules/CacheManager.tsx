import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCacheKey, selectUserState } from "../../redux/user/selectors";
import { loadState, saveState } from "../../cache";
import { selectTemplateState } from "../../redux/templates/selectors";
import { selectProspectState } from "../../redux/prospect/selectors";
import { RootState } from "../../redux/store";
import { randomUUID } from "./AddOrEditTemplate";
import { loadCache } from "../../redux/user/slice";
import Loading from "./Loading";

interface ICacheManagerProps {
  children: React.ReactNode;
}

const CacheManager = ({ children }: ICacheManagerProps) => {
  const dispatch = useDispatch();
  const [localCacheKey] = useState(randomUUID());
  const cacheKey = useSelector(selectCacheKey);
  const user = useSelector(selectUserState);
  const templates = useSelector(selectTemplateState);
  const prospect = useSelector(selectProspectState);
  const state: RootState = { user, prospect, templates };
  const hash = JSON.stringify(state);

  const cacheLoaded = cacheKey === localCacheKey;

  useEffect(() => {
    if (cacheLoaded) {
      saveState(state);
    }
  }, [hash]);

  useEffect(() => {
    dispatch(
      loadCache({
        key: localCacheKey,
        cache: loadState(),
      })
    );
  }, []);

  if (!cacheLoaded) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default CacheManager;

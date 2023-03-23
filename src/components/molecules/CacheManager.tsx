import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCacheKey,
  selectPath,
  selectUserState,
} from "../../redux/user/selectors";
import { loadState, saveState } from "../../cache";
import { selectTemplateState } from "../../redux/templates/selectors";
import { selectProspectState } from "../../redux/prospect/selectors";
import { RootState } from "../../redux/store";
import { randomUUID } from "./AddOrEditTemplate";
import { loadCache, savePath } from "../../redux/user/slice";
import Loading from "./Loading";
import { Redirect, useLocation } from "react-router-dom";

interface ICacheManagerProps {
  children: React.ReactNode;
}

const CacheManager = ({ children }: ICacheManagerProps) => {
  const dispatch = useDispatch();
  const [localCacheKey] = useState(randomUUID());
  const cacheKey = useSelector(selectCacheKey);
  const cachedPath = useSelector(selectPath);
  const user = useSelector(selectUserState);
  const templates = useSelector(selectTemplateState);
  const prospect = useSelector(selectProspectState);
  const state: RootState = { user, prospect, templates };
  const hash = JSON.stringify(state);

  const cacheLoaded = cacheKey === localCacheKey;

  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(savePath(pathname));
  }, [pathname]);

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

  if (pathname === "/") {
    console.log("redirecting to cache or default on first load");
    return <Redirect to={cachedPath || "/prospect"} />;
  }

  return <>{children}</>;
};

export default CacheManager;

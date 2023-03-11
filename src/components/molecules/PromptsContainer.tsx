import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPromptIds,
  selectPromptsIsLoading,
} from "../../redux/prompts/selectors";
import { createListPrompts } from "../../redux/prompts/actions";
import Prompts from "./Prompts";

const PromptsContainer = () => {
  const dispatch = useDispatch();
  const promptIds = useSelector(selectPromptIds);
  const promptsIsLoading = useSelector(selectPromptsIsLoading);

  useEffect(() => {
    if (!promptIds && !promptsIsLoading) {
      dispatch(createListPrompts());
    }
  }, [!!promptIds, promptsIsLoading]);

  if (!promptIds) {
    return <>Loading...</>;
  }

  return <Prompts ids={promptIds} />;
};

export default PromptsContainer;

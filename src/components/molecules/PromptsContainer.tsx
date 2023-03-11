import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPrompts,
  selectPromptsIsLoading,
} from "../../redux/prompts/selectors";
import { createListPrompts } from "../../redux/prompts/actions";
import Prompts from "./Prompts";

const PromptsContainer = () => {
  const dispatch = useDispatch();
  const prompts = useSelector(selectPrompts);
  const promptsIsLoading = useSelector(selectPromptsIsLoading);

  useEffect(() => {
    if (!prompts && !promptsIsLoading) {
      dispatch(createListPrompts());
    }
  }, [!!prompts, promptsIsLoading]);

  if (!prompts) {
    return <>Loading...</>;
  }

  return <Prompts prompts={prompts} />;
};

export default PromptsContainer;

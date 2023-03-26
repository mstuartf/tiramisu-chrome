import { RootState } from "./redux/store";
import packageJson from "../package.json";

const STATE_KEY = `__tiramisuState_${packageJson.version}__`;

export const loadState = (): RootState | undefined => {
  const json = localStorage.getItem(STATE_KEY);
  if (!json) {
    return undefined;
  }
  return JSON.parse(json) as RootState;
};

// todo: don't cache access token
export const saveState = (state: RootState) =>
  localStorage.setItem(STATE_KEY, JSON.stringify(state));

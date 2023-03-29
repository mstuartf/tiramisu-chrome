import { RootState } from "./redux/store";
import packageJson from "../package.json";

const STATE_KEY = `__tiramisuState_${packageJson.version}__`;

export const loadState = async (): Promise<RootState | undefined> => {
  return chrome.storage.local.get(STATE_KEY).then((data) => {
    return data ? data[STATE_KEY] : undefined;
  });
};

export const saveState = (state: RootState) =>
  chrome.storage.local.set({ [STATE_KEY]: state });

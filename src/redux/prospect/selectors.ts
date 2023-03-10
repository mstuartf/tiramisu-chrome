import { RootState } from "../store";

export const selectProspectSlug = (state: RootState) => state.prospect.profileSlug;

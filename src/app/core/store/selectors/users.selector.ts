import { IAppState } from "@core/models/user";
import { createSelector } from "@ngrx/store";

export const selectUsersFeature = (state: IAppState) =>
  state.users;
export const usersIsLoadingSelector = createSelector(selectUsersFeature, (state) => state.isLoading)
export const usersSelector = createSelector(selectUsersFeature, (state) => state.users)
export const selectedUserSelector = createSelector(selectUsersFeature, (state) => state.selectedUser)

import { createReducer, on } from "@ngrx/store";

import { IUsersState } from "@core/models/user";
import { UserAction } from '../actions/index'

const initialUsersState: IUsersState = {
  isLoading: false,
  users: [],
  selectedUser: null
}
export const userReducer = createReducer(initialUsersState,
  on(UserAction.getAllUsers, (state) => ({ ...state, isLoading: true })),
  on(UserAction.getUsersSuccess, (state, { users }) => ({ ...state, users, isLoading: false })),
  on(UserAction.deleteUserSuccess, (state, { id }) => ({ ...state, users: state.users.filter(user => user.id != id) })),
  on(UserAction.getUserByIdSuccess, (state, { user }) => ({ ...state, selectedUser: user }))
);

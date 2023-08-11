import { UserAction, UserListAction } from '../actions/index'
import { createReducer, on } from "@ngrx/store";

import { IUsersState } from "@core/models/user";

const initialUsersState: IUsersState = {
  isLoading: false,
  users: [],
  selectedUser: null
}
export const userReducer = createReducer(initialUsersState,
  on(UserListAction.getAllUsers, (state) => ({ ...state, isLoading: true })),
  on(UserListAction.getUsersSuccess, (state, { users }) => ({ ...state, users, isLoading: false })),
  on(UserListAction.deleteUserSuccess, (state, { id }) => ({ ...state, users: state.users.filter(user => user.id != id) })),
  on(UserAction.getUserByIdSuccess, (state, { user }) => ({ ...state, selectedUser: user })),
  on(UserAction.updateUserSuccess, (state, { user }) => ({ ...state, users: state.users.map(_user => _user.id == user.id ? user : _user) })),
  on(UserAction.addUserSuccess, (state, { user }) => ({ ...state, users: { user, ...state.users } }))
);

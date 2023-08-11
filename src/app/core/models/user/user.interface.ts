
export interface IUser {
  id?: number,
  firstName: string;
  lastName: string;
  birthdate: string;
  isActive: boolean
}
export interface IUsersState {
  isLoading: boolean,
  users: IUser[],
  selectedUser: IUser | null
}

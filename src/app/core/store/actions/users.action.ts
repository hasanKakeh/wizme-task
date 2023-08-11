import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { IUser } from '@core/models/user';

export const UserAction = createActionGroup({
  source: 'users',
  events: {
    'Get All Users': emptyProps(),
    'Get Users Success': props<{ users: IUser[] }>(),
    'Add User': props<{ user: IUser }>(),
    'Add User Success': props<{ user: IUser }>(),
    'Update user': props<{ user: IUser }>(),
    'Update user Success': props<{ user: IUser }>(),
    'Delete user': props<{ id: number }>(),
    'Delete user Success': props<{ id: number }>(),
    'Get User By Id': props<{ id: number }>(),
    'Get User By Id Success': props<{ user: IUser }>(),
    'Get User By Id Failure': props<{ error: string }>(),
  }
})

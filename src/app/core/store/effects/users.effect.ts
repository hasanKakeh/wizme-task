import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserAction, UserListAction } from "../actions";
import { map, mergeMap, tap } from "rxjs";

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from './../../service';

@Injectable()
export class UsersEffects {
  constructor(private userService: UserService, private actions$: Actions, private route: Router) { }

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserListAction.getAllUsers),
      mergeMap(() =>
        this.userService.getAllUser()
          .pipe(map((users) => UserListAction.getUsersSuccess({ users })))
      )
    )
  )
  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserAction.addUser), mergeMap((props) =>
        this.userService.addUser(props.user)
          .pipe(map(user => UserAction.addUserSuccess({ user })),
            tap(() => {
              this.route.navigate([''])
            }))
      )
    )
  )
  editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserAction.updateUser), mergeMap((props) =>
        this.userService.updateUser(props.user)
          .pipe(map(user => UserAction.updateUserSuccess({ user })),
            tap(() => {
              this.route.navigate([''])
            }))
      )
    )
  )
  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserListAction.deleteUser),
      mergeMap((props) =>
        this.userService.deleteUser(props.id)
          .pipe(map((id) => UserListAction.deleteUserSuccess({ id }))))));

  getUserByID$ = createEffect(() =>
    this.actions$.pipe(ofType(UserAction.getUserById),
      mergeMap((props) => this.userService.getUserById(props.id).pipe(map(user => {
        if (user) return UserAction.getUserByIdSuccess({ user })
        this.route.navigate([''])
        return UserAction.getUserByIdFailure({ error: 'user not exist' })
      }
      )))))
}

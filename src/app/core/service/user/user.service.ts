import { Observable, delay, of } from 'rxjs';

import { IUser } from '@core/models/user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: IUser[] = [
    { id: 0, firstName: 'hasan', lastName: 'kakeh', birthdate: '1999-2-1', isActive: false },
    { id: 1, firstName: 'hasan', lastName: 'kakeh', birthdate: '1999-2-1', isActive: false },
    { id: 2, firstName: 'hasan', lastName: 'kakeh', birthdate: '1999-2-1', isActive: false },
    { id: 3, firstName: 'hasan', lastName: 'kakeh', birthdate: '1999-2-1', isActive: true },
    { id: 4, firstName: 'hasan', lastName: 'kakeh', birthdate: '1999-2-1', isActive: false },
    { id: 5, firstName: 'hasan', lastName: 'kakeh', birthdate: '1999-2-1', isActive: false },
  ]
  constructor() { }

  getAllUser(): Observable<IUser[]> {
    return of(this.users).pipe(delay(2000))
  }
  addUser(user: IUser) {

    let id = 0
    if (this.users.length > 0) {
      const lastUser = this.users[this.users.length - 1];
      const lastId = lastUser?.id ?? 0
      id = lastId + 1
    }
    this.users = [...this.users, { ...user, id }]
    return of(user)
  }
  deleteUser(id: number) {
    this.users = this.users.filter(user => user.id != id);
    return of(id)
  }

  getUserById(id: number): Observable<IUser | null> {
    return of(this.users.find((user) => user.id == id) ?? null)
  }

  updateUser(user: IUser) {
    this.users = this.users.map(_user => {
      if (_user.id != user.id)
        return _user;
      return { ..._user, user }
    })
    return of(user)
  }

}

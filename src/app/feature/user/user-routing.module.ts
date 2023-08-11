import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { UserFormComponent } from './component/user-form/user-form.component';
import { UserListComponent } from './component/user-list/user-list.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'addUser', component: UserFormComponent },
  { path: 'editUser/:id', component: UserFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

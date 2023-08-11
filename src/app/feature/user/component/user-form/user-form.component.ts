import { BehaviorSubject, Observable, Subject, filter, switchMap, takeUntil, tap } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAppState, IUser } from '@core/models/user';
import { Store, select } from '@ngrx/store';
import { UserAction, selectedUserSelector } from '@core/store';

import { ActivatedRoute } from '@angular/router';
import { TitleService } from '@core/service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent implements OnInit, OnDestroy {
  userForm!: FormGroup;
  validationMessages = {
    firstName: {
      required: 'First name is Required',
      minlength: 'First name Length must be Minimum 4 character',
    },
    lastName: {
      required: 'Last name is Required',
      minlength: 'Last name Length must be Minimum 4 character',
    },
    birthdate: { required: 'Birthdate is Required' },
  }
  userId$ = new BehaviorSubject<number | null>(null);
  destroy$ = new Subject<void>();
  user$!: Observable<IUser>;

  constructor(private route: ActivatedRoute,
    private store: Store<IAppState>,
    private titleService: TitleService) {
  }

  ngOnInit(): void {

    this.initUserForm();
    this.subscribeRouteParams();
  }
  subscribeRouteParams() {
    this.route.params.pipe(
      filter(params => {
        if (!params['id'])
          this.titleService.setTitle('Add User')
        return !!params['id']
      }),
      tap(({ id }) => {
        this.titleService.setTitle('Edit User')
        this.userId$.next(id);
        this.getUserById(id);
      }),
      switchMap(() => {
        return this.store.select(selectedUserSelector)
      }),
      takeUntil(this.destroy$))
      .subscribe(user => {
        if (user) {
          const birthdate = new Date(user.birthdate)
          this.userForm.patchValue({ ...user, birthdate })
        }
      })

  }
  getUserById(id: number) {
    this.store.dispatch(UserAction.getUserById({ id }))
  }

  initUserForm() {
    this.userForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      birthdate: new FormControl(null, [Validators.required]),
      isActive: new FormControl(false),
    })
  }
  onSubmit() {
    if (this.userForm.valid) {
      if (!this.userId$.value) {
        this.addUser()
        return
      }
      this.editUser()
      return
    }
    this.markFormsAsTouched()
  }
  markFormsAsTouched() {
    this.userForm.markAllAsTouched();
    Object.keys(this.userForm.controls).forEach((key) => {
      this.userForm.controls[key].markAsTouched()
      this.userForm.controls[key].updateValueAndValidity()
    })
  }
  addUser() {
    this.store.dispatch(UserAction.addUser({ user: this.userForm.value }))
  }
  editUser() {
    this.store.dispatch(UserAction.updateUser({ user: { ...this.userForm.value, id: this.userId$.value } }))
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

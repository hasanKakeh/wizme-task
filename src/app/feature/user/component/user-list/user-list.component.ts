import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IAppState, IUser } from '@core/models/user';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { UserAction, usersIsLoadingSelector, usersSelector } from '@core/store';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TitleService } from '@core/service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['firstName', 'lastName', 'birthdate', 'isActive', 'Action'];
  dataSource = new MatTableDataSource<IUser>([]);
  isLoading$!: Observable<boolean>;
  destroy$ = new Subject<void>();

  constructor(private store: Store<IAppState>, private titleService: TitleService) { }

  ngOnInit(): void {
    this.titleService.setTitle('user list')
    this.isLoading$ = this.store.pipe(select(usersIsLoadingSelector))
    this.getAllUser()
    this.subscribeUserStore()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllUser() {
    this.store.dispatch(UserAction.getAllUsers())
  }
  subscribeUserStore() {
    this.store.pipe(takeUntil(this.destroy$), select(usersSelector))
      .subscribe(users => {
        this.dataSource.data = users
      })
  }

  deleteUser(id: number) {
    this.store.dispatch(UserAction.deleteUser({ id }))
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetUserList } from 'src/app/shared/actions/user.actions';
import { AppState } from 'src/app/shared/models/app.state';
import { UserModel } from 'src/app/shared/models/user.model';

@Component({
  selector: 'user-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  users$: Observable<UserModel[]>;
  loading$: Observable<boolean>;
  constructor(private store: Store<AppState>) {
    this.users$ = this.store.select(store => store.users.users);
    this.loading$ = this.store.select(store => store.users.loading);
  }

  ngOnInit(): void {
    console.log('MainPageComponent.ngOnInit')
    this.store.dispatch(GetUserList());
  }

}

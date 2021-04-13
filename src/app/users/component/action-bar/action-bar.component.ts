import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetUserList, GetUserListNext, GetUserListPrevious } from 'src/app/shared/actions/user.actions';
import { AppState } from 'src/app/shared/models/app.state';

@Component({
  selector: 'user-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent implements OnInit {
  page$: Observable<number>;
  totalPage$: Observable<number>;
  total$: Observable<number>;
  constructor(private store: Store<AppState>) {
    this.page$ = this.store.select(state => state.users.page - 1);
    this.total$ = this.store.select(state => state.users.total);
    this.totalPage$ = this.store.select(state => state.users.total_page);
  }

  ngOnInit(): void {

  }

  pageChanged(event: any) {
    if (event.pageIndex > event.previousPageIndex) {
      this.store.dispatch(GetUserListNext())
    } else {
      this.store.dispatch(GetUserListPrevious())
    }
    this.store.dispatch(GetUserList());

  }

}

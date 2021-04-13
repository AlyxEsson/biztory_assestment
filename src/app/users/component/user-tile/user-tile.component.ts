import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DeleteUser } from 'src/app/shared/actions/user.actions';
import { AppState } from 'src/app/shared/models/app.state';
import { UserModel } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-tile',
  templateUrl: './user-tile.component.html',
  styleUrls: ['./user-tile.component.scss']
})
export class UserTileComponent implements OnInit {
  @Input() user: UserModel | undefined;
  removeLoading: boolean = false;
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
  }

  get fullName() {
    return `${this.user?.first_name} ${this.user?.last_name}`;
  }

  removeUser(id: number | undefined) {
    console.log('UserTile.removeUser')
    if (!id) return;
    this.removeLoading = true;
    this.store.dispatch(DeleteUser({ id: id }));
  }
}

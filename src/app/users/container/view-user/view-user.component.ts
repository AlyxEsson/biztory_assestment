import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { DeleteUser, GetUser, UpdateUser, UpdateUserSuccess } from 'src/app/shared/actions/user.actions';
import { AppState } from 'src/app/shared/models/app.state';
import { UserModel } from 'src/app/shared/models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit, OnDestroy {
  user: Observable<UserModel | undefined>;
  editUser: UserModel;
  private _sub: Subscription | undefined;
  saving: boolean = false;

  removeLoading: boolean = false;
  constructor(private route: ActivatedRoute, private store: Store<AppState>, private router: Router) {
    store.select(store => store.users.loading).subscribe(value => {
      if (!value && this.saving) {
        this.saving = false;
        this.completeSaving();
      } else if (!value && this.removeLoading) {
        this.removeLoading = false;
        this.completeRemove();
      }
    })
    this.editUser = {
      avatar: "",
      email: "",
      first_name: "",
      id: 0,
      last_name: ""
    };
    this.user = this.store.select(store => store.users.selectedUser)
    this.bindParam();
  }

  ngOnInit(): void {
    this._sub = this.user.subscribe(user => {
      if (user) this.editUser = user;
    })
  }

  ngOnDestroy() {
    if (this._sub) this._sub.unsubscribe();
  }

  updateFirstName(value: any) {
    this.editUser.first_name = value;
  }
  updateLastName(value: string) {
    this.editUser.last_name = value;
  }
  updateEmailName(value: string) {
    this.editUser.email = value;
  }

  private bindParam() {
    this.route.paramMap.subscribe(param => {
      var id = param.get('id');
      if (id) {
        this.store.dispatch(GetUser({ id: Number.parseInt(id) }));
      }
    })
  }

  goBack() {
    this.router.navigate(['../../']);
  }

  onSave() {
    console.log('ViewUserComponent.onSave')
    this.saving = true;
    this.store.dispatch(UpdateUser(this.editUser));
  }

  completeSaving() {
    Swal.fire({
      heightAuto: false,
      title: "Success",
      icon: 'success',
      text: 'User Updated',
    }).then(() => this.goBack())
  }

  removeUser() {
    console.log('UserTile.removeUser')
    if (!this.editUser.id) return;
    this.removeLoading = true;
    this.store.dispatch(DeleteUser({ id: this.editUser.id }));
  }

  completeRemove() {
    Swal.fire({
      heightAuto: false,
      title: "Success",
      icon: 'success',
      text: 'User Removed',
    }).then(() => this.goBack())
  }





}

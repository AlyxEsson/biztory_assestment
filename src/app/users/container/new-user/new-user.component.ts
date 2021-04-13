import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AddUser } from 'src/app/shared/actions/user.actions';
import { AppState } from 'src/app/shared/models/app.state';
import { UserModel } from 'src/app/shared/models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  private saving: boolean = false;
  loading$: Observable<boolean> ;
  user: UserModel = {
    avatar: "",
    email: "",
    first_name: "",
    id: 0,
    last_name: ""
  }
  constructor(private store: Store<AppState>, private router: Router) {
    this.loading$ = this.store.select(state => state.users.loading)
    this.loading$.subscribe(value => {
      if (!value && this.saving) {
        this.saving = false;
        Swal.fire({
          heightAuto: false,
          title: 'Success',
          text: "User Successfully Created",
          icon: "success",
        }).then(() => this.router.navigate(['/users']));
      }
    })
  }

  ngOnInit(): void {
  }

  save() {
    this.saving = true;
    this.store.dispatch(AddUser(this.user));
  }

}

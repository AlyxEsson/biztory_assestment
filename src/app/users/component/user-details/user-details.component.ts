import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserModel } from 'src/app/shared/models/user.model';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() user: UserModel = {
    avatar: "",
    email: "",
    first_name: "",
    id: 0,
    last_name: ''
  };
  @Output() userChange: EventEmitter<UserModel> = new EventEmitter<UserModel>();
  constructor() { }

  ngOnInit(): void {
  }

  userUpdate() {
    console.log('UserDetailsComponent.Emit', JSON.stringify(this.user))
    this.userChange.emit(this.user);
  }
}

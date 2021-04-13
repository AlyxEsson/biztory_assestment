import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from 'src/app/shared/models/user.model';

@Component({
  selector: 'user-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss']
})
export class ViewListComponent implements OnInit {
  @Input() users: UserModel[] | null = null;
  constructor() { }

  ngOnInit(): void {
  }

}

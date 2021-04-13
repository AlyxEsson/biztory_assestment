import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserTileComponent } from './component/user-tile/user-tile.component';
import { MainPageComponent } from './container/main-page/main-page.component';
import { SharedModule } from '../shared/shared.module';
import { ActionBarComponent } from './component/action-bar/action-bar.component';
import { ViewListComponent } from './component/view-list/view-list.component';
import { NewUserComponent } from './container/new-user/new-user.component';
import { ImageUploaderComponent } from './component/image-uploader/image-uploader.component';
import { UserDetailsComponent } from './component/user-details/user-details.component';
import { ViewUserComponent } from './container/view-user/view-user.component';


@NgModule({
  declarations: [
    UsersComponent,
    MainPageComponent,
    UserTileComponent,
    ActionBarComponent,
    ViewListComponent,
    NewUserComponent,
    ImageUploaderComponent,
    UserDetailsComponent,
    ViewUserComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './container/main-page/main-page.component';
import { NewUserComponent } from './container/new-user/new-user.component';
import { ViewUserComponent } from './container/view-user/view-user.component';
import { UsersComponent } from './users.component';

const routes: Routes = [{
  path: '', component: UsersComponent, children: [
    { path: '', component: MainPageComponent },
    { path: 'new', component: NewUserComponent },
    { path: 'view/:id', component: ViewUserComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }

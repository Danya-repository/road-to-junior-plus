import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseLayoutComponent} from './components/base-layout/base-layout.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {UserComponent} from './components/user/user.component';
import {MainRoutingModule} from "./main-routing.module";
import { UserCreateFormComponent } from './components/user-create-form/user-create-form.component';

@NgModule({
  declarations: [
    BaseLayoutComponent,
    UserListComponent,
    UserComponent,
    UserCreateFormComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
  ]
})
export class MainModule {
}

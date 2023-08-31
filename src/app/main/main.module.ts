import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseLayoutComponent} from './components/base-layout/base-layout.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {UserComponent} from './components/user/user.component';
import {MainRoutingModule} from "./main-routing.module";

@NgModule({
  declarations: [
    BaseLayoutComponent,
    UserListComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
  ]
})
export class MainModule {
}

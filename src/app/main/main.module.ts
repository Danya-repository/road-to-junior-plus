import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseLayoutComponent} from './components/base-layout/base-layout.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {UserComponent} from './components/user/user.component';
import {UserCreateFormComponent} from './components/user-create-form/user-create-form.component';
import {API_TOKEN, ApiService} from "../services/api/api.service";
import {BackendService} from "../services/backend/backend.service";
import {HttpClientModule} from "@angular/common/http";
import {USER_TOKEN, UserService} from "../services/user/user.service";
import {SharedModule} from "../shared/shared.module";
import {MainRoutingModule} from "./main-routing.module";

@NgModule({
  declarations: [
    BaseLayoutComponent,
    UserListComponent,
    UserComponent,
    UserCreateFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    MainRoutingModule,
  ],
  providers: [
    {provide: API_TOKEN, useClass: ApiService},
    {provide: USER_TOKEN, useClass: UserService},
    BackendService,
  ],
})
export class MainModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseLayoutComponent} from './components/base-layout/base-layout.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {UserComponent} from './components/user/user.component';
import {MainRoutingModule} from "./main-routing.module";
import { UserCreateFormComponent } from './components/user-create-form/user-create-form.component';
import {API_TOKEN, ApiService} from "../services/api/api.service";
import {BackendService} from "../services/backend/backend.service";
import {HttpClientModule} from "@angular/common/http";
import {USER_TOKEN, UserService} from "../services/user/user.service";
import {FormsModule} from "@angular/forms";

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
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    { provide: API_TOKEN, useClass: ApiService },
    { provide: USER_TOKEN, useClass: UserService },
    BackendService,
  ],
})
export class MainModule {
}

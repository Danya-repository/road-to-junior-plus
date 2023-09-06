import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {AUTH_SERVICE_TOKEN, AuthService} from "./services/auth.service";
import {LocalStorageService} from "../shared/services/local-storage.service";
import {SharedModule} from "../shared/shared.module";
import {AuthGuard} from "./services/auth.guard";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  providers: [
    AuthGuard,
    LocalStorageService,
    { provide: AUTH_SERVICE_TOKEN, useClass: AuthService },
  ],
})
export class AuthorizeModule {
}

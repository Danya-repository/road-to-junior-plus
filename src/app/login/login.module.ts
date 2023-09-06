import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import {SharedModule} from "../shared/shared.module";
import {LoginGuard} from "./login.guard";

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  exports: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  providers: [
    LoginGuard,
  ],
})
export class LoginModule { }

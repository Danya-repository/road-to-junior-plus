import {Component, Inject, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AUTH_SERVICE_TOKEN, AuthService} from "../../authorize/services/auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  @ViewChild('loginForm', { static: true })
  private form!: NgForm;

  constructor(@Inject(AUTH_SERVICE_TOKEN) private readonly authService: AuthService) {}

  public login(): void {
    const {login, password} = this.form.controls;

    this.authService.login(login.value, password.value)
  }
}

import {Inject, Injectable} from '@angular/core';
import {Observable } from "rxjs";
import {AUTH_SERVICE_TOKEN, AuthService} from "./auth.service";

@Injectable()
export class AuthGuard {

  constructor(@Inject(AUTH_SERVICE_TOKEN) private readonly authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuth$();
  }
}

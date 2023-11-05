import {Inject, Injectable} from "@angular/core";
import {map, Observable } from "rxjs";
import {AUTH_SERVICE_TOKEN, AuthService} from "../authorize/services/auth.service";


@Injectable()
export class LoginGuard {

  constructor(@Inject(AUTH_SERVICE_TOKEN) private readonly authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.hasAccessToLoginPage$();
  }

  private hasAccessToLoginPage$(): Observable<boolean> {
    return this.authService.isAuth$().pipe(
      map((isAuth: boolean) => isAuth ? false : true),
    );
  }
}

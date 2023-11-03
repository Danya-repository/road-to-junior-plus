import {Inject, Injectable} from "@angular/core";
import { Router} from "@angular/router";
import {map, mapTo, Observable, of, tap} from "rxjs";
import {AUTH_SERVICE_TOKEN, AuthService} from "../authorize/services/auth.service";


@Injectable()
export class LoginGuard {

  constructor(
    @Inject(AUTH_SERVICE_TOKEN) private readonly authService: AuthService,
    private readonly router: Router,
    ) {}

  canActivate(): Observable<boolean> {
    return this.hasAccessToLoginPage$();
  }

  private hasAccessToLoginPage$(): Observable<boolean> {
    return this.authService.isAuth$().pipe(
      map((isAuth: boolean) => isAuth ? false : true),
      tap((accessToLoginPage: boolean) => {
        // TODO вынести сайд эффект в сервис работающий с роутингом
        if (!accessToLoginPage) {
          this.returnToMainPage();
        }
      }),
    );
  }

  private returnToMainPage(): void {
    this.router.navigate(['']);
  }
}

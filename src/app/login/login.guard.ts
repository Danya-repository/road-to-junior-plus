import {Inject, Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {map, Observable, tap} from "rxjs";
import {AUTH_SERVICE_TOKEN, AuthService} from "../authorize/services/auth.service";


@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    @Inject(AUTH_SERVICE_TOKEN) private readonly authService: AuthService,
    private readonly router: Router,
    ) {}

  canActivate(): Observable<boolean> {

    return this.authService.isAuth$().pipe(
      map((isAuth: boolean) => !isAuth),
      tap((isNotAuth) => isNotAuth || this.router.navigate([''])),
    );
  }

}

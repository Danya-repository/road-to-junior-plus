import {Inject, Injectable} from '@angular/core';
import {Router,} from '@angular/router';
import {Observable, tap} from "rxjs";
import {AUTH_SERVICE_TOKEN, AuthService} from "./auth.service";

@Injectable()
export class AuthGuard {

  constructor(
    @Inject(AUTH_SERVICE_TOKEN) private readonly authService: AuthService,
    private readonly router: Router,
  ) {
  }

  canActivate(): Observable<boolean> {
    return this.authService.isAuth$().pipe(
      tap((isAuth) => isAuth || this.router.navigate(['login'])),
    );
  }
}

import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot,} from '@angular/router';
import {Observable, tap} from "rxjs";
import {AUTH_SERVICE_TOKEN, AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    @Inject(AUTH_SERVICE_TOKEN) private readonly authService: AuthService,
    private readonly router: Router,
    ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isAuth$().pipe(
      tap((isAuth) => isAuth || this.router.navigate(['login'])),
      );
  }
}

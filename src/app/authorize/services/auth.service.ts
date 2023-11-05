import {Injectable, InjectionToken} from '@angular/core';
import { Authentification } from "./auth.interface";
import {BehaviorSubject, map, Observable, switchMap } from "rxjs";
import {LocalStorageService} from "../../shared/services/local-storage.service";
import {Router} from "@angular/router";
import { pageRoutes } from 'src/app/app-routing.module';

export const AUTH_SERVICE_TOKEN = new InjectionToken<Authentification>('AUTH_SERVICE_TOKEN')

@Injectable()
export class AuthService implements Authentification {

  private refresh$: BehaviorSubject<null> = new BehaviorSubject<null>(null);

  constructor(private readonly localStorageService: LocalStorageService, private readonly router: Router) { }

  public isAuth$(): Observable<boolean> {
    return this.refresh$.pipe(
      switchMap(() => this.localStorageService.getToken$()),
      map((token: string) => token === 'admin-password'),
    )
  }

  public login(login: string, password: string): void {
    this.localStorageService.setToken(`${login}-${password}`);
    this.refresh$.next(null);
    this.router.navigate([pageRoutes.MAIN]);
  }

  public logout(): void {
    this.localStorageService.removeToken();
    this.refresh$.next(null);
    this.router.navigate([pageRoutes.LOGIN]);
  }
}

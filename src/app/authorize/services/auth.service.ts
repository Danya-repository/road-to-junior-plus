import {Injectable, InjectionToken} from '@angular/core';
import { Authentification } from "./auth.interface";
import {map, Observable } from "rxjs";
import {LocalStorageService} from "../../shared/services/local-storage.service";
import {Router} from "@angular/router";

export const AUTH_SERVICE_TOKEN = new InjectionToken<Authentification>('AUTH_SERVICE_TOKEN')

@Injectable()
export class AuthService implements Authentification {

  constructor(private readonly localStorageService: LocalStorageService, private readonly router: Router) { }

  public isAuth$(): Observable<boolean> {
    return this.localStorageService.getToken$().pipe(
        map((token: string | null) => token === 'admin-password'),
    );
  }

  public login(login: string, password: string): void {
    this.localStorageService.setToken(`${login}-${password}`)
    this.router.navigate(['']);
  }

  public logout(): void {
    this.localStorageService.removeToken()
    this.router.navigate(['login']);
  }
}

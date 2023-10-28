import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable()
export class LocalStorageService {
  private readonly token = 'AUTH_JWT_TOKEN';

  public getToken$(): Observable<string> {
    const token = localStorage.getItem(this.token) ?? '';

    return of(token);
  }

  public setToken(tokenName: string): void {
    localStorage.setItem(this.token, tokenName)
  }

  public removeToken(): void {
    localStorage.removeItem(this.token);
  }
}

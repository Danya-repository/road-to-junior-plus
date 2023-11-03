import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";

@Injectable()
export class LocalStorageService {
  private readonly token = 'AUTH_JWT_TOKEN';

  constructor(private localStorage: Storage) {}

  public getToken$(): Observable<string> {
    const token = this.localStorage.getItem(this.token) ?? '';

    return of(token);
  }

  public setToken(tokenName: string): void {
    this.localStorage.setItem(this.token, tokenName)
  }

  public removeToken(): void {
    this.localStorage.removeItem(this.token);
  }
}

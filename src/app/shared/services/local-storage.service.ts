import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable()
export class LocalStorageService {
  private readonly token = 'AUTH_JWT_TOKEN';

  public getToken$(): Observable< string | null> {
    const token = localStorage.getItem(this.token) ?? null;

    return of(token);
  }

  public setToken(tokenName: string): void {
    localStorage.setItem(this.token, tokenName)
  }

  public removeToken(): void {
    localStorage.removeItem(this.token);
  }
}

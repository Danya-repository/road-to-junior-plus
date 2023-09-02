import {Injectable, InjectionToken} from '@angular/core';
import { ApiInterface } from "./api.interface";

export const API_TOKEN = new InjectionToken<ApiInterface>('API_SERVICE')

@Injectable()
export class ApiService implements ApiInterface {

  private MAIN_URL: string = "http://localhost:8000"

  public get MAIN(): string {
    return this.MAIN_URL;
  }

  public CREATE_USER(): string {
    return `${this.MAIN}/api/user/`;
  }

  public DELETE_USER(userId: string): string {
    return `${this.MAIN}/api/user/${userId}`;
  }

  public UPDATE_USER(userId: string): string {
    return `${this.MAIN}/api/user/${userId}`;
  }

  public USER(userId: string): string {
    return `${this.MAIN}/api/user/${userId}`;
  }

  public USER_LIST(): string {
    return `${this.MAIN}/api/users`;
  }
}

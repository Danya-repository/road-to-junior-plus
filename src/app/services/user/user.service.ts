import {Injectable, InjectionToken} from '@angular/core';
import {BackendService} from "../backend/backend.service";
import {first, Observable} from "rxjs";
import {UserInterface} from "./user.interface";

export const USER_TOKEN = new InjectionToken<UserService>('UserService');

@Injectable()
export class UserService {
  constructor(private backendService: BackendService) { }

  public deleteUser$(userId: string): Observable<void> {
    return this.backendService.deleteUser$(userId).pipe(
      first());
  }

  public getUsers$(): Observable<UserInterface[]> {
    return this.backendService.getUserList$();
  }

  public getUser$(userId: string): Observable<UserInterface> {
    return this.backendService.getUser$(userId);
  }

  public createUser$(user: Partial<UserInterface>): Observable<UserInterface> {
    return this.backendService.createUser$(user).pipe(
        first());
  }

  public editUser$(user: UserInterface): Observable<UserInterface> {
    return this.backendService.editUser$(user).pipe(
        first());
  }
}

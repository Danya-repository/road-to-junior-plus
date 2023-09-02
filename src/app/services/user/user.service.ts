import {Injectable, InjectionToken} from '@angular/core';
import {BackendService} from "../backend/backend.service";
import {first, Observable} from "rxjs";
import {UserInterface} from "./user.interface";

export const USER_TOKEN = new InjectionToken('UserService');

@Injectable()
export class UserService {

  constructor(private backendService: BackendService) { }

  public deleteUser(userId: string): void {
    this.backendService.deleteUser$(userId).pipe(first()).subscribe();
  }

  public getUsers$(): Observable<UserInterface[]> {
    return this.backendService.getUserList$();
  }

  public getUser$(userId: string): Observable<UserInterface> {
    return this.backendService.getUser$(userId);
  }

  public createUser$(user: Partial<UserInterface>): void {
    this.backendService.createUser$(user).pipe(first()).subscribe();
  }

  public editUser$(user: Required<UserInterface>): void {
    this.backendService.editUser$(user).pipe(first()).subscribe();
  }
}

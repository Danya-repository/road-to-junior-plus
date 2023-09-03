import {Injectable, InjectionToken} from '@angular/core';
import {BackendService} from "../backend/backend.service";
import {BehaviorSubject, first, Observable, switchMap} from "rxjs";
import {UserInterface} from "./user.interface";

export const USER_TOKEN = new InjectionToken('UserService');

@Injectable()
export class UserService {

  private usersListUpdated$: BehaviorSubject<null> = new BehaviorSubject<null>(null);

  constructor(private backendService: BackendService) { }

  public updateUsersList() {
    this.usersListUpdated$.next(null);
  }

  public deleteUser$(userId: string): void {
    this.backendService.deleteUser$(userId).pipe(first()).subscribe(() => this.updateUsersList());
  }

  public getUsers$(): Observable<UserInterface[]> {
    return this.usersListUpdated$.pipe(switchMap(() => this.backendService.getUserList$()));
  }

  public getUser$(userId: string): Observable<UserInterface> {
    return this.backendService.getUser$(userId);
  }

  public createUser$(user: Partial<UserInterface>): void {
    this.backendService.createUser$(user).pipe(first()).subscribe(() => this.updateUsersList());
  }

  public editUser$(user: Required<UserInterface>): void {
    this.backendService.editUser$(user).pipe(first()).pipe(first()).subscribe(() => this.updateUsersList());
  }
}

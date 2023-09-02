import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiInterface} from "../api/api.interface";
import {API_TOKEN} from "../api/api.service";
import {UserInterface} from "../user/user.interface";
import {map, Observable} from "rxjs";

interface Response {
  message: string,
  data: any,
}

@Injectable()
export class BackendService {

  constructor(
    private http: HttpClient,
    @Inject(API_TOKEN) private apiService: ApiInterface,
  ) {
  }

  public getUser$(userId: string): Observable<UserInterface> {
    return this.http.get<UserInterface>(this.apiService.USER(userId));
  }

  public getUserList$(): Observable<UserInterface[]> {
    return this.http.get<Response>(this.apiService.USER_LIST()).pipe(map((response: Response) => response.data))
  }

  public createUser$(user: Partial<UserInterface>): Observable<UserInterface> {
    return this.http.post<UserInterface>(this.apiService.CREATE_USER(), user)
  }

  public deleteUser$(userId: string): Observable<void> {
    return this.http.delete<void>(this.apiService.DELETE_USER(userId));
  }

  public editUser$(user: Required<UserInterface>): Observable<UserInterface> {
    return this.http.patch<UserInterface>(this.apiService.UPDATE_USER(user.id), user)
  }
}

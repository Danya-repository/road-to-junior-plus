import {Observable} from "rxjs";

export interface Authentification {
  isAuth$(): Observable<boolean>;
}

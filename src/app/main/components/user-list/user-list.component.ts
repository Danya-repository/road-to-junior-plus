import {Component, Inject, Input, OnInit} from '@angular/core';
import {UserInterface} from "../../../services/user/user.interface";
import {BehaviorSubject, Observable, Subject, switchMap} from "rxjs";
import {USER_TOKEN, UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public users$!: Observable<UserInterface[]>;

  constructor(@Inject(USER_TOKEN) private userService: UserService) {}

  ngOnInit(): void {
    this.users$ = this.userService.getUsers$();
  }

}

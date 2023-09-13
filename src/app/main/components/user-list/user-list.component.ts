import {Component, Inject, OnInit} from '@angular/core';
import {UserInterface} from "../../../services/user/user.interface";
import {USER_TOKEN, UserService} from "../../../services/user/user.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public users$!: Observable<UserInterface[]>;

  constructor(@Inject(USER_TOKEN) private userService: UserService) {
  }

  ngOnInit(): void {
    this.users$ = this.userService.getUsers$();
  }

}

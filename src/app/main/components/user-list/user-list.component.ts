import {Component, Input} from '@angular/core';
import {UserInterface} from "../../../services/user/user.interface";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  @Input()
  public userList: UserInterface[] | null = [];

}

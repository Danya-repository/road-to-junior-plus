import {Component, Inject, Input} from '@angular/core';
import {UserInterface} from "../../../services/user/user.interface";
import {USER_TOKEN, UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  public canEdit: boolean = true;

  @Input() user!: UserInterface;

  constructor(@Inject(USER_TOKEN) private userService: UserService) {}

  public onDelete(): void {
    this.userService.deleteUser(this.user.id);
  }

  public onEdit(): void {
    // this.canEdit = !this.canEdit;
  }
}

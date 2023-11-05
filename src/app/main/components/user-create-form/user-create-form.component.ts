import {Component, EventEmitter, Inject, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {USER_TOKEN, UserService} from "../../../services/user/user.service";
import { RouterEvent } from '@angular/router';

@Component({
  selector: 'app-user-create-form',
  templateUrl: './user-create-form.component.html',
  styleUrls: ['./user-create-form.component.scss']
})
export class UserCreateFormComponent {

  @Output()
  public updateList: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('userForm', {static: false}) form!: NgForm;

  constructor(@Inject(USER_TOKEN) private userService: UserService) {}

  public onSubmit(): void {
    this.userService.createUser$({
      name: this.form.controls['username'].value,
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
    }).subscribe();

    this.form.reset();

    this.updateList.emit();
  }
}

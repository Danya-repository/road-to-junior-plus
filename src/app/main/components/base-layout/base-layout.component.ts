import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {UserInterface} from "../../../services/user/user.interface";
import {USER_TOKEN, UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseLayoutComponent {
    public title: string = 'Регистрация пользователей';
}

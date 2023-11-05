import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { UserInterface } from 'src/app/services/user/user.interface';
import { USER_TOKEN, UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseLayoutComponent implements OnInit {
  public title = 'Регистрация пользователей';
  public users$!: Observable<UserInterface[]>;

  private refreshList$: BehaviorSubject<void> = new BehaviorSubject<void>(void 0);

  constructor(@Inject(USER_TOKEN) private userService: UserService) {}

  ngOnInit(): void {
    this.users$ = this.refreshList$.pipe(
      switchMap(() => this.userService.getUsers$()),
    );
  }

  public onUpdateList(): void {
    this.refreshList$.next();
  }
}

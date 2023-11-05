import {Component, Inject, OnInit} from '@angular/core';
import {AUTH_SERVICE_TOKEN, AuthService} from "./authorize/services/auth.service";
import {Observable} from "rxjs";
import { GuardRejectService } from './services/guard-reject/guard-reject.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public showLogoutButton!: Observable<boolean>;

  constructor(@Inject(AUTH_SERVICE_TOKEN) private readonly authService: AuthService,
    private guardRejectService: GuardRejectService
  ) {}

  public logout(): void {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.guardRejectService.initialize();
    this.showLogoutButton = this.authService.isAuth$();
  }
}

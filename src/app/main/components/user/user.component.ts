import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {UserInterface} from "../../../services/user/user.interface";
import {USER_TOKEN, UserService} from "../../../services/user/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {combineLatest, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  @Input() user!: UserInterface;
  @Output() updateList: EventEmitter<void> = new EventEmitter<void>();

  public form!: FormGroup;
  private _onDestroy$: Subject<void> = new Subject<void>();
  private initialUser!: UserInterface;

  constructor(@Inject(USER_TOKEN) private userService: UserService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(this.user.name, [ Validators.required ]),
      email: new FormControl(this.user.email, [ Validators.required ]),
      password: new FormControl(this.user.password, [ Validators.required ]),
    });

    combineLatest([
      this.form.controls['username'].valueChanges,
      this.form.controls['email'].valueChanges,
      this.form.controls['password'].valueChanges,
    ]).pipe(takeUntil(this._onDestroy$)).subscribe(([username, email, password]: [string, string, string]) => {
        this.user = {
          ...this.user,
          name: username,
          email: email,
          password: password,
        }
      }
    )

    this.initialUser = {...this.user}

    this.form.disable();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
  }


  public onDelete(): void {
    this.userService.deleteUser$(this.user.id).subscribe();
    this.updateList.next();
  }

  public onEdit(): void {
    this.form.enable();
  }

  public onSave(): void {
    this.userService.editUser$(this.user).subscribe();
    this.form.disable();
  }

  public onReset(): void {
    this.form.controls['username'].reset(this.initialUser.name);
    this.form.controls['email'].reset(this.initialUser.email);
    this.form.controls['password'].reset(this.initialUser.password);

    this.form.disable();
  }
}

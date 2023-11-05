import { Inject, Injectable } from "@angular/core";
import { Router, Event, NavigationCancel, NavigationCancellationCode } from "@angular/router";
import { Subject, filter, switchMap, takeUntil} from "rxjs";
import { pageRoutes } from "src/app/app-routing.module";
import { AUTH_SERVICE_TOKEN, AuthService } from "src/app/authorize/services/auth.service";

@Injectable({
    providedIn: 'root',
})
export class GuardRejectService {
    private _destroy$: Subject<void> = new Subject<void>();

    constructor(
        @Inject(AUTH_SERVICE_TOKEN) private readonly authService: AuthService,
        private _router: Router,
    ) {}

    public initialize(): void {
        this.onGuardRejected$();
    }

    public deactivate(): void {
        this._destroy$.next();
    }

    private onGuardRejected$(): void {
        this._router.events.pipe(
            filter((event: Event) => this.routeWasRejected(event)),
            switchMap(() => this.authService.isAuth$()),
            takeUntil(this._destroy$),
        ).subscribe((isAuth: boolean) => {
            this._router.navigateByUrl(isAuth ? pageRoutes.MAIN : pageRoutes.LOGIN);
        });
    }

    private routeWasRejected(event: Event): boolean {
        return event instanceof NavigationCancel &&
            event.code === NavigationCancellationCode.GuardRejected
    }
}
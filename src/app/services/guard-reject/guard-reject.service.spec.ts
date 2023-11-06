import { TestBed } from "@angular/core/testing";
import { NavigationCancel, NavigationCancellationCode, NavigationError, NavigationStart, Router } from "@angular/router";
import { TestScheduler } from "rxjs/testing";
import { AUTH_SERVICE_TOKEN, AuthService } from "src/app/authorize/services/auth.service";
import { instance, mock, when } from "ts-mockito";
import { GuardRejectService } from "./guard-reject.service";
import { of } from "rxjs";
import { pageRoutes } from "src/app/app-routing.module";

describe('Guard reject service', () => {
    const routerMock = mock(Router);
    const authMock = mock(AuthService);

    let guardRejectService: GuardRejectService;
    let testScheduler: TestScheduler;

    beforeEach(() => {
        testScheduler = new TestScheduler((acutal, expected) => {
            expect(acutal).toEqual(expected);
        })

        TestBed.configureTestingModule({
            providers: [
                { provide: Router, useFactory: () => instance(routerMock) },
                { provide: AUTH_SERVICE_TOKEN, useFactory: () => instance(authMock)},
                GuardRejectService,
            ],
          });

        guardRejectService = TestBed.inject(GuardRejectService);
    })

    it('should must have active subscription after initialize', () => {
        testScheduler.run(({ hot, expectSubscriptions }) => {
            const satisfactoryEvent = new NavigationCancel(1, "", "", NavigationCancellationCode.GuardRejected);
            const events$ = hot('--a', {a: satisfactoryEvent});
            const auth$ = hot('a', { a: true });

            when(routerMock.events).thenReturn(events$);
            when(authMock.isAuth$).thenReturn(() => auth$);

            const expected = '^--'

            guardRejectService.initialize();

            expectSubscriptions(events$.subscriptions).toBe(expected)
        });
    })

    it('should must have not active subscription after deactivate', () => {
        testScheduler.run(({ hot, expectSubscriptions }) => {
            const satisfactoryEvent = new NavigationCancel(1, "", "", NavigationCancellationCode.GuardRejected);
            const events$ = hot('--a', {a: satisfactoryEvent});
            const auth$ = hot('-a', { a: true });

            when(routerMock.events).thenReturn(events$);
            when(authMock.isAuth$).thenReturn(() => auth$);

            const expected = '(^!)'

            guardRejectService.initialize();
            guardRejectService.deactivate();

            expectSubscriptions(events$.subscriptions).toBe(expected)
        });
    })

    describe('should', () => {
        const satisfactoryEvent = new NavigationCancel(1, "", "", NavigationCancellationCode.GuardRejected);
        const unsatisfactoryCodeEvent = new NavigationCancel(2, "", "", NavigationCancellationCode.Redirect);
        const unsatisfactoryTypeEvent = new NavigationStart(3, "");

        const authMock = jasmine.createSpyObj('AuthService', { 'isAuth$': of(true) });

        it('process only navigation type NavigationCancel and code GuardRejected', (done) => {
            const routerMock = jasmine.createSpyObj('Router', ['navigateByUrl'], { 'events': of(satisfactoryEvent) })
            const guardRejectService = new GuardRejectService(authMock, routerMock);

            guardRejectService.initialize();
    
            expect(routerMock.navigateByUrl).toHaveBeenCalled()
            done();
        })

        it('not process navigation is event NavigationCancel and is not code noGuardRejected', (done) => {
            const routerMock = jasmine.createSpyObj('Router', ['navigateByUrl'], { 'events': of(unsatisfactoryCodeEvent) });
            const guardRejectService = new GuardRejectService(authMock, routerMock);

            guardRejectService.initialize();
    
            expect(routerMock.navigateByUrl).not.toHaveBeenCalled()
            done();
        })

        it('not process navigation is not event NavigationCancel', (done) => {
            const routerMock = jasmine.createSpyObj('Router', ['navigateByUrl'], { 'events': of(unsatisfactoryTypeEvent) });
            const guardRejectService = new GuardRejectService(authMock, routerMock);

            guardRejectService.initialize();
    
            expect(routerMock.navigateByUrl).not.toHaveBeenCalled()
            done();
        })
    })

    describe('should', () => {
        const satisfactoryEvent = new NavigationCancel(1, "", "", NavigationCancellationCode.GuardRejected);
        const routerMock = jasmine.createSpyObj('Router', ['navigateByUrl'], { 'events': of(satisfactoryEvent) });

        it('redirect on MAIN page if user auth is authorized', (done) => {
            const isAuth = true;
            const authMock = jasmine.createSpyObj('AuthService', { 'isAuth$': of(isAuth) });
            
            const guardRejectService = new GuardRejectService(authMock, routerMock);

            guardRejectService.initialize();
    
            expect(routerMock.navigateByUrl).toHaveBeenCalledWith(pageRoutes.MAIN);
            done();
        })

        it('redirect on LOGIN page if user auth is not authorized', (done) => {
            const isAuth = false;
            const authMock = jasmine.createSpyObj('AuthService', { 'isAuth$': of(isAuth) });
            
            const guardRejectService = new GuardRejectService(authMock, routerMock);

            guardRejectService.initialize();
    
            expect(routerMock.navigateByUrl).toHaveBeenCalledWith(pageRoutes.LOGIN);
            done();
        })
        
    })
})
import { TestBed } from "@angular/core/testing";
import { instance, mock, verify, when } from "ts-mockito";
import { AUTH_SERVICE_TOKEN, AuthService } from "../authorize/services/auth.service";
import { Router } from "@angular/router";
import { LoginGuard } from "./login.guard";
import { TestScheduler } from "rxjs/testing";
import { of } from "rxjs";

describe('Test login guard', () => {
    let testScheduler: TestScheduler;

    let authServiceMock: AuthService;
    let routerMock: Router;

    let loginGuardMock: LoginGuard;
    beforeEach(() => {
        authServiceMock = mock(AuthService);
        routerMock = mock(Router);

        testScheduler = new TestScheduler((acutal, expected) => {
            expect(acutal).toEqual(expected);
        })

        TestBed.configureTestingModule({
            providers: [
                { provide: AUTH_SERVICE_TOKEN, useFactory: () => instance(authServiceMock) },
                { provide: Router, useFactory: () => instance(routerMock) },
                LoginGuard,
            ],
          });

        loginGuardMock = TestBed.inject(LoginGuard);
    });

    it('should return success result', () => {
        testScheduler.run(({ cold, expectObservable }) => {
            when(authServiceMock.isAuth$).thenReturn(() => cold('a', {a: true}));

            const expected = 'a';

            expectObservable(loginGuardMock.canActivate()).toBe(expected, {a: false})
        });
    })

    it('should return failure result', () => {
        testScheduler.run(({ cold, expectObservable }) => {
            when(authServiceMock.isAuth$).thenReturn(() => cold('a', {a: false}));

            const expected = 'a';

            expectObservable(loginGuardMock.canActivate()).toBe(expected, {a: true})
        });
    })
})
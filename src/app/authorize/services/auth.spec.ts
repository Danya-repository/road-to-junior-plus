import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from "../../shared/services/local-storage.service";
import { AuthService } from "./auth.service";
import { instance, mock, when } from "ts-mockito"
import { TestScheduler } from 'rxjs/testing';
import { of } from 'rxjs';

describe('Authentificate service test', () => {
    const localStorageServiceMock = mock(LocalStorageService);

    let testScheduler: TestScheduler;

    let authService: AuthService;

    beforeEach(() => {
        testScheduler = new TestScheduler((acutal, expected) => {
            expect(acutal).toEqual(expected);
        })


        TestBed.configureTestingModule({
            providers: [
                { provide: LocalStorageService, useFactory: () => instance(localStorageServiceMock) },
                AuthService,
            ],
          });

        authService = TestBed.inject(AuthService);
    });

    it('Login successed', () => {
        testScheduler.run(({ cold, expectObservable }) => {
            when(localStorageServiceMock.getToken$).thenReturn(() => cold('a', { a: 'admin-password' }));

            // authService.login('admin', 'password')

            const expected = 'z'
            const unsubscribe = '3s !'

            expectObservable(authService.isAuth$(), unsubscribe).toBe(expected, { z: true })
        });
    })

    it('Login failed', () => {
        testScheduler.run(({ cold, expectObservable }) => {
            when(localStorageServiceMock.getToken$).thenReturn(() => cold('a', { a: 'abra-password' }));

            // authService.login('admin', 'password')

            const expected = 'z'
            const unsubscribe = '3s !'

            expectObservable(authService.isAuth$(), unsubscribe).toBe(expected, { z: false })
        });
    })
});
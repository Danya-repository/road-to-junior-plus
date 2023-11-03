import { TestBed } from "@angular/core/testing";
import { TestScheduler } from "rxjs/testing";
import { BackendService } from "../backend/backend.service";
import { anyString, instance, mock, spy, verify, when } from "ts-mockito";
import { USER_TOKEN, UserService } from "./user.service";
import { UserInterface } from "./user.interface";
import { BehaviorSubject, first, of, switchMap, timer } from "rxjs";

describe('User service', () => {
    let backendService: BackendService;

    let testScheduler: TestScheduler;
    let userService: UserService;

    const userId: string = anyString();

    beforeEach(() => {
        backendService = mock(BackendService);


        testScheduler = new TestScheduler((acutal, expected) => {
            expect(acutal).toEqual(expected);
        })

        TestBed.configureTestingModule({
            providers: [
                { provide: BackendService, useFactory: () => instance(backendService) },
                { provide: USER_TOKEN, useClass: UserService },
            ],
          });
        
        userService = TestBed.inject(USER_TOKEN);
    })

    it('Should return list of users', () => {
        testScheduler.run(({ cold, expectObservable }) => {
            when(backendService.getUserList$).thenReturn(() => cold('a', { a: [] }))

            const expected = 'z';
            const unsubscribe = '2s !';

            expectObservable(userService.getUsers$(), unsubscribe).toBe(expected, { z: [] })
        });
    });

    it('Should return one user by userId', () => {
        testScheduler.run(({ cold, expectObservable }) => {
            const expectedUser: UserInterface = { id: '', name: anyString(), email: anyString(), password: anyString() };

            when(backendService.getUser$).thenReturn((id) => cold('a', { a: {...expectedUser, id} }));

            const expected = 'z';

            expectObservable(userService.getUser$(userId)).toBe(expected, { z: {...expectedUser, id: userId} });
        });
    });

    describe('Should delete', () => {

        it('one user by userId', () => {
            testScheduler.run(({ cold, expectObservable }) => {
                when(backendService.deleteUser$).thenReturn(() => cold('a'));
    
                const expected = '(a|)';
    
                expectObservable(userService.deleteUser$(userId)).toBe(expected);
            });
        });

        it('one user with correctly params', (done) => {
            const backendService = jasmine.createSpyObj('BackendService', {'deleteUser$': of(void 0)})

            const userService = new UserService(backendService);

            userService.deleteUser$(userId).subscribe({
                next: () => {
                    expect(backendService.deleteUser$).toHaveBeenCalledWith(userId);
                },
                error: done,
                complete: done,
            })
        });
    })

    it('Should create new user', () => {
        testScheduler.run(({ cold, expectObservable }) => {
            const expectedUser: UserInterface = { id: '', name: anyString(), email: anyString(), password: anyString() };

            when(backendService.createUser$).thenReturn((user: UserInterface) => cold('a', { a: user }));

            const expected = '(z|)';

            expectObservable(userService.createUser$({...expectedUser, id: userId})).toBe(expected, { z: {...expectedUser, id: userId} });
        });
    });

    it('Should edit the user correctly', () => {
        testScheduler.run(({ cold, expectObservable }) => {
            const expectedUser: UserInterface = { id: '', name: anyString(), email: anyString(), password: anyString() };

            when(backendService.editUser$).thenReturn((user: UserInterface) => cold('a', { a: user }));

            const expected = '(z|)';

            expectObservable(userService.editUser$({...expectedUser, id: userId})).toBe(expected, { z: {...expectedUser, id: userId} });
        });
    });
});
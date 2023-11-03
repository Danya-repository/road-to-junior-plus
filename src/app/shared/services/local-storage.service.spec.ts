import { TestBed } from "@angular/core/testing"
import { anyString } from "ts-mockito";
import { LocalStorageService } from "./local-storage.service";

describe('Local storage service', () => {
    let localStorageService: LocalStorageService;
    let tokenValue: string;

    const tokenName = 'AUTH_JWT_TOKEN';

    beforeEach(() => {
        tokenValue = anyString();

        TestBed.configureTestingModule({
            providers: [
                { provide: Storage, useFactory: () => localStorage},
                LocalStorageService,
            ],
        })

        localStorageService = TestBed.inject(LocalStorageService);
    })

    it('Should save token', () => {
        const spy = spyOn(localStorage, 'setItem');

        localStorageService.setToken(tokenValue)

        expect(spy).toHaveBeenCalledWith(tokenName, tokenValue);
    })

    it('Should remove token', () => {
        const spy = spyOn(localStorage, 'removeItem');

        localStorageService.removeToken()

        expect(spy).toHaveBeenCalledWith(tokenName);
    })

    describe('Should return', () => {
        it('token when has token in stroage', (done) => {
            spyOn(localStorage, 'getItem').and.returnValue(tokenValue);
    
            localStorageService.getToken$().subscribe({
                next: (expectedValue) => {
                    expect(expectedValue).toBe(tokenValue);
                },
                error: done,
                complete: done,
            })
        })
    
        it('empty string when has not token in storage', (done) => {
            spyOn(localStorage, 'getItem').and.returnValue(null);
    
            localStorageService.getToken$().subscribe({
                next: (expectedValue) => {
                    expect(expectedValue).toBe('');
                },
                error: done,
                complete: done,
            })
        })
    })
})
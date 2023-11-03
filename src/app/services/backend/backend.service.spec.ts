import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { API_TOKEN, ApiService } from "../api/api.service";
import { BackendService } from "./backend.service";
import { anyString } from "ts-mockito";
import { ApiInterface } from "../api/api.interface";
import { of } from "rxjs";
import { UserInterface } from "../user/user.interface";

describe('Backend service testing', () => {
    let backendService: BackendService;

    let httpClient: HttpClient;
    let apiService: ApiInterface;

    const userId: string = anyString();

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                { provide: HttpClient, useClass: HttpClient },
                { provide: API_TOKEN, useClass: ApiService },
                BackendService,
            ],
        })

        httpClient = TestBed.inject(HttpClient);
        backendService = TestBed.inject(BackendService);
        apiService = TestBed.inject(API_TOKEN);
    });

    it('Should call http client for GET user', (done) => {
        const expectedURL = apiService.USER(userId);

        const http = spyOn(httpClient, 'get').and.returnValue(of({}));

        backendService.getUser$(userId).subscribe({
            next: () => {
                expect(http).toHaveBeenCalledWith(expectedURL);
            },
            error: done,
            complete: done,
        });
    })

    it('Should call http client for GET list of users', (done) => {
        const expectedURL = apiService.USER_LIST();

        const http = spyOn(httpClient, 'get').and.returnValue(of({}));

        backendService.getUserList$().subscribe({
            next: () => {
                expect(http).toHaveBeenCalledWith(expectedURL);
            },
            error: done,
            complete: done,
        });
    })

    it('Should call http client for CREATE new user', (done) => {
        const expectedURL = apiService.CREATE_USER();
        const expectedUser: Partial<UserInterface> = { id: userId };

        const http = spyOn(httpClient, 'post').and.returnValue(of({}));

        backendService.createUser$(expectedUser).subscribe({
            next: () => {
                expect(http).toHaveBeenCalledWith(expectedURL, expectedUser);
            },
            error: done,
            complete: done,
        });
    })

    it('Should call http client for DELETE user', (done) => {
        const expectedURL = apiService.DELETE_USER(userId);

        const http = spyOn(httpClient, 'delete').and.returnValue(of({}));

        backendService.deleteUser$(userId).subscribe({
            next: () => {
                expect(http).toHaveBeenCalledWith(expectedURL);
            },
            error: done,
            complete: done,
        });
    })

    it('Should call http client for EDIT user', (done) => {
        const expectedURL = apiService.UPDATE_USER(userId);
        const expectedUser: UserInterface = { id: userId, name: anyString(), email: anyString(), password: anyString() };

        const http = spyOn(httpClient, 'patch').and.returnValue(of({}));

        backendService.editUser$(expectedUser).subscribe({
            next: () => {
                expect(http).toHaveBeenCalledWith(expectedURL, expectedUser);
            },
            error: done,
            complete: done,
        });
    })
});
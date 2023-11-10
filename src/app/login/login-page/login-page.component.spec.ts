import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing"
import { LoginPageComponent } from "./login-page.component"
import { FormsModule } from "@angular/forms";
import { AUTH_SERVICE_TOKEN } from "src/app/authorize/services/auth.service";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

const mockAccount = {
    login: 'Gena',
    password: 'Genapassword',
}

describe('Login page', () => {
    let fixture: ComponentFixture<LoginPageComponent>;
    let component: LoginPageComponent;

    const authService = jasmine.createSpyObj(['login']);

    const getElementsByCss = function (selector: string): DebugElement {
        return fixture.debugElement.query(By.css(selector));
    }

    const loginSelector = '.login__form-input-name';
    const passwordSelector = '.login__form-input-password';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [LoginPageComponent],
            providers: [
                { provide: AUTH_SERVICE_TOKEN, useValue: authService },
            ]
        }).compileComponents();
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginPageComponent);
        component = fixture.componentInstance;
    });

    it(`Should have empty fields after initialize component`, fakeAsync(() => {
        fixture.detectChanges();
        tick();

        expect(getElementsByCss(loginSelector).nativeElement.value).toBe('');
        expect(getElementsByCss(passwordSelector).nativeElement.value).toBe('');
    }));

    it(`Should call login method of authentificate service with
        data from template`, fakeAsync(() => {
        fixture.detectChanges();
        tick();

        const loginField = getElementsByCss(loginSelector).nativeElement;
        const passwordField = getElementsByCss(passwordSelector).nativeElement;

        loginField.value = mockAccount.login;
        passwordField.value = mockAccount.password;

        loginField.dispatchEvent(new Event('input'));
        passwordField.dispatchEvent(new Event('input'));

        component.login();
        
        expect(authService.login).toHaveBeenCalledWith(mockAccount.login, mockAccount.password)
    }))
})
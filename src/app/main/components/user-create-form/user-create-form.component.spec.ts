import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing"
import { UserCreateFormComponent } from "./user-create-form.component"
import { EMPTY, of } from "rxjs";
import { FormsModule } from "@angular/forms";
import { USER_TOKEN } from "src/app/services/user/user.service";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

const mockUser = {
    name: 'Gena',
    email: 'Gena@mail.com',
    password: 'Genapassword',
}

describe('User create form component', () => {
    let fixture: ComponentFixture<UserCreateFormComponent>;
    let component: UserCreateFormComponent;

    const userService = jasmine.createSpyObj({'createUser$': of(EMPTY)});

    const getElementByCss = function(selector: string): DebugElement {
        return fixture.debugElement.query(By.css(selector));
    }

    const nameSelector = '.user-form__input-name';
    const emailSelector = '.user-form__input-email';
    const passwordSelector = '.user-form__input-password';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [UserCreateFormComponent],
            providers: [
                { provide: USER_TOKEN, useValue: userService },
            ],
        }).compileComponents();
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(UserCreateFormComponent);
        component = fixture.componentInstance;

        userService.createUser$.calls.reset();
    })

    it('Should contain empty fields after initialize', fakeAsync(() => {
        fixture.detectChanges();
        tick();

        expect(getElementByCss(nameSelector).nativeElement.value).toBe('');
        expect(getElementByCss(emailSelector).nativeElement.value).toBe('');
        expect(getElementByCss(passwordSelector).nativeElement.value).toBe('');
    }));

    it(`Should call create user method of user service
        with data from form when use on submit event`, fakeAsync(() => {
        const nameField = getElementByCss(nameSelector).nativeElement;
        const emailField = getElementByCss(emailSelector).nativeElement;
        const passwordField = getElementByCss(passwordSelector).nativeElement;
        
        fixture.detectChanges();
        tick();

        nameField.value = mockUser.name;
        emailField.value = mockUser.email;
        passwordField.value = mockUser.password;

        nameField.dispatchEvent(new Event('input'));
        emailField.dispatchEvent(new Event('input'));
        passwordField.dispatchEvent(new Event('input'));

        component.onSubmit();

        expect(userService.createUser$).toHaveBeenCalledOnceWith({
            ...mockUser,
        })
    }));

    it('Should emit event in update list stream when use on submit event', fakeAsync(() => {
        fixture.detectChanges();
        tick();

        const spy = spyOn(component.updateList, 'emit');

        component.onSubmit();

        expect(spy).toHaveBeenCalled();
    }))

    it('Should reset form to default empty value when use on submit event', fakeAsync(() => {
        const nameField = getElementByCss(nameSelector).nativeElement;
        const emailField = getElementByCss(emailSelector).nativeElement;
        const passwordField = getElementByCss(passwordSelector).nativeElement;
        
        fixture.detectChanges();
        tick();

        nameField.value = mockUser.name;
        emailField.value = mockUser.email;
        passwordField.value = mockUser.password;

        nameField.dispatchEvent(new Event('input'));
        emailField.dispatchEvent(new Event('input'));
        passwordField.dispatchEvent(new Event('input'));

        const spy = spyOn(component.form, 'reset').and.callThrough();

        component.onSubmit();

        expect(spy).toHaveBeenCalled();
        expect(nameField.value).toBe('');
        expect(emailField.value).toBe('');
        expect(passwordField.value).toBe('');
    }))
})
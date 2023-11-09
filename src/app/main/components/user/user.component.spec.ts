import { ComponentFixture, TestBed } from "@angular/core/testing";
import { UserComponent } from "./user.component";
import { USER_TOKEN } from "src/app/services/user/user.service";
import { UserInterface } from "src/app/services/user/user.interface";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { EMPTY, of } from "rxjs";
import { anyString } from "ts-mockito";

const mockUser: UserInterface = {
    id: "1",
    name: "Steve",
    email: "Steve@mail.com",
    password: "password",
}

describe('User component', () => {
    let fixture: ComponentFixture<UserComponent>;
    let component: UserComponent;

    const userService = jasmine.createSpyObj({
        'editUser$': of(EMPTY),
        'deleteUser$': of(EMPTY),
    });

    const getElementByCss = function (selector: string): DebugElement {
        return fixture.debugElement.query(By.css(selector));
    }

    const nameSelector = '.user__name';
    const emailSelector = '.user__email';
    const passwordSelector = '.user__password';

    const editButton = '.user__button-edit';
    const deleteButton = '.user__button-delete';
    const saveChangesButton = '.user__button-save';
    const discardChangesButton = '.user__button-reset';

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [UserComponent],
            imports: [ReactiveFormsModule],
            providers: [
                { provide: USER_TOKEN, useValue: userService }
            ],
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(UserComponent);
        component = fixture.componentInstance;

        component.user = mockUser;
        component.ngOnInit();

        fixture.detectChanges();
    })

    it('Should render is correct user after init component', () => {
        const { name, email, password } = mockUser;

        expect(getElementByCss(nameSelector)?.nativeElement.value).toBe(name);
        expect(getElementByCss(emailSelector)?.nativeElement.value).toBe(email);
        expect(getElementByCss(passwordSelector)?.nativeElement.value).toBe(password);
    })

    it('Should have not active form after init component', () => {
        expect(component.form.enabled).toBeFalse()
    })

    it(`Should have default delete and edit buttons,
        but have not save and discard buttons after init`, () => {
        expect(getElementByCss(editButton)).toBeTruthy();
        expect(getElementByCss(deleteButton)).toBeTruthy();
        expect(getElementByCss(saveChangesButton)).toBeFalsy();
        expect(getElementByCss(discardChangesButton)).toBeFalsy();
    })

    it('Should have active form after click on edit button', () => {
        component.onEdit();

        expect(component.form.enabled).toBeTrue();
    })

    it(`Should have not delete and edit buttons,
        but have save and discard buttons after click on edit button`, () => {
        component.onEdit();

        fixture.detectChanges();

        expect(getElementByCss(editButton)).toBeFalsy();
        expect(getElementByCss(deleteButton)).toBeFalsy();
        expect(getElementByCss(saveChangesButton)).toBeTruthy();
        expect(getElementByCss(discardChangesButton)).toBeTruthy();
    })

    it('Should change form from enable to disable and call editUser method of user service', () => {
        component.onEdit();

        expect(component.form.enabled).toBeTrue();

        component.onSave();

        expect(userService.editUser$).toHaveBeenCalledWith(mockUser);
        expect(component.form.enabled).toBeFalse();
    })

    it(`Should call deleteUser method of user service and emit update list event
        after click on delete button`, () => {
        const spy = spyOn(component.updateList, 'next');

        component.onDelete();
        expect(userService.deleteUser$).toHaveBeenCalledWith(mockUser.id);
        expect(spy).toHaveBeenCalledTimes(1);
    })

    it('Should send change data of user after edit', () => {
        component.onEdit();

        const nameInput = getElementByCss(nameSelector).nativeElement;
        const emailInput = getElementByCss(emailSelector).nativeElement;
        const passwordInput = getElementByCss(passwordSelector).nativeElement;

        nameInput.value = 'Gena';
        emailInput.value = 'Gena@mail.com';
        passwordInput.value = 'Genapassword';

        nameInput.dispatchEvent(new Event('input'));
        emailInput.dispatchEvent(new Event('input'))
        passwordInput.dispatchEvent(new Event('input'))
        
        component.onSave();

        expect(userService.editUser$).toHaveBeenCalledWith({
            id: mockUser.id,
            name: 'Gena',
            email: 'Gena@mail.com',
            password: 'Genapassword'
        })
    })

    it('Should reset user data to default state after click on reset button', () => {
        component.onEdit();

        expect(component.form.enabled).toBeTrue();

        const nameInput = getElementByCss(nameSelector).nativeElement;
        const emailInput = getElementByCss(emailSelector).nativeElement;
        const passwordInput = getElementByCss(passwordSelector).nativeElement;

        nameInput.value = 'Gena';
        emailInput.value = 'Gena@mail.com';
        passwordInput.value = 'Genapassword';

        nameInput.dispatchEvent(new Event('input'));
        emailInput.dispatchEvent(new Event('input'));
        passwordInput.dispatchEvent(new Event('input'));
        
        expect(nameInput.value).toBe('Gena');
        expect(emailInput.value).toBe('Gena@mail.com');
        expect(passwordInput.value).toBe('Genapassword');

        component.onReset();

        expect(nameInput.value).toBe(mockUser.name);
        expect(emailInput.value).toBe(mockUser.email);
        expect(passwordInput.value).toBe(mockUser.password);

        expect(component.form.enabled).toBeFalse();
    })

    it('Should has invalid form  if inputs is empty', () => {
        component.onEdit();

        const nameInput = getElementByCss(nameSelector).nativeElement;
        const emailInput = getElementByCss(emailSelector).nativeElement;
        const passwordInput = getElementByCss(passwordSelector).nativeElement;

        nameInput.value = '';
        emailInput.value = '';
        passwordInput.value = '';

        nameInput.dispatchEvent(new Event('input'));
        emailInput.dispatchEvent(new Event('input'));
        passwordInput.dispatchEvent(new Event('input'));
        
        expect(component.form.controls['username'].valid).toBeFalse();
        expect(component.form.controls['email'].valid).toBeFalse();
        expect(component.form.controls['password'].valid).toBeFalse();
    })

    it('Should has valid form controls if inputs is not empty', () => {
        component.onEdit();

        const nameInput = getElementByCss(nameSelector).nativeElement;
        const emailInput = getElementByCss(emailSelector).nativeElement;
        const passwordInput = getElementByCss(passwordSelector).nativeElement;

        nameInput.value = anyString();
        emailInput.value = anyString();
        passwordInput.value = anyString();

        nameInput.dispatchEvent(new Event('input'));
        emailInput.dispatchEvent(new Event('input'));
        passwordInput.dispatchEvent(new Event('input'));
        
        expect(component.form.controls['username'].valid).toBeTrue();
        expect(component.form.controls['email'].valid).toBeTrue();
        expect(component.form.controls['password'].valid).toBeTrue();
    })
})
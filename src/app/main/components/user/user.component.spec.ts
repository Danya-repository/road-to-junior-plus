import { ComponentFixture, TestBed } from "@angular/core/testing";
import { UserComponent } from "./user.component";
import { USER_TOKEN } from "src/app/services/user/user.service";
import { UserInterface } from "src/app/services/user/user.interface";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { EMPTY, of } from "rxjs";

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

    const getElementByCss = function (selector: string): DebugElement | null {
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
    })

    it('Should render is correct user after init component', () => {
        const { name, email, password } = mockUser;
        fixture.detectChanges();

        expect(getElementByCss(nameSelector)?.nativeElement.value).toBe(name);
        expect(getElementByCss(emailSelector)?.nativeElement.value).toBe(email);
        expect(getElementByCss(passwordSelector)?.nativeElement.value).toBe(password);
    })

    it('Should have not active form after init component', () => {
        fixture.detectChanges();

        expect(component.form.enabled).toBeFalse()
    })

    it(`Should have default delete and edit buttons,
        but have not save and discard buttons after init`, () => {
        fixture.detectChanges();

        expect(getElementByCss(editButton)).toBeTruthy();
        expect(getElementByCss(deleteButton)).toBeTruthy();
        expect(getElementByCss(saveChangesButton)).toBeFalsy();
        expect(getElementByCss(discardChangesButton)).toBeFalsy();
    })

    it('Should have active form after click on edit button', () => {
        fixture.detectChanges();

        component.onEdit();

        expect(component.form.enabled).toBeTrue();
    })

    it(`Should have not delete and edit buttons,
        but have save and discard buttons after click on edit button`, () => {
        fixture.detectChanges();

        component.onEdit();

        fixture.detectChanges();

        expect(getElementByCss(editButton)).toBeFalsy();
        expect(getElementByCss(deleteButton)).toBeFalsy();
        expect(getElementByCss(saveChangesButton)).toBeTruthy();
        expect(getElementByCss(discardChangesButton)).toBeTruthy();
    })

    it('Should change form from enable to disable and call editUser method of user service', () => {
        fixture.detectChanges();

        component.onEdit();

        expect(component.form.enabled).toBeTrue();

        component.onSave();

        expect(userService.editUser$).toHaveBeenCalledWith(mockUser);
        expect(component.form.enabled).toBeFalse();
    })

    it('Should reset form and disable form after click on reset button', () => {
        // TODO доделать проверку формы на заполнение после просмотра видео о тестировании форм

        fixture.detectChanges();

        component.onEdit();

        expect(component.form.enabled).toBeTrue();

        component.onReset();

        expect(component.form.enabled).toBeFalse();
    })

    it(`Should call deleteUser method of user service and emit update list event
        after click on delete button`, () => {
        fixture.detectChanges();

        const spy = spyOn(component.updateList, 'next');

        component.onDelete();
        expect(userService.deleteUser$).toHaveBeenCalledWith(mockUser.id);
        expect(spy).toHaveBeenCalledTimes(1);
    })

    // it('Should can edit data of user' () => {})

    // it('Should emit update list event when user was update' () => {})

})
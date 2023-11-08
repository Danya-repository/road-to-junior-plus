import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BaseLayoutComponent } from "./base-layout.component";
import { USER_TOKEN } from "src/app/services/user/user.service";
import { of } from "rxjs";
import { UserInterface } from "src/app/services/user/user.interface";
import { By } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

const usersMockList: UserInterface[] = [
    {
        id: "1",
        name: "John",
        email: "John@mail.ru",
        password: "password"
    }
]

describe('Base layout', () => {
    let fixture: ComponentFixture<BaseLayoutComponent>;
    let component: BaseLayoutComponent;

    const userService = jasmine.createSpyObj(['getUsers$']);

    const getElementByCss = function(selector: string) {
        return fixture.debugElement.query(By.css(selector));
    }

    const resetFixture = function() {
        fixture = TestBed.createComponent(BaseLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }
    
    const listElement = '.base-layout__list';
    const emptyPlugElement = '.base-layout__empty-list';
    const errorDownloadElement = '.base-layout__error-download';

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [BaseLayoutComponent],
            imports: [CommonModule],
            providers: [
                { provide: USER_TOKEN, useValue: userService },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    })

    beforeEach(() => {
        userService.getUsers$.calls.reset()
    })

    it('should render list if users service return users', () => {
        userService.getUsers$.and.returnValue(of([...usersMockList]))

        resetFixture();

        expect(getElementByCss(listElement)).toBeTruthy();
        expect(getElementByCss(emptyPlugElement)).toBeFalsy();
        expect(getElementByCss(errorDownloadElement)).toBeFalsy();
    });

    it('should render empty list plug when user service return empty list', () => {
        userService.getUsers$.and.returnValue(of([]))

        resetFixture();

        expect(getElementByCss(emptyPlugElement)).toBeTruthy();
        expect(getElementByCss(listElement)).toBeFalsy();
        expect(getElementByCss(errorDownloadElement)).toBeFalsy();
    });

    it('should render error download element when user service return error', () => {
        userService.getUsers$.and.returnValue(of())

        resetFixture();

        expect(getElementByCss(errorDownloadElement)).toBeTruthy();
        expect(getElementByCss(listElement)).toBeFalsy();
        expect(getElementByCss(emptyPlugElement)).toBeFalsy();
    });

    it('should recall user service getUsers$ method when happen onUpdateList event', () => {
        userService.getUsers$.and.returnValue(of([]));

        resetFixture();

        expect(userService.getUsers$).toHaveBeenCalledTimes(1)

        component.onUpdateList();
        fixture.detectChanges();

        expect(userService.getUsers$).toHaveBeenCalledTimes(2)
    });
})
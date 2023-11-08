import { ComponentFixture, TestBed } from "@angular/core/testing"
import { UserListComponent } from "./user-list.component"
import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { UserInterface } from "src/app/services/user/user.interface";
import { By } from "@angular/platform-browser";

const usersMockList: UserInterface[] = [
    {
        id: "1",
        name: "John",
        email: "John@mail.ru",
        password: "password"
    },
    {
        id: "2",
        name: "Peter",
        email: "peter@mail.ru",
        password: "password"
    },
    {
        id: "3",
        name: "Antonio",
        email: "antonio@mail.ru",
        password: "password"
    },
]

describe('User list component', () => {
    let fixture: ComponentFixture<UserListComponent>
    let component: UserListComponent;

    const getElementsByCss = function(selector: string) {
        return fixture.debugElement.queryAll(By.css(selector));
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [UserListComponent],
            providers: [],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(UserListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('Should not render users if user list is empty', () => {
        component.users = [];

        fixture.detectChanges();

        const result = getElementsByCss('.user-list__user')
        console.log(result);
        
        expect(result.length).toBe(0)
    })

    it('Should render list of users equal length array', () => {
        component.users = [...usersMockList];

        fixture.detectChanges();

        const result = getElementsByCss('.user-list__user')
        console.log(result);
        
        expect(result.length).toBe(3)
    })
})
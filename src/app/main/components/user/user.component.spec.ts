import { ComponentFixture, TestBed } from "@angular/core/testing";
import { UserComponent } from "./user.component";
import { USER_TOKEN } from "src/app/services/user/user.service";

describe('User component', () => {
    let fixture: ComponentFixture<UserComponent>;
    let component: UserComponent;

    const userService = jasmine.createSpyObj(['getUsers$']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [UserComponent],
            providers: [
                { provide: USER_TOKEN, useValue: userService }
            ],
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(UserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('Should render is correct user', () => {
        // component.user = 

    })

    // it('Should can delete user' () => {})

    // it('Should can edit data of user' () => {})

    // it('Should emit update list event when user was update' () => {})

})
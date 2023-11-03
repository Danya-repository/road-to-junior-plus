import { ApiService } from "./api.service"

describe('Api endpoints test', () => {
    let apiServiceMock: ApiService;

    beforeEach(() => {
        apiServiceMock = new ApiService();
    })

    it('Should return MAIN_URL value', () => {
        const expected = 'http://localhost:8000';

        expect(apiServiceMock.MAIN).toBe(expected);
    })

    it('Should return CREATE_USER value', () => {
        const expected = 'http://localhost:8000/api/user/';

        expect(apiServiceMock.CREATE_USER()).toBe(expected);
    })

    it('Should return DELETE_USER value', () => {
        const anyUserId = '1234';
        const expected = `http://localhost:8000/api/user/${anyUserId}`;

        expect(apiServiceMock.DELETE_USER(anyUserId)).toBe(expected);
    })

    it('Should return UPDATE_USER value', () => {
        const anyUserId = '1234';
        const expected = `http://localhost:8000/api/user/${anyUserId}`;

        expect(apiServiceMock.UPDATE_USER(anyUserId)).toBe(expected);
    })

    it('Should return USER value', () => {
        const anyUserId = '1234';
        const expected = `http://localhost:8000/api/user/${anyUserId}`;

        expect(apiServiceMock.USER(anyUserId)).toBe(expected);
    })

    it('Should return USER_LIST value', () => {
        const expected = `http://localhost:8000/api/users`;

        expect(apiServiceMock.USER_LIST()).toBe(expected);
    })
})
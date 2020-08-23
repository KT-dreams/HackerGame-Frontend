import ApiService from 'ApiService';
import UserActionController from 'UserActionController';

let mockLoginStepFirstResponse = {
    'data': '',
    'dataRequest': {
        'requestUuid': 'a-b-c-d-e',
        'commandPrefix': 'Password for MKathy: ',
        'type': 'password'
    }
};

let mockLoginStepPasswordResponse = {
    'data': 'Welcome, MKathy!'
};

jest.mock('ApiService', () => {
    return {
        __esModule: true,
        default: jest.fn(() => ({
            send: jest.fn(() => new Promise(() => {
                return mockLoginStepFirstResponse
            }))
        }))
    }
});
jest.mock('ConsoleView', () => () => 'test test');
let userActionController = new UserActionController();

describe('UserActionController', () => {
    describe('login', () => {
        it('loginStepSendUsername', () => {
            // jest.mock('ApiService');
            // ApiService.send = jest.fn();
            // ApiService.send.mockImplementationOnce(() => new Promise(() => {
            //     return loginStepFirstResponse
            // })).mockImplementationOnce(() => Promise.resolve(loginStepPasswordResponse));

            userActionController.loginStepSendUsername('MKathy').then((res) => {
                expect(ApiService.send).toBeCalled();
                expect(res).toStrictEqual(loginStepFirstResponse);
            }).catch((err) => fail(err));
        });

        it('valid test', () => {
            // userActionController.login('MKathy').then((res) => {
            //     expect(ApiService.send.mock.calls.length).toBe(1);
            //     expect(res).toBe(loginStepFirstResponse);
            // }).then((res) => {
            //     expect(ApiService.send.mock.calls.length).toBe(2);
            //     expect(res).toBe(loginStepPasswordResponse);
            // }).catch((err) => console.log(err))
        });
    });
});
import ApiService from 'ApiService';
import UserActionController from 'UserActionController';

let userActionController = new UserActionController();

jest.mock('ConsoleView');
jest.mock('ApiService');
ApiService.send = jest.fn();


describe('UserActionController', () => {
    describe('login', () => {
        let loginStepFirstResponse = {
            'data': '',
            'dataRequest': {
                'requestUuid': 'a-b-c-d-e',
                'commandPrefix': 'Password for MKathy: ',
                'type': 'password'
            }
        };

        let loginStepPasswordResponse = {
            'data': 'Welcome, MKathy!'
        };

        ApiService.send.mockImplementationOnce(() => Promise.resolve(
            loginStepFirstResponse
        )).mockImplementationOnce(() => Promise.resolve(loginStepPasswordResponse));

        it('valid test', () => {
            userActionController.login('MKathy').then((res) => {
                expect(ApiService.send.mock.calls.length).toBe(1);
                expect(res).toBe(loginStepFirstResponse);
            }).then((res) => {
                expect(ApiService.send.mock.calls.length).toBe(2);
                expect(res).toBe(loginStepPasswordResponse);
            })
        });
    });
});
import ApiService from './ApiService.js';
import ConsoleView from './ConsoleView.js';

export default class UserActionController {
    constructor() {
        this.consoleView = new ConsoleView(this);
        this.apiService = new ApiService;
    }
    
    login = async (username) => {
        this.apiService.send('login', 'POST', {'username': username})
            .then(async (res) => {
                let passwordRequest;
                this.consoleView.prepareRequest(res['messageOptions']);
                let response = await new Promise((resolve, reject) => {
                    passwordRequest = (event) => {
                        if (!this.consoleView.isEnterPressed(event)) {
                            resolve({
                                "password": this.consoleView.data.value,
                                "request_uuid": res["messageOptions"]["request_uuid"]
                            });
                        }
                    };
                    this.consoleView.data.addEventListener('keypress', passwordRequest);
                });
                this.consoleView.data.removeEventListener('keypress', passwordRequest);
                this.consoleView.setUserInputDefaults();
                return response;
            })
            .then((res) => this.apiService.send('login', 'POST', res))
    }
}
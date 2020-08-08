import ApiService from './ApiService.js';
import ConsoleView from './ConsoleView.js';

export default class UserActionController {
    constructor() {
        this.consoleView = new ConsoleView(this);
        //this.consoleView.setUserActionController(this)
        this.apiService = new ApiService;
    }
    
    login = async (username) => {
        this.apiService.send('login', 'POST', username)
            .then((res) => this.consoleView.passwordRequest(res['messageOptions']['info']))
            .then((password) => console.log(password))
    }
}
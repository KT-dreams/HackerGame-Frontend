export default class ApiService {
    BACKEND_API_URL = "http://127.0.0.1:8000/";
    
    async send(endpoint, method, params) {
//        headers = new Headers();
//        headers.append("Content-Type", "application/json")
        let response = await fetch(this.BACKEND_API_URL + endpoint, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        });
        
        return response.json();
    }
}
import axios from 'axios';

// ตั้งค่า Base URL
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

axios.defaults.headers.post['Content-Type'] = 'application/json';

// สร้าง baseUrl โดยใช้ environment variable
const baseUrl = `${window.location.protocol}//localhost:${process.env.VUE_APP_PORT}`;

class Spectator {
    async getSpectator(queryString = ''){
        try {
            const response = await axios.get(baseUrl + '/spectator' + queryString);
            return response;
        } catch (err) {
            return err.response;
        }
    }
    async register(data){
        try {
            const response = await axios.post(baseUrl + '/spectator/register', data);
            return response;
        } catch (err) {
            return err.response;
        }
    }
    async updateSpectator(id, data){
        try {
            const response = await axios.put(baseUrl + '/spectator/' + id , data);
            return response;
        } catch (err) {
            return err.response;
        }
    }
}
class Convocation {
    async getConvocation(queryString = ''){
        try {
            const response = await axios.get(baseUrl + '/convocation' + queryString);
            return response;
        } catch (err) {
            return err.response;
        }
    }

}
class Reservation {
    async getReserved(queryString = ''){
        try {
            const response = await axios.get(baseUrl + '/reservation' + queryString);
            return response;
        } catch (err) {
            return err.response;
        }
    }
    async addReserved(data){
        let token = localStorage.getItem('user-token');
        let config = {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        };
        try {
            const response = await axios.post(baseUrl + '/reservation' , data, config);
            return response;
        } catch (err) {
            return err.response;
        }
    }
}
class User {
    async login(data){
        try {
            const response = await axios.post(baseUrl + '/user/login', data);
            
            if (response.data.token) {
                localStorage.setItem('user-token', response.data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            }

            return response;
        } catch (err) {
            return err.response;
        }
    }
    logout() {
        localStorage.removeItem('user-token');
    }

    getToken() {
        return localStorage.getItem('user-token');
    }

    isLoggedIn() {
        return !!this.getToken();
    }

    setAuthorizationHeader() {
        const token = this.getToken();
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }
}

export default {
    Spectator: new Spectator(),
    Convocation: new Convocation(),
    Reservation: new Reservation(),
    User: new User()
}

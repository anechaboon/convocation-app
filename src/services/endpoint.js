import axios from 'axios';

// ตั้งค่า Base URL
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

// กำหนด Headers แบบ global
axios.defaults.headers.common['Authorization'] = 'Bearer your_token_here';
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
        try {
            const response = await axios.post(baseUrl + '/reservation' , data);
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
            return response;
        } catch (err) {
            return err.response;
        }
    }
}

export default {
    Spectator: new Spectator(),
    Convocation: new Convocation(),
    Reservation: new Reservation(),
    User: new User()
}

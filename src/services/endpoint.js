import axios from 'axios';

// ตั้งค่า Base URL
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

// กำหนด Headers แบบ global
axios.defaults.headers.common['Authorization'] = 'Bearer your_token_here';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// สร้าง baseUrl โดยใช้ environment variable
const baseUrl = `${window.location.protocol}//localhost:${process.env.VUE_APP_PORT}`;

class User {
    async getUser(queryString = ''){
        try {
            const response = await axios.get(baseUrl + '/users' + queryString);
            return response;
        } catch (err) {
            return err.response;
        }
    }
    async register(data){
        try {
            const response = await axios.post(baseUrl + '/users/register', data);
            return response;
        } catch (err) {
            return err.response;
        }
    }
    async updateUser(id, data){
        try {
            const response = await axios.put(baseUrl + '/users/' + id , data);
            return response;
        } catch (err) {
            return err.response;
        }
    }
}

class Convocation {
    async getConvocation(queryString = ''){
        try {
            console.log(`🚀 log:getConvocation`, )
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

export default {
    User: new User(),
    Convocation: new Convocation(),
    Reservation: new Reservation(),
}

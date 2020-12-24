import axios from 'axios'
import jwt_decode from "jwt-decode";
import authHeader from "./AuthHeader";

const REST_API_URL = 'http://localhost:8080';
const SING_IN_ENDPOINT='/authenticate';
const REGISTER_USER_ENDPOINT='/registerUser';
const REGISTER_ADMIN_ENDPOINT='/registerAdmin';

class AuthService {

    async login(username, password) {
        this.logout();

        return await axios
            .post(REST_API_URL + SING_IN_ENDPOINT, {
                username,
                password
            })
            .then(response => {
                if (response.data.jwt) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response;
            })
            .catch(error=>{
                return error.response;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password, role) {
        if(role=="ADMIN")
            return axios.post(REST_API_URL + REGISTER_ADMIN_ENDPOINT, {
                username,
                email,
                password
            }, { headers: authHeader()});
        else return axios.post(REST_API_URL + REGISTER_USER_ENDPOINT, {
            username,
            email,
            password
        });
    }


    getCurrentUser() {
        let user= JSON.parse(localStorage.getItem('user'));
        if(user==null)
            return null;

        let token=user.jwt;

        let decoded=jwt_decode(token);

        if(Date.now() >=decoded.exp*1000){
            this.logout();
            return null;
        }

        return user;
    }


}

export default new AuthService();
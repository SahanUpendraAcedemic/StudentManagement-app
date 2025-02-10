import httpService from "./httpService";
import { URL } from "../config/const";

class UserService extends httpService {  
    async reqLogin(data) {
        const config = {
            method: 'POST',
            url: URL.USER_LOGIN,
            data: data
        };
        return this.sendRequest(config);
    }

    async reqSignup(data) {
        const config = {
            method: 'POST',
            url: URL.USER_SIGNUP,
            data: data
        };
        return this.sendRequest(config);
    }
}

const userService = new UserService();
export default userService;

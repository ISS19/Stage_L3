import axios from "axios";

const AUTH_API = "http://127.0.0.1:5000/auth/api/";

class AuthService {
  register(user: {}) {
    return axios.post(AUTH_API + "/register", user);
  }

  signin(user: {}){
    return axios.post(AUTH_API + "/login", user);
  }
}

export default new AuthService();

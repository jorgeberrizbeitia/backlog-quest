import axios from "axios";

// service for all authenticator axios calls
class Auth {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true
    });
  }

  signup({ username, password, platforms, consoles }) {
    return this.auth
      .post("/auth/signup", { username, password, platforms })
      .then(({ data }) => data);
  }

  login({ username, password }) {
    return this.auth
      .post("/auth/login", { username, password })
      .then(({ data }) => data)
  }

  logout() {
    return this.auth.post("/auth/logout", {}).then(({ data }) => data);
  }

  me() {
    return this.auth.get("/auth/me").then(({ data }) => data);
  }
}

const authService = new Auth();
// `authService` is the object with the above axios request methods

export default authService;

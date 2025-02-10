import axios from "axios";

class httpService {
  service = null;

  constructor() {
    this.service = axios.create();
    this.service.interceptors.response.use(
      this.handleSuccess,
      this.handleError
    );
  }

  sendRequest = async (config) => {
    const token = sessionStorage.getItem("token");
    console.log(token);
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return this.service.request(config);
  };

  handleSuccess = (response) => {
    return response;
  };

  handleError = (error) => {
    if (!error.response) {
      return Promise.reject({ message: error.message });
    }
  };
}

export default httpService;

import axios from "axios";
import { toast } from "react-toastify";

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
    if (error.response.status === 401) {
      toast.error("Please login to continue", {
        onclose: () => {
          window.location.href = "/login";
        },
      });
    }
  };
}

export default httpService;

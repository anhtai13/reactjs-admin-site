import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

const getHeaders = () => {
  return {
    "X-API-Key": window.localStorage.getItem("X-API-Key"),
  };
};

export { getHeaders };

export default axios;

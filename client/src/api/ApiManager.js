import axios from "axios";

const ApiManager = axios.create({
  baseURL: "http://192.168.1.108:5000",
  responseType: "json",
  withCredentials: false,
});

export default ApiManager;

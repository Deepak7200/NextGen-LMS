import axios from "axios";

const BASE_URL = "http://localhost:5014/api/v1"; // 5014 -> backend port

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;
// there exists multiple other functionality like "timeout" means, if anyone data didn't fetch at specifit time then it return;

export default axiosInstance;
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:10200/api',
});

axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("jwt")}`;
    return config;
}, function (error) {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
    return response;
}, function (error) {
    if(error.response.status === 401){
        localStorage.removeItem("jwt");
        window.location.href = "/";
    }
    return Promise.reject(error);
});

export default axiosInstance;
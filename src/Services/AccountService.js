// import axiosInstance from "./axiosInstance";
import axios from "axios";

export const accountGetAPI = () => {
    return axiosInstance.get("/account/");
}

export const logInAPI = async(obj) => {
    // return axiosInstance.post("/account/login/",obj);
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/account/login/",obj);
        console.log("logInAPI", response)
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const logOutAPI = async(obj) => {
    // return axiosInstance.post("/account/logout/",obj);
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/account/logout/",obj);
        console.log(response)
        return response.data;
    } catch (error) {
        console.log(error);
    }
   
}


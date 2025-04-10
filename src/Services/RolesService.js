import { showToastMessage } from "../utils/toast";
import axiosInstance from "./AxiosInstance";
// import axios from "axios";

const controller = '/roles/'
export const rolesGetAPI = async () => {
    const res = await axiosInstance.get(controller);
    return res.data;
}

export const rolesPostAPI = async (obj) => {
    try {
        const res = await axiosInstance.post(controller, obj);
        return res;
    } catch (error) {
        console.log(error);
        showToastMessage("Nhóm quyền đã tồn tại!", "error", "top-right");
        throw error
    }
}


export const rolesDeleteAPI = async (id) => {
    try {
        const res = await axiosInstance.delete(controller + id + "/");
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getRolesDetailById = async (id) => {
    try {
        const response = await axiosInstance.get(controller + `${id}/`);
        return response;
    } catch (error) {
        console.log(error);
    }
}


export const rolePutAPI = async (obj,id) => {
    try {
        const response = await axiosInstance.put(controller+`${id}/`, obj);
        return response;
    } catch (error) {
        console.log(error);
        showToastMessage("Nhóm quyền đã tồn tại!", "error", "top-right");
    }
};





            // export const accountPutAPI = async (obj, id) => {
            //     try {
            //         const res =  await axiosInstance.put(`/account/${id}/update_account/`,obj);
            //         return res.data;
            //     } catch (error) {
            //         console.log(error);
            //         throw error
            //     }

            // }
            // export const accountPutAPI = async (obj, id) => {
            //     try {
            //         const res =  await axiosInstance.put(`/account/${id}/update_account/`,obj);
            //         return res.data;
            //     } catch (error) {
            //         console.log(error);
            //         throw error
            //     }

            // }

            // export const logInAPI = async(obj) => {
            //     // return axiosInstance.post("/account/login/",obj);
            //     try {
            //         const response = await axios.post("http://127.0.0.1:8000/api/account/login/",obj);
            //         console.log("logInAPI", response)
            //         return response.data;
            //     } catch (error) {
            //         console.log(error);
            //     }
            // }

            // export const logOutAPI = async(obj) => {
            //     // return axiosInstance.post("/account/logout/",obj);
            //     try {
            //         const response = await axios.post("http://127.0.0.1:8000/api/account/logout/",obj);
            //         console.log(response)
            //         return response.data;
            //     } catch (error) {
            //         console.log(error);
            //     }

            // }
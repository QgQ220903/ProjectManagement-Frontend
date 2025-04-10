import axios from "axios";
import axiosInstance from "./AxiosInstance";

const api = "https://3.24.47.52/api/tasks/";

// const api = "http://127.0.0.1:8000/api/tasks/";



export const taskPost = async (obj) => {
    try {
        const response = await axiosInstance.post("/tasks/", obj);
        console.log("taskPost",response.data)
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const taskDelete = async (is_deleted, id) => {
    try {
        const response = await axiosInstance.patch(`/tasks/${id}/`, {
            is_deleted: is_deleted
        });
        console.log("taskPatch",response.data)
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const taskGetWithId = async (id) => {
    try {
        const response = await axios.get(`${api}employee-leaf-tasks/${id}/`);
        console.log("taskGetWithId",response.data)
        return response.data;
    } catch (error) {
        console.log(error); 
    }
};


import axios from "axios";

const api = "http://localhost:8000/api/tasks/";

export const taskPost = async (obj) => {
    try {
        const response = await axios.post(api, obj);
        console.log("taskPost",response.data)
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
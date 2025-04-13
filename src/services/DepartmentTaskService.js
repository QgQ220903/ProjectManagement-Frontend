import axios from "axios";

const api = 'https://3.24.47.52/api/department-tasks/'

// const api = "http://127.0.0.1:8000/api/department-tasks/";

export const departmentTaskPost = async (obj) => {
    try {
        const response = await axios.post(api, obj);
        // console.log("departmentTaskPost",response.data)
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
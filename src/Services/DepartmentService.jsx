import axios from "axios";

const api = "http://127.0.0.1:8000/api/departments/";

export const departmentGetAPI = async () => {
    try {
        const data = await axios.get(api);
        console.log(data)
        return data.data;
    } catch (error) {
        console.log(error);
    }
};

export const departmentPostAPI = async (obj) => {
    try {
        const response = await axios.post(api, obj);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
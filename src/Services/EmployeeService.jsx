import axios from "axios";

const api = "http://127.0.0.1:8000/api/employees/";

export const employeeGetAPI = async () => {
    try {
        const response = await axios.get(api);
        console.log("employeeGetAPI", response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const employeePostAPI = async (obj) => {
    try {
        const response = await axios.post(api, obj);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const employeePutAPI = async (employe) => {
    try {
        console.log("api", employe.obj);
        const response = await axios.put(`${api}${employe.id}/`, employe.obj);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const employeeDeleteAPI = async (id) => {
    try {
        await axios.delete(`${api}${id}/`);
    } catch (error) {
        console.log(error);
    }
};

import axios from "axios";

const api = "http://127.0.0.1:8000/api/departments/";

export const departmentGetAPI = async () => {
    try {
        const data = await axios.get(api);
        console.log(data);
        return data.data;
    } catch (error) {
        console.log(error);
    }
};

export const departmentPostAPI = async (obj) => {
    try {
        const response = await axios.post(api, obj);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateManagerForDepartmentAPI = async (deparment) => {
    try {
        const response = await axios.put(api + deparment.id + "/", deparment);
        console.log("updateManagerForDepartmentAPI", response.data);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const employeeGetAPI = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/employees/");
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách nhân viên:", error);
    }
};

export const departmentPutAPI = async (id, obj) => {
    try {
        const response = await axios.put(api + id + "/", obj);
        console.log("Updated Department:", response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const departmentDeleteAPI = async (id) => {
    try {
        const response = await axios.delete(api + id + "/");
        console.log("Deleted Department:", response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

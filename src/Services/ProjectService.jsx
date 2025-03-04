import axios from "axios";

const api = "http://127.0.0.1:8000/projects/";

export const projectGetAPI = async() => {
    try {
        const data = await axios.get(api);
        return data.data;
    } catch (error) {
        console.log(error);
    }
};

export const projectPostAPI = async(obj) => {
    try {
        const response = await axios.post(api, obj);
        console.log(response)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
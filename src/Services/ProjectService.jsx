import axios from "axios";

const api = "http://127.0.0.1:8000/api/projects/";

export const projectGetAPI = async () => {
    try {
        const data = await axios.get(api);
        console.log(data)
        return data.data.results;
    } catch (error) {
        console.log(error);
    }
};

export const projectDetailGetAPI = async (id) => {
    try {
        const response = await axios.get(api+id);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error);
    }
};


export const projectPostAPI = async (obj) => {
    try {
        const response = await axios.post(api, obj);
        console.log(response)
        return response.data.results;
    } catch (error) {
        console.log(error);
    }
}
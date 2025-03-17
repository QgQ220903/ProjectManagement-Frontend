import axios from "axios";

const api = "http://127.0.0.1:8000/api/project-parts/";

export const projectPartPostAPI = async (obj) => {
    try {
        const response = await axios.post(api, obj);
        console.log(response)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
import axios from "axios";

const api = 'http://localhost:8000/api/task-assignments/'

export const taskAssignmentsPost = async (obj) => {
    try {
        const response = await axios.post(api, obj);
        console.log("taskAssignmentsPost",response.data)
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
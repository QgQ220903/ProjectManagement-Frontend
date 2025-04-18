import axios from "axios";

const api = 'https://3.24.47.52/api/task-assignments/'

// const api = "http://127.0.0.1:8000/api/task-assignments/";


export const taskAssignmentsPost = async (obj) => {
    try {
        const response = await axios.post(api, obj);
        console.log("taskAssignmentsPost",response.data)
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const taskAssignmentsPatch = async (id, obj, status) => {
    try {
        const response = await axios.patch(`${api}${id}/`, {
            employee: obj.employee,
            task: obj.task,
            status: status
        });
        console.log("taskAssignmentsPut",response.data)
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
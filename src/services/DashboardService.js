//http://127.0.0.1:8000/api/tasks/task-report/report/

import axiosInstance from "./AxiosInstance";


const controller  = '/tasks/task-report/report/';

export const dashboardGetAPI = async (obj) => {
    const res =  await axiosInstance.post(controller,obj);
    return res;
}

export const dashboardGetAPI2 = async (obj) => {
    try {
        const res =  await axiosInstance.post("/tasks/task-statistics/by-all-project-part/",obj);
        return res.data;
    } catch (error) {
        throw error;
    }
  
 
}
import axiosInstance from "./AxiosInstance";


export const getRolesAPI = (roleId) => {
    return axiosInstance.get(`/roles/${roleId}`);
}
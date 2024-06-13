import {authRequest, request} from "./api";
import {getAdminCategory, success} from "../modules/AdminCategoryModules";


export const AdminCategoryAPICalls = () => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/categories`);


        if(result && result.status === 200) {
            dispatch(getAdminCategory(result));
        }
    }
}

export const callAdminCategoryRegistAPI = ({ registRequest }) => {

    return async (dispatch, getState) => {
        console.log(registRequest);
        const result = await authRequest.post(`/admin/categories`, registRequest);
        console.log('callAdminCategoryRegistAPI result : ',result);

        if(result.status === 201) {
            dispatch(success());
        }
    }
};

export const callAdminCategoryModifyAPI = ({categoryCode, modifyRequest}) => {

    return async (dispatch, getState) => {
        console.log(categoryCode);
        const result = await authRequest.put(`/admin/categories/${categoryCode}`, modifyRequest)

        if(result.status === 204) {
            dispatch(success());
        }
    }
}

export const callAdminCategoryDeleteAPI = ({ categoryCode }) => {
    return async (dispatch, getState) => {
        const result = await authRequest.delete(`/admin/categories/${categoryCode}`);

        if(result.status === 204) {
            dispatch(success());
        }
    }
}
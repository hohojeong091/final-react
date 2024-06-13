import { authRequest } from "./api";
import { getStoreList, getStore } from "../modules/SellerModules";
import {success} from "../modules/SellerModules";
import {toast} from "react-toastify";

export const callStoreListAPI = () => {

    return async (dispatch) => {
        const result = await authRequest.get(`/seller/mystore`);
        console.log('callStoreListAPI result : ', result);

        if (result.status === 200) {
            dispatch(getStoreList(result.data));
        }
    }
}

export const callStoreAPI = (sellerCode) => {

    return async (dispatch) => {
        const result = await authRequest.get(`/seller/mystore/${sellerCode}`);
        console.log('callStoreAPI result : ', result);

        if (result.status === 200) {
            dispatch(getStore(result.data));
        }
    }
}

export const callModifyNewStoreAPI = ({ sellerCode, profileRequest }) => {
    return async (dispatch) => {
        try {
            const result = await authRequest.put(`/seller/mystore/${sellerCode}/regist`, profileRequest);
            console.log('callModifyNewStoreAPI result:', result);

            if (result?.status === 204) {
                dispatch(success());
                await dispatch(callStoreAPI(sellerCode));
                toast.success("신규 스토어 정보가 성공적으로 등록되었습니다.");
            } else {
                toast.warning("신규 스토어 정보 등록에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error('Error registering new store info:', error);
            toast.error("신규 스토어 정보 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };
};

export const callUpdateStoreAPI = ({ sellerCode, storeRequest }) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.put(`/seller/mystore/${sellerCode}`, storeRequest);
            console.log('callUpdateStoreAPI result:', result);

            if (result?.status === 204) {
                dispatch(success());
                await dispatch(callStoreAPI(sellerCode));
                toast.success("스토어 정보가 성공적으로 업데이트되었습니다.");
            } else {
                toast.warning("스토어 정보 업데이트에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error('Error updating store info:', error);
            toast.error("스토어 정보 업데이트 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };
};

export const callPauseStoreAPI = (sellerCode, suspendedEndDate) => {
    return async (dispatch) => {
        try {
            const storeRequest = {
                suspendedEndDate,
                storeStatus: 'CLOSED'
            };
            const result = await authRequest.put(`/seller/mystore/${sellerCode}/pause`, storeRequest, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('callPauseStoreAPI result:', result);

            if (result?.status === 204) {
                dispatch(success());
                toast.success("스토어 운영이 정지되었습니다.");
            } else {
                toast.warning("스토어 운영 정지에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error('Error pausing store:', error);
            toast.error("스토어 운영 정지 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };
};



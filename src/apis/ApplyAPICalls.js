import {authRequest} from "./api";
import {getMemberId} from "../utils/TokenUtils";
import {
    getAdminApplies,
    adminApplyAccept, adminApplyReject,
    getAdminApplyDetail,
    getApplies,
    getApplyDetail,
    success
} from "../modules/ApplyModules";
import {toast} from "react-toastify";

// ------------------------------ member
export const callAppliesAPI = ({currentPage = 1}) => {
    return async (dispatch, getState) => {

        const result = await authRequest.get(`/members/mypage/apply/${getMemberId()}/applies?page=${currentPage}`);
        console.log('callAppliesAPI result : ', result);

        if (result.status === 200) {
            dispatch(getApplies(result));
        }
    }
}

export const callApplyDetailAPI = ({sellerCode}) => {
    return async (dispatch) => {
        try {
            const response = await authRequest.get(`/members/mypage/apply/${getMemberId()}/${sellerCode}`);
            if (response.status === 200) {
                dispatch(getApplyDetail(response.data));
            } else {
                console.error('Failed to fetch apply details:', response.statusText);
            }
        } catch (error) {
            console.error('API call error:', error);
        }
    };
}

export const callApplyRegistAPI = ({applyCreateRequest}) => {

    return async (dispatch, getState) => {
        const result = await authRequest.post(`/members/mypage/apply/regist`, applyCreateRequest);
        console.log('callApplyRegistAPI result : ', result);

        if(result.status === 201) {
            dispatch(success());
        }
    }
}

export const callApplyUpdateAPI = ({ sellerCode, applyRequest }) => {
    return async (dispatch, getState) => {
            const result = await authRequest.put(`/members/mypage/apply/modify/${sellerCode}`, applyRequest);
            console.log('callApplyUpdateAPI result:', result);

            if (result?.status === 201) {
                dispatch(success());
                toast.success("신청 정보가 성공적으로 업데이트되었습니다.");
            } else {
                toast.warning("신청 정보 업데이트에 실패했습니다. 다시 시도해주세요.");
            }
    }
}

export const callApplyCancelAPI = ({ sellerCode, applyRequest }) => {
    return async (dispatch, getState) => {
        try {
            const result = await authRequest.post(`/members/mypage/apply/modify/${sellerCode}/cancel`, applyRequest);
            console.log('callApplyCancelAPI result:', result);

            if (result?.status === 204) {
                dispatch(success());
                toast.success("신청이 성공적으로 취소되었습니다.");
            } else {
                toast.warning("신청 취소에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error('Error calling apply cancel API:', error);
            toast.error("신청 취소 중 오류가 발생했습니다.");
        }
    }
}

// ------------------------------ admin
export const callAppliesAdminAPI = ({currentPage = 1}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/admin/dashboard/applies?page=${currentPage}`);
        console.log('callAppliesAdminAPI result : ', result);

        if (result.status === 200) {
            dispatch(getAdminApplies(result));
        }
    }
};

export const callAdminApplyDetailAPI = (sellerCode) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/admin/dashboard/applies/${sellerCode}`);
        console.log('callGetAdminApplyDetailAPI result:', result);

        if (result?.status === 200) {
            dispatch(getAdminApplyDetail(result.data));
        } else {
            console.error('Failed to fetch admin apply detail');
        }
    }
};

export const callAdminApplyAcceptAPI = ({ sellerCode, applyRequest }) => {
    return async (dispatch, getState) => {
        const result = await authRequest.put(`/admin/dashboard/applies/${sellerCode}/accept`, applyRequest);
        console.log('callAdminApplyAcceptAPI result:', result);

        if (result?.status === 201) {
            dispatch(adminApplyAccept({ success: true }));
        } else {
            console.error('Failed to accept apply');
        }
    }
};

export const callAdminApplyRejectAPI = ({ sellerCode, applyRequest }) => {
    return async (dispatch, getState) => {
        const result = await authRequest.post(`/admin/dashboard/applies/${sellerCode}/reject`, applyRequest);
        console.log('callAdminApplyRejectAPI result:', result);

        if (result?.status === 201) {
            dispatch(adminApplyReject({ success: true }));
        } else {
            console.error('Failed to reject apply');
        }
    }
};

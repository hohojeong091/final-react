import { createActions, handleActions } from "redux-actions";

// 초기값
const initialState = {
    applyInfo: { data: [], pageInfo: {} },
    applyDetail: {},
    adminApplyInfo: { data: [], pageInfo: {} },
    adminApplyDetail: {}
};

// 액션 타입
const SUCCESS = 'members/SUCCESS';
const RESET = 'members/RESET';
const GET_APPLIES = 'members/GET_APPLIES';
const GET_APPLY_DETAIL = 'members/GET_APPLY_DETAIL';

const GET_ADMIN_APPLIES = 'admin/GET_ADMIN_APPLIES';
const GET_ADMIN_APPLY_DETAIL = 'admin/GET_ADMIN_APPLY_DETAIL';
const ADMIN_APPLY_ACCEPT = 'admin/ADMIN_APPLY_ACCEPT';
const ADMIN_APPLY_REJECT = 'admin/ADMIN_APPLY_REJECT';

// 액션 함수
export const {
    members: { success, reset, getApplies, getApplyDetail },
    admin: { getAdminApplies, getAdminApplyDetail, adminApplyAccept, adminApplyReject }
} = createActions({
        [SUCCESS]: () => ({ success: true }),
        [RESET]: () => ({}),
        [GET_APPLIES]: (result) => ({ applyInfo: result.data }),
        [GET_APPLY_DETAIL]: (result) => ({ applyDetail: result }),

        [GET_ADMIN_APPLIES]: (result) => ({ adminApplyInfo: result.data }),
        [GET_ADMIN_APPLY_DETAIL]: (result) => ({ adminApplyDetail: result }),
        [ADMIN_APPLY_ACCEPT]: (result) => ({ success: result.success }),
        [ADMIN_APPLY_REJECT]: (result) => ({ success: result.success })
});

// 리듀서 함수
const applyReducer = handleActions(
    {
        [SUCCESS]: (state, { payload }) => ({ ...state, success: payload.success }),
        [RESET]: () => initialState,

        [GET_APPLIES]: (state, { payload }) => ({
            ...state,
            applyInfo: payload.applyInfo
        }),
        [GET_APPLY_DETAIL]: (state, { payload }) => ({
            ...state,
            applyDetail: payload.applyDetail
        }),
        [GET_ADMIN_APPLIES]: (state, { payload }) => ({
            ...state,
            adminApplyInfo: payload.adminApplyInfo
        }),
        [GET_ADMIN_APPLY_DETAIL]: (state, { payload }) => ({
            ...state,
            adminApplyDetail: payload.adminApplyDetail
        }),
        [ADMIN_APPLY_ACCEPT]: (state, { payload }) => ({
            ...state,
            success: payload.success
        }),
        [ADMIN_APPLY_REJECT]: (state, { payload }) => ({
            ...state,
            success: payload.success
        })
    },
    initialState
);

export default applyReducer;

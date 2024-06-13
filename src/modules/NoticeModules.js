// NoticeModules.js
import { createActions, handleActions } from 'redux-actions';

const initialState = {
    notices: [],
    success: false
};

// 액션 타입
const GET_NOTICES = 'notice/GET_NOTICES';
const GET_NOTICE = 'notice/GET_NOTICE';
const CREATE_NOTICE = 'notice/CREATE_NOTICE';
const MODIFY_NOTICE = 'notice/MODIFY_NOTICE'
const DELETE_NOTICE = 'notice/DELETE_NOTICE'
const SUCCESS = 'notice/SUCCESS';

// 액션 함수
export const { notice: { getNotices, success, getNotice } } = createActions({
    [GET_NOTICES]: (result) => ({ notices: result.data }),
    [GET_NOTICE] : (result) => ({notice : result.data}),
    [CREATE_NOTICE] : (result) => ({notice : result.data}),
    [MODIFY_NOTICE] : (result) => ({notice : result.data}),
    [DELETE_NOTICE] : (result) => ({notice : result.data}),
    [SUCCESS]: () => ({ success: true })
});


// 리듀서 함수
const noticeReducer = handleActions({
    [GET_NOTICES]: (state, { payload }) => payload,
    [GET_NOTICE] : (state, { payload }) => payload,
    [CREATE_NOTICE] : (state, { payload }) => payload,
    [MODIFY_NOTICE] : (state, {payload}) => payload,
    [DELETE_NOTICE] : (state, {payload}) => payload,
    [SUCCESS]: (state, { payload }) => ({
        ...state,
        success: payload.success
    })
}, initialState);

export default noticeReducer;

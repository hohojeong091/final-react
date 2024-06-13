import {authRequest, request} from "./api";
import {getNotice, getNotices} from "../modules/NoticeModules";
import {success} from "../modules/AdminCategoryModules";


export const AdminNoticesAPICalls = ({currentPage = 1}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get( `/admin/notices?page=${currentPage}`);
        console.log('AdminNoticesAPICalls result : ', result);

        if(result.status === 200) {
            dispatch(getNotices(result));
        }
    }
}

export const NoticeAPICalls = ({noticeCode}) => {
    return async (dispatch, getState) => {
        console.log("noticeCode api : ", noticeCode)
        const result = await request('GET' , `/admin/notices/${noticeCode}`);
        console.log('NoticeAPICalls result : ', result);

        if(result.status === 200) {
            dispatch(getNotice(result));
        }
    }
}

export const AdminNoticeCreateAPICalls = ({ noticeCreateRequest }) => {
    return async (dispatch, getState) => {
        console.log("noticeCreateRequest api: ", noticeCreateRequest);

        const result = await authRequest.post(`/admin/notice-create`, noticeCreateRequest);

        if (result.status === 201) {
            dispatch(getNotice(result));
        }
    }
}

export const AdminNoticeModifyAPICalls = ({ noticeCode, modifyRequest }) => {
    return async (dispatch, getState) => {
        console.log(noticeCode);
        const result = await authRequest.put(`/admin/notices/${noticeCode}`, modifyRequest)

        if(result.status === 204) {
            dispatch(success());
        }
    }
}


export const NoticeDeleteAPICalls = ({noticeCode}) => {
    return async (dispatch, getState) => {
        console.log("noticeDeleteRequest api : " , noticeCode);
        const result = await authRequest.delete(`/admin/notices/${noticeCode}`);

        if(result.status === 204) {
            dispatch(getNotices(result));
        }
    }
}




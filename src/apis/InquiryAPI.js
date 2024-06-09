
import {authRequest, request} from "./api";
import {toast} from "react-toastify";
import {getInquiry, success} from "../modules/InquiryModules";

export const callInquiryListAPI = ({getInquiryListRequest}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/members/mypage/inquiry`, getInquiryListRequest);
        // const result = await request(`GET`, `/inquiry?page=1`);

        if(result?.status === 200) {
            dispatch(getInquiry(result));
        } else {
            toast.warning("문의 목록 조회에 실패했습니다. ")
        }

    }
}

export const callMemberInquiryRegistAPI = ({inquiryRegistRequest}) => {
    console.log("실행");

    return async (dispatch, getState) => {
        // const result = await authRequest.post(`/members/mypage/inquiry/regist`, inquiryRegistRequest);
        const result = await authRequest.post(`/inquiry/members/regist`, inquiryRegistRequest);

        if (result?.status === 200) {
            dispatch(success());
        } else {
            toast.warning("문의 등록에 실패했습니다.")
        }
    }

}







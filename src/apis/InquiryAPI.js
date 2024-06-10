
import {authRequest} from "./api";
import {toast} from "react-toastify";
import {getInquiry, success} from "../modules/InquiryModules";

export const callInquiryListAPI = ({getInquiryListRequest}) => {
    return async (dispatch, getState) => {

         const result = await authRequest.get( `/inquiry/view`, getInquiryListRequest);

        if(result?.status === 200) {
            dispatch(getInquiry(result));
        } else {
            toast.warning("문의 목록 조회에 실패했습니다. ")
        }

    }
}

export const callMemberInquiryRegistAPI = ({inquiryRegistRequest}) => {

    return async (dispatch, getState) => {
        const result = await authRequest.post(`/inquiry/members/regist`, inquiryRegistRequest);


        if (result?.status === 201) {
            dispatch(success());
        } else {
            toast.warning("문의 등록에 실패했습니다.")
        }
    }

}







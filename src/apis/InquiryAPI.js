
import {authRequest} from "./api";
import {toast} from "react-toastify";
import {getInquiry, success} from "../modules/InquiryModules";
import async from "async";

export const callInquiryListAPI = ({currentPage}) => {
    return async (dispatch, getState) => {

         const result = await authRequest.get( `/inquiry/view?page=${currentPage}`);

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

export const callInquiryDetailViewAPI = ({inquiryDetailView}) => {

    return async (dispatch, getState) => {
        const result = await authRequest.get(`/inquiry/detail/${inquiryCode}`, inquiryDetailView);

        if(result?.status === 200) {

        } else {
            toast.warning("문의 상세내역을 불러오지 못했습니다")
        }
    }
}







import {authRequest} from "./api";
import {toast} from "react-toastify";
import {getOrderDetails, getOrders, success} from "../modules/OrderModules";
import {getMemberId} from "../utils/TokenUtils";

export const callOrderRegistAPI = ({registForm}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.post(
            `/orders`,
            JSON.stringify(registForm),
            { headers : { 'Content-Type' : 'application/json' }}
        ).catch(e => {
            if(e.response.status === 409) {
                toast.error('재고 부족으로 상품 구매가 불가합니다.');
            }
        });

        console.log('callOrderRegistAPI result : ', result);

        if(result?.status === 201) {
            dispatch(success());
        }

    }
}

export const callOrdersAPI = ({currentPage}) => {

    return async (dispatch, getState) => {
        const result = await authRequest.get(
            `/members/${getMemberId()}/orders?page=${currentPage}`
        );

        console.log('배열인가요? : ',Array.isArray(result));
        console.log('callOrdersAPI result : ', result);

        if (result?.status === 200) {
            dispatch(getOrders(result));
        }
    }
}

// export const callOrderDetailAPI = ({orderCode}) => {
//
//     return async (dispatch, getState) => {
//         const result = await authRequest.get(
//             `/members/${getMemberId()}/orders/${orderCode}`
//         );
//
//         console.log('상세주문배열인가요? : ',Array.isArray(result));
//         console.log('callOrdersAPI result : ', result);
//
//         if (result?.status === 200) {
//             dispatch(getOrderDetails(result));
//         }
//     }
// }

// 주문 상세 API 호출 함수
// export const callOrderDetailAPI = ({ orderCode }) => async (dispatch) => {
//     try {
//         const response = await authRequest.get(`/members/${getMemberId()}/orders/${orderCode}`);
//         console.log(response.data);
//         dispatch({ type: 'GET_ORDER_DETAILS_SUCCESS', payload: response.data });
//     } catch (error) {
//         console.error(error);
//         dispatch({ type: 'GET_ORDER_DETAILS_FAILURE', payload: error });
//     }
// };
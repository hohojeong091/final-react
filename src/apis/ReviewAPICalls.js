import {authRequest} from "./api";
import {getReviews} from "../modules/ReviewModules";

export const ReviewsAPICalls = ({productCode}) => {
    return async (dispatch, getState) => {
        const result = await authRequest.get(`/member/products/${productCode}/reviews`);

        console.log('ReviewAPICalls result : ', result);

        if(result.status === 200) {
            dispatch(getReviews(result));
        }
    }
}

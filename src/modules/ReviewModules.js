import { createActions, handleActions } from 'redux-actions';

const initialState = {
    reviews: [],  // 초기 상태 설정
    success: false
};

// 액션 타입
const GET_REVIEWS = 'reviews/GET_REVIEWS';
const SUCCESS = 'reviews/SUCCESS';

// 액션 함수
export const { reviews: { getReviews, success } } = createActions({
    [GET_REVIEWS]: (result) => ({ reviews: result.data }),
    [SUCCESS]: () => ({ success: true })
});

// 리듀서 함수
const ReviewReducer = handleActions({
    [GET_REVIEWS]: (state, { payload }) => ({
        ...state,
        reviews: payload.reviews.data
    }),
    [SUCCESS]: (state, { payload }) => ({
        ...state,
        success: payload.success
    })
}, initialState);

export default ReviewReducer;

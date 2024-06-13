import {createActions, handleActions} from "redux-actions";

const initialState = {};

const SUCCESS = 'order/SUCCESS';
const GET_ORDERS = 'order/GET_ORDERS';
const GET_ORDER_DETAILS = 'order/GET_ORDER_DETAILS';

export const { order : { success, getOrders, getOrderDetails } } = createActions({
    [SUCCESS] : () => ({ success : true }),
    [GET_ORDERS] : (result) => ({ orders : result.data }),
    [GET_ORDER_DETAILS]: (result) => ({ orderDetails: result.data })
});

const orderReducer = handleActions({
    [SUCCESS] : (state, { payload }) => payload,
    [GET_ORDERS] : (state, { payload }) => payload,
    [GET_ORDER_DETAILS]: (state, { payload }) => payload,
}, initialState);


export default orderReducer;
import {createActions, handleActions} from "redux-actions";


const initialState = {
    // product: [],
    success: false,
    loading : false,
    error : null
};

const GET_PRODUCTS = 'product/GET_PRODUCTS';
const GET_PRODUCT = 'product/GET_PRODUCT';
const SUCCESS = 'product/SUCCESS';
const ADD_PRODUCT = 'product/ADD_PRODUCT';
const DELETE_PRODUCT = 'product/DELETE_PRODUCT';


export const { product : { getProducts, getProduct, success, addProduct, deleteProduct }} = createActions({
    [GET_PRODUCTS] : result => ({products : result.data }),
    [GET_PRODUCT] : result => ({product : result.data }),
    [SUCCESS] : () => ({ success : true }),
    [ADD_PRODUCT] : product => product,
    [DELETE_PRODUCT] : product => product
})


const productReducer = handleActions({
    [GET_PRODUCTS]: (state, { payload }) => ({
        ...state,
        products: payload.products
    }),
    [GET_PRODUCT]: (state, { payload }) => ({
        ...state,
        product: payload.product
    }),
    [SUCCESS]: (state) => ({
        ...state,
        success: true
    }),
    [ADD_PRODUCT]: (state, { payload }) => ({
        ...state,
        product: [...state.product, payload]
    }),
    [DELETE_PRODUCT]: (state, { payload }) => ({
        ...state,
        product: state.product.filter(product => product !== payload)
    })
}, initialState);

export default productReducer;
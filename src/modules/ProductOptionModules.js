import {createActions, handleActions} from "redux-actions";


const initialState = {
    option: [],
    success: false,
    loading : false,
    error : null
};

const GET_OPTIONS = 'product/option/GET_OPTIONS';
const SUCCESS = 'product/option/SUCCESS';
const ADD_OPTION = 'product/option/ADD_OPTION';
const DELETE_OPTION = 'product/option/DELETE_OPTION';


export const { product : { getOptions, success, appOption, deleteOption }} = createActions({
    [GET_OPTIONS] : result => ({options : result.data }),
    [SUCCESS] : () => ({ success : true }),
    [ADD_OPTION] : option => option,
    [DELETE_OPTION] : option => option
})


const optionReducer = handleActions({
    [GET_OPTIONS]: (state, { payload }) => ({
        ...state,
        option: payload.option
    }),
    [SUCCESS]: (state) => ({
        ...state,
        success: true
    }),
    [ADD_OPTION]: (state, { payload }) => ({
        ...state,
        option: [...state.option, payload]
    }),
    [DELETE_OPTION]: (state, { payload }) => ({
        ...state,
        option: state.option.filter(option => option !== payload)
    })
}, initialState);

export default optionReducer;
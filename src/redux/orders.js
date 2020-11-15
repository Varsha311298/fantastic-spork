import * as ActionTypes from './ActionTypes';

export const Orders = (state = {
    orders : []
}, action = {}) => {
    switch(action.type) {
        case ActionTypes.FETCH_ORDERS:
            console.log(action.payload);
            return {...state, orders: action.payload}
        default:
            return state;
    }
}

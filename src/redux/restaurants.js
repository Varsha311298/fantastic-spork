import * as ActionTypes from './ActionTypes';

export const Restaurants = (state = {
    restaurants : []
}, action = {}) => {
    switch(action.type) {
        case ActionTypes.SET_RESTAURANTS:
            console.log(action.payload);
            return {...state, restaurants: action.payload}
        default:
            return state;
    }
}

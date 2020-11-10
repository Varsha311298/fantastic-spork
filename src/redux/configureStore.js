import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { User } from './usersDetails';
import { Restaurants } from './restaurants';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            user: User,
            restaurants: Restaurants
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};
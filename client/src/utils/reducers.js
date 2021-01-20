import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY
} from './actions';

//import useReducer React hook
import { useReducer } from 'react';

export const reducer = (state, action) => {
    switch(action.type) {
        //if action type value is `UPDATE_PRODUCTS`, return new state object w/update array
        case UPDATE_PRODUCTS:
            return {
                ...state,
                products: [...action.products],
            };
        // if action type value is `UPDATE_CATEGORIES`, return new state object w/updated array
        case UPDATE_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories]
            };
        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory
            };
        
        //if action type is none of the above, don't update state and return initial state
        default:
            return state;
    }
};

// initialize global state object
export function useProductReducer(initialState) {
    return useReducer(reducer, initialState);
}
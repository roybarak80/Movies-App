import {FETCH_MOVIES, UPDATE_MOVIE, NEW_MOVIE} from '../actions/types';

const initialState = {

    items: [],
    item: {},
    
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_MOVIES:

            return {
                ...state,

                items: action.payload
            };

        case UPDATE_MOVIE:
            const movie = action.payload;
            return {
                ...state,
                items: state
                    .items
                    .map(item => item.id === movie.id
                        ? movie
                        : item)
            }

        case NEW_MOVIE:
            return {
                ...state,
                item: action.payload
            };

        default:
            return state;
    }
}
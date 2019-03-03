import { FETCH_MOVIES, UPDATE_MOVIE, NEW_MOVIE} from './types';

export function fetchMovies() {

    return function (dispatch) {
        fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=82e0e5a56b04994581c0700e5' +
                    'd61a2e5')
            .then(res => res.json())
            .then(movies => dispatch({type: FETCH_MOVIES, payload: movies['results']}));
    }
};

// export function fetchGenres() {
//     console.log(23)
//     return function (dispatch) {
//         fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=82e0e5a56b04994581c0700e5d' +
//         '61a2e5')
//             .then(res => res.json())
//             .then(genres => dispatch({type: FETCH_GENRES, payload:genres['genres']}));
//     }
    
// };


export function addNewMovie(postData) {
   
    return function (dispatch) {
        dispatch({type: NEW_MOVIE, payload: postData});
    }

};

export function updateMovie(postData) {

    return function (dispatch) {
        dispatch({type: UPDATE_MOVIE, payload: postData});
    }
};

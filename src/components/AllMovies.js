import React, {Component} from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchMovies} from '../actions/postsAction';
import EditMovieModal from './EditMovieModal';
import MovieRating from './MovieRating';
import Moment from 'moment';
import MovieOverViewModal from './MovieOverViewModal';
import MovieGenres from './MovieGenres';

class AllMovies extends Component {

    constructor(props) {
        super(props);

        this.state = {
            genres: []
        };
    }

    componentWillMount() {

        fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=82e0e5a56b04994581c0700e5d' +
                    '61a2e5')
            .then(response => response.json())
            .then(genres => this.setState({genres}));

        this
            .props
            .fetchMovies();

    }
    componentWillReceiveProps(nextProps) {

        if (nextProps.newMovie) {
            this
                .props
                .movies
                .unshift(nextProps.newMovie);
        }
    }
    formatMovieTitle(movieTitle) {

        var currMovieTitle = movieTitle
            .toLowerCase()
            .split(' ')
            .map(function (movieTitle) {
                var formatedMovieTitle = movieTitle[0].toUpperCase() + movieTitle.substr(1);
                return formatedMovieTitle.replace(/[^A-Za-z0-9-:]/g, '');
            })
            .join(' ');
            return currMovieTitle;
      

    }
    formatDate(movieDate) {

        var movieFormatedDate = '';
        if (!!movieDate) {
            movieFormatedDate = Moment(movieDate).format('DD-MM-YYYY');

        } else {

            var newMovieDate = new Date();
            movieFormatedDate = Moment(newMovieDate).format('DD-MM-YYYY');

        }

        return movieFormatedDate;
    }

    render() {

        const movieItems = this
            .props
            .movies
            .map(movieItem => (

                <div key={movieItem.id}>
                    <div className="movie-card-item">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <div className="moviePosterCard">
                                    {movieItem.poster_path
                                        ? (<img alt="" src={`https://image.tmdb.org/t/p/w500${movieItem.poster_path}`}/>)
                                        : (<img alt="" src={`${movieItem.img}`}/>)}
                                </div>
                                <div className="movieInfoCard">
                                    <div className="movie-info-card-wrapper">
                                        <div className="movie-release-date">
                                            <span className="italic-title">Released</span>
                                            <span className="movie-release-date-date">{this.formatDate(movieItem.release_date)}</span>
                                        </div>
                                        <div className="movie-rating">

                                            <span className="italic-title">
                                                {movieItem.vote_count}&nbsp; Fan Ratings</span>
                                            <MovieRating currAverage={movieItem.vote_average}/>
                                        </div>
                                        <div className="movie-genres">
                                            <span className="italic-title">
                                                Movie Genres</span>
                                            <MovieGenres
                                                moviesGenresIds={movieItem.genre_ids}
                                                genresFromApi={this.state.genres}/>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div className="panel-body">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <span className="movie-title">{this.formatMovieTitle(movieItem.title)}</span>

                                            <span className="pull-right edit-movie-btn">
                                                <EditMovieModal currMovie={movieItem}/>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="movie-overview">
                                            {movieItem.overview}

                                        </div>
                                        <MovieOverViewModal movieObj={movieItem}/>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            ));
        return (
            <div>
                {movieItems}
            </div>
        )
    }
}

AllMovies.propTypes = {
    fetchMovies: propTypes.func.isRequired,

    movies: propTypes.array.isRequired,

    // newPost: propTypes.object
}
const mapStateToProps = state => ({genres: state.genres, movies: state.movies.items, newMovie: state.movies.item, editedMovie: state.movies.item})

export default connect(mapStateToProps, {fetchMovies})(AllMovies);

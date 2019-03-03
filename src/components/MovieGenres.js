import React, {Component} from 'react';

export default class MovieGenres extends Component {

    

    getMovieGenres() {

        var movieGenresIds = this.props.moviesGenresIds;
        var genresFromApi = this.props.genresFromApi;

        if (!!genresFromApi) {

            var movieGenres = genresFromApi;
            movieGenres = movieGenres.genres;
            var currMovieGenresArr = [];
            for (var ind01 = 0; ind01 < movieGenresIds.length; ind01++) {

                var currMovieItem = movieGenresIds[ind01];
                for (var ind02 = 0; ind02 < movieGenres.length; ind02++) {

                    if (currMovieItem === movieGenres[ind02].id) {
                        currMovieGenresArr.push(movieGenres[ind02].name)
                    }
                }
            }

            return currMovieGenresArr;
        }

    }

    render() {
        
    
       const currMovieGenresArr = this.getMovieGenres();
        const genresArr = [];
        if (!!currMovieGenresArr) {
            for (var i = 0; i < currMovieGenresArr.length; i++) {
               

                if( i === currMovieGenresArr.length -1){
                    genresArr.push(
                        <span className='curr-genre' key={i}>
                            {currMovieGenresArr[i]+' '}
                        </span>
                    );
                } else{
                    genresArr.push(
                        <span className='curr-genre' key={i}>
                            {currMovieGenresArr[i]+', '}
                        </span>
                    );
                }
                
            }
        }

        return (
            <div>
                {genresArr}
            </div>
        )
    }
}



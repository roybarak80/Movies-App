import React, {Component} from 'react'
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import MovieRating from './MovieRating';

export default class MovieOverViewModal extends Component {

    constructor(props) {
        super(props);
        this.handleShow = this
            .handleShow
            .bind(this);
        this.handleClose = this
            .handleClose
            .bind(this);

        this.state = {
            show: null
        }

    }

    handleClose() {
        this.setState({show: null});
    }

    handleShow(id) {
        this.setState({show: id});
    }

    render() {
        return (
            <div>
                <Button
                    className="btn btn-link read-more-btn"
                    onClick={() => this.handleShow(this.props.movieObj.id)}>
                    <span>
                        Read More
                    </span>
                </Button>

                <Modal show={this.state.show === this.props.movieObj.id}>
                    <Modal.Header
                        onClick={() => this.handleClose()}
                        closeButton
                        closeLabel="close window"></Modal.Header>
                    <Modal.Body>
                        <div className="movie-overview-modal">
                            <div className="row">
                                <div className="col-md-6">
                                    {this.props.movieObj.poster_path
                                        ? (<img alt="" className="img-responsive" src={`https://image.tmdb.org/t/p/w500${this.props.movieObj.poster_path}`}/>)
                                        : (<img alt="" className="img-responsive" src={`${this.props.movieObj.img}`}/>)}
                                </div>
                                <div className="col-md-6">
                                    <p className="movie-title">{this.props.movieObj.title}</p>
                                    <p>{this.props.movieObj.overview}</p>
                                    <MovieRating currAverage={this.props.movieObj.vote_average}/>
                                </div>
                            </div>
                        </div>

                    </Modal.Body>

                </Modal>
            </div>
        )
    }
}

import React, {Component} from 'react'
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {addNewMovie} from '../actions/postsAction';
import store from '../store';
import {ToastContainer, ToastStore} from 'react-toasts';
import {ButtonToolbar} from 'react-bootstrap';

import {ToggleButtonGroup} from 'react-bootstrap';
import {ToggleButton} from 'react-bootstrap';

class NewMovieForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            overview: '',
            img: '',
            genre_ids: '',
            isOpenAddNewMovie: true
        }
        this.addNewMovie = this
            .addNewMovie
            .bind(this);
        this.onChange = this
            .onChange
            .bind(this);
        this.onSubmit = this
            .onSubmit
            .bind(this);
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    addNewMovie() {

        if (!this.state.isOpenAddNewMovie) {
            this.setState({isOpenAddNewMovie: true});

        } else {
            this.setState({isOpenAddNewMovie: false});

        }
    }
    onSubmit(e) {
        e.preventDefault();

        const currState = store
            .getState()
            .movies
            .items;

        const newMovie = {
            id: currState.length + 1,
            title: this.state.title,
            overview: this.state.overview,
            img: this.state.img,
            release_date: new Date(),
            genre_ids: this.state.genre_ids
        }
        this
            .props
            .addNewMovie(newMovie);
        ToastStore.success('New Movie Added');
        this.setState({isOpenAddNewMovie: true});

    }
    render() {

        return (
            <div>

                <div className="panel panel-success">
                    <div className="panel-heading">
                        <span className="pull-left">Add New Movie</span>
                        <button onClick={this.addNewMovie} className="pull-right btn btn-primary">Add New Movie</button>
                    </div>
                    <ToastContainer
                        store={ToastStore}
                        position={ToastContainer.POSITION.TOP_RIGHT}/> {this.state.isOpenAddNewMovie !== true
                        ? <div className="panel-body">
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label>Title</label>
                                        <br/>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="title"
                                            onChange={this.onChange}
                                            value={this.state.value}/>

                                    </div>
                                    <div className="form-group">
                                        <label>Image Url</label>
                                        <br/>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="img"
                                            onChange={this.onChange}
                                            value={this.state.img}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Movie Genres</label>
                                        <br/>
                                        {/* <ButtonToolbar>
    <ToggleButtonGroup type="checkbox" defaultValue={[1, 3]}>
      <ToggleButton value={1}>Checkbox 1 (pre-checked)</ToggleButton>
      <ToggleButton value={2}>Checkbox 2</ToggleButton>
      <ToggleButton value={3}>Checkbox 3 (pre-checked)</ToggleButton>
    </ToggleButtonGroup>
  </ButtonToolbar> */}
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="img"
                                            onChange={this.onChange}
                                            value={this.state.genre_ids}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Movie Description</label>
                                        <br/>
                                        <textarea
                                            name="overview"
                                            className="form-control"
                                            onChange={this.onChange}
                                            value={this.state.overview}/>
                                    </div>
                                    <br/>
                                    <div>
                                        <button type="submit" className="btn btn-primary">
                                            submit</button>
                                    </div>
                                </form>

                            </div>
                        : <div></div>
}

                </div>

            </div>

        )
    }
}

NewMovieForm.propTypes = {
    addNewMovie: propTypes.func.isRequired
}
export default connect(null, {addNewMovie})(NewMovieForm);
import React, {Component} from 'react'
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {addNewMovie} from '../actions/postsAction';
import store from '../store';
class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            overview: '',
            img:''
        }

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
            img:this.state.img,

        }
        this
            .props
            .addNewMovie(newMovie);
    }
    render() {
        return (
            <div>
                <div className="panel panel-success">
                    <div className="panel-heading">Add Post</div>
                    <div className="panel-body">
                        <form onSubmit={this.onSubmit}>
                            <div>
                                <label>Title</label>
                                <br/>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="title"
                                    onChange={this.onChange}
                                    value={this.state.value}/>
                            </div>
                            <div>
                                <label>Image</label>
                                <br/>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="img"
                                    onChange={this.onChange}
                                    value={this.state.img}/>
                            </div>
                            <div>
                                <label>Body</label>
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
                </div>

            </div>

        )
    }
}

PostForm.propTypes = {
    addNewMovie: propTypes.func.isRequired
}
export default connect(null, {addNewMovie})(PostForm);
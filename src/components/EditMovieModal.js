import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {updateMovie} from '../actions/postsAction';

class EditMovieModal extends Component {

    constructor(props) {
        super(props);
        this.handleShow = this
            .handleShow
            .bind(this);
        this.handleClose = this
            .handleClose
            .bind(this);
            this.onChange = this
            .onChange
            .bind(this);
        this.onClick = this
            .onClick
            .bind(this);
            this.handleOverview = this
            .handleOverview
            .bind(this);
            this.handleTitle = this
            .handleTitle
            .bind(this);

        this.state = {
            show: null,
            id:'',
            title: '',
            overview:'',
        }
        
    }

    handleClose() {
        this.setState({show: null});
    }

    handleShow(id) {
        this.setState({show: id});
    }

    handleOverview(e) {
        this.setState({overview: e.target.value});
    }

    handleTitle(e) {
        this.setState({title: e.target.value});
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });

    }

    onClick(e) {
       
        const currMovieObj = this.props.currMovie;
        currMovieObj.original_title = this.state.title;
        currMovieObj.title = this.state.title;
        currMovieObj.overview = this.state.overview;
        this.props.updateMovie(currMovieObj);
    }
    render() {

        return (
            <div>

                <Button
                    bsStyle="primary"
                    bsSize="small"
                    onClick={() => this.handleShow(this.props.currMovie.id)}>
                    <span>
                        <i className="fa fa-pencil"></i>
                    </span>
                </Button>

                <Modal show={this.state.show === this.props.currMovie.id}>
                    <Modal.Header
                        onClick={() => this.handleClose()}
                        closeButton
                        closeLabel="close window"></Modal.Header>
                    <Modal.Body>
                        <input
                            className="form-control"
                            type="text"
                            name="title"
                            onChange={this.handleTitle}
                            value={this.state.title}
                            placeholder={this.props.currMovie.title}/>

                        <textarea
                            name="body"
                            className="form-control"
                            onChange={this.handleOverview}
                            value={this.state.overview}
                            placeholder={this.props.currMovie.overview}/>

                    </Modal.Body>
                    <Modal.Footer>
                    <button type="button" 
                    onClick={this.onClick}
                    className="btn btn-primary">
                                    submit</button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}


EditMovieModal.propTypes = {
    updateMovie: propTypes.func.isRequired
}
export default connect(null, {updateMovie})(EditMovieModal);
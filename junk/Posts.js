import React, {Component} from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions/postsAction';
import EditMovieModal from './EditMovieModal';

class Posts extends Component {

    
    componentWillMount() {
        this
            .props
            .fetchPosts();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.newPost) {
            this
                .props
                .posts
                .unshift(nextProps.newPost);
        }
    }
    render() {
        const postItems = this
            .props
            .posts
            .map(post => (

                <div key={post.id}>
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <span >{post.title}</span>
                            <span className="pull-right">
                               <EditMovieModal currPost={post}/>
                            </span>
                        </div>
                        <div className="panel-body">{post.body}</div>
                    </div>

                </div>
            ));
        return (
            <div>
                <h1>Posts</h1>
                {postItems}
            </div>
        )
    }
}

Posts.propTypes = {
    fetchPosts: propTypes.func.isRequired,
    posts: propTypes.array.isRequired,
    newPost: propTypes.object
}
const mapStateToProps = state => ({posts: state.posts.items, newPost: state.posts.item})
export default connect(mapStateToProps, {fetchPosts})(Posts);
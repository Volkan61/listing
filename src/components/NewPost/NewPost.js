import React, { Component } from 'react';
import axios from 'axios';

import './NewPost.css';

class NewPost extends Component {
    state = {
        url: '',
        content: '',
        author: 'Max'
    }
    render () {
        return (
            <div className="NewPost">
                <h1>Add a Post</h1>
                <label>URL</label>
                <input type="text" onChange={(event)=> this.props.setUrl(event.target.value)} />
                <label>{this.props.stateUrl}</label>
                <label>{this.props.stateDesc}</label>

                <textarea rows="4" value={this.props.desc}  onChange={(event)=> this.props.setContent(event.target.value)} />
                <button onClick={this.props.handler}>Add Post</button>
            </div>
        );
    }
}
export default NewPost;
import React, { Component } from 'react';
import axios from "axios";
import List from "../../container/List/List";
import Category from "../../container/Category/Category";

import './Workaround.css';
import * as actionTypes from '../../store/actions'
import {connect} from 'react-redux';


class Workaround extends Component {

    state = {
        loading:true,
        entrySaved: false,
     //   entries: []
    }

    constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.setAbc = this.setAbc.bind(this);
        this.onToggle = this.onToggle.bind(this);

    }


    setAbc = (news) => {
        var newArray = this.props.entries.entries.slice();

        var newEntry = {
            'id':1234,
            'text': news,
        }

        newArray.push(newEntry);
        this.props.setEntries(newArray);
        this.props.setEntrySaved(true);
    }


    handleKeyPress(event) {
        if (event.key === 'Enter') {
            //console.log(event);
            //console.log('enter key pressed');
            //console.log(event.target.value);
            this.setAbc(event.target.value);
            this.postDataHandler(event.target.value,event.target.value);
        }
    }

    deleteEntry = (no) => {
        console.log(no);
        var newArray = this.props.entries.entries.slice();
        newArray = newArray.filter(function(ele){
            var idad =  ele['id'];
            return idad != no;

        });
        this.props.setEntries(newArray);

        this.postDeleteVideo(no);
    }


    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/list/'+this.props.entries.choosenListId).then(response => {
            const posts = response.data;

            /*    const updatedPosts = posts.map(post => {
                        return {
                            ...post,
                            author: 'Volkan'
                        }
                    }
                ); */

            console.log(posts);
            //this.props.onIngredientAdded("sdasd");
            this.props.setEntries(posts);
            this.props.setLoading(false);


            // this.setState({loading: false});
            //this.setState({entries: posts});
        })
    }


    componentDidUpdate() {
       /* if(this.props.entries.loading!=true) {
            this.props.setLoading(true);
        }
        */
        axios.get('http://127.0.0.1:8000/api/list/'+this.props.entries.choosenListId).then(response => {
            const posts = response.data;
            /*    const updatedPosts = posts.map(post => {
                        return {
                            ...post,
                            author: 'Volkan'
                        }
                    }
                ); */
            console.log(posts);

            //this.props.onIngredientAdded("sdasd");
            if((JSON.stringify(this.props.entries.entries) != JSON.stringify(posts)) && this.props.entries.entrySaved==false) {
                this.props.setEntries(posts);
                this.props.setLoading(false)
            }
            //this.setState({loading: false});
            //this.setState({entries: posts});
        })
    }

    postDataHandler = (text) => {
        const data = {
            text: text,
            listenid: this.props.entries.choosenListId,
        };

        axios.post('http://127.0.0.1:8000/api/list', data)
            .then(response => {
                this.props.setEntrySaved(false);

                this.setState({entrySaved: false})
            });
    }


    postDeleteVideo = (id) => {
        axios.post('http://127.0.0.1:8000/api/deleteVideo'+'/'+id)
            .then(response => {
            });
    }

    onToggle(node, toggled){
        if(this.state.cursor){this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });
    }

    render() {
        var output;
        if(this.props.entries.choosenListId!=null) {
            output =
                (<List entrySaved={this.props.entries.entrySaved} load={this.props.entries.loading} entries={this.props.entries.entries} addEntry={this.handleKeyPress} deleteEntry={this.deleteEntry}/>)
        }

        return (
            <div>

                <div  className="row">
                    <div className="category">
                        <Category/>
                    </div>

                    <div className="entries">
                        {output}
                    </div>
                </div>
            </div>
        )
    }
}



const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (name) => dispatch({type: actionTypes.ADD_, payload: name}),
        setEntries: (entries) => dispatch({type: actionTypes.SETENTRIES, payload: entries}),
        setLoading: (loading) => dispatch({type: actionTypes.SETLOADING, payload: loading}),
        setEntrySaved: (entrySaved) => dispatch({type: actionTypes.SETENTRYSAVED, payload: entrySaved})

    }
}


function mapStateToProps(state) {
    return {
        loading: state.loading,
        entrySaved: state.entrySaved,
        entries: state.entries,
        choosenListId: state.choosenListId
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Workaround);
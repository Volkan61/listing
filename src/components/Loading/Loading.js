import React, { Component } from 'react';

import * as actionTypes from '../../store/actions'
import {connect} from 'react-redux';
import './Loading.css';

class Loading extends Component {


    render() {
        return (
            <div>
                <div className={this.props.entries.loading ? 'loader' : ''}></div>
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

export default connect(mapStateToProps,mapDispatchToProps)(Loading);
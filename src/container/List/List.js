import React, { Component } from 'react';

import EntryContainer from "../../components/EntryContainer/EntryContainer";

class List extends Component {



    constructor(props) {
        super(props);
    }


    render () {
        return (
            <div className="List">
                <EntryContainer deleteEntry={this.props.deleteEntry} entrySaved={this.props.entrySaved} keyHandler={this.props.addEntry} entries={this.props.entries} loading={this.props.load}></EntryContainer>
            </div>
        );
    }
}


export default List;










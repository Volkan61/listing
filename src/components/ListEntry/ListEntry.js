import React, { Component } from 'react';

import './ListEntry.css';

class ListEntry extends Component {

    delete = (newContent) => {
        console.log('asdasdas')
    }


    render () {

        var output;


           output = (
               <div className="ListEntry">

             <div className="TextAlign">
             <input type="checkbox" onClick={()=>this.props.deleteEntry(this.props.keyId)}/> {this.props.text}</div>
                   {this.props.status}
               </div>
           );

        return output
    }
}
export default ListEntry;
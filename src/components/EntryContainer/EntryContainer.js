import React, { Component } from 'react';

import './EntryContainer.css';
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar/Avatar";
import FolderIcon from "@material-ui/core/SvgIcon/SvgIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton/IconButton";
import ListEntry from "../ListEntry/ListEntry";
import * as actionTypes from "../../store/actions";
import connect from "react-redux/es/connect/connect";


class EntryContainer extends Component {


    render () {


        const entries = this.props.entries.map(
            post => {

            console.log(post);
                    return  (<ListEntry deleteEntry = {this.props.deleteEntry} key={post.id} keyId={post.id} text={post.text}>
                        </ListEntry>)
            }
        );


        const entriesReversed = entries.reverse();
        var output;
        if(this.props.loading==true) {
            output=(<div>Wird geladen...</div>)
        }
        else
        {
            output=(<div className="Entries">{entriesReversed}</div>)
        }

        var input;

        if(this.props.entrySaved==true) {
            input='wird gespeichert...';
        }
        else
            input='';

        return (
            <div className="MarginContainer">
            <div className="EntryContainer">
                <div className="Input">
                    <input  disabled={this.props.entrySaved} className="InputField" type="text" onKeyPress={this.props.keyHandler} />
                    {input}
                </div>
                {output}
            </div>
            </div>
        );
    }
}



export default EntryContainer;
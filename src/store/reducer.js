import * as actionsTypes  from './actions';
import EntryContainer from "../components/EntryContainer/EntryContainer";
import {combineReducers} from 'redux';

const initialState = {
    loading:true,
    entrySaved: false,
    entries: [],
    choosenListId:null
}


const reducer = (state= initialState, action) => {
    switch (action.type) {
        case actionsTypes.ADD_:
            return {
                ...state,
                entries: [...state.entries, action.newItem]
                   };

        case actionsTypes.SETENTRIES:
        return {
            ...state,
            entries: action.payload
        };

        case actionsTypes.SETENTRYSAVED:
            return {
                ...state,
                entrySaved: action.payload
            };

        case actionsTypes.SETLOADING:
            return {
                ...state,
                loading: action.payload
            };

        case actionsTypes.SETLISTID:
            return {
                ...state,
                choosenListId: action.payload
            };


        default: // need this for default case
            return state;
    }
}

export default reducer;


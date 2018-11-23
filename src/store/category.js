import * as actionsTypes  from './actions';
import EntryContainer from "../components/EntryContainer/EntryContainer";
import {combineReducers} from 'redux';

const initialState = {

    parentId: null,
    inputValue: "",
    categories: [],
    isLoading: true,
    createList:false,

}


const category = (state= initialState, action) => {
    switch (action.type) {
        case actionsTypes.ADDTOCATEGORIES:
            return {
                ...state,
                categories: [...state.categories, {"text":action.newItem}]
            };

        case actionsTypes.SETCATEGORIES:
            return {
                ...state,
                categories: action.payload
            };

        case actionsTypes.SETPARENTID:
            return {
                ...state,
                parentId: action.payload
            };

        case actionsTypes.CHANGEINPUTVALUE:
            return {
                ...state,
                inputValue: action.payload
            };

        case actionsTypes.CHANGEISLOADING:
            return {
                ...state,
                isLoading: action.payload
            };

        case actionsTypes.CREATELIST:
            return {
                ...state,
                createList: action.payload
            };

        default: // need this for default case
            return state;
    }
}

export default category;


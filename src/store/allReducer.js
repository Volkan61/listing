import {combineReducers} from 'redux';
import reducer from './reducer';

import category from './category';

const allReducers = combineReducers({
    entries: reducer,
    categories: category

});

export default allReducers;
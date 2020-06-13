import { combineReducers } from 'redux';

import currentUser from './currentUser';
import chats from './chats';
import errors from './errors';

const rootReducer = combineReducers({
    currentUser,
    errors,
    chats,
});

export default rootReducer;
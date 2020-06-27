import { combineReducers } from 'redux';

import currentUser from './currentUser';
import chats from './chats';
import errors from './errors';
import conversation from './conversation';

const rootReducer = combineReducers({
    currentUser,
    errors,
    chats,
    conversation,
});

export default rootReducer;
import { combineReducers } from 'redux';

import currentUser from './currentUser';
import errors from './errors';
import serverKey from './serverKey';

const rootReducer = combineReducers({
    currentUser,
    errors,
    serverKey,
});

export default rootReducer;
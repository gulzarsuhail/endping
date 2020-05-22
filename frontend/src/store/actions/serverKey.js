import { SET_SERVER_PUBLIC_KEY } from '../actionTypes';

export const setServerPublicKey = key => ({
    type: SET_SERVER_PUBLIC_KEY,
    key
});
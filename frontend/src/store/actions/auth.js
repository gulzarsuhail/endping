import { apiCall } from '../../services/api';
import { genKeyPair } from '../../services/generateKeyPair';
import { privateDecryptUsingKey } from '../../services/encrypt';

// #TODO: Move this somewhere else
import { generateTextFile } from '../../services/generateTextFile';

import { SET_CURRENT_USER } from '../actionTypes';
import { addError, removeError } from './errors';
import { setServerPublicKey } from './serverKey';

export function setCurrentUser (user) {
    return {
        type: SET_CURRENT_USER,
        user
    }
}

export function loginUser(userData) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall ("/api/auth/login","POST", userData)
            .then(({token, ...user}) => {
                localStorage.setItem("jwtToken", token);
                dispatch(setCurrentUser(user));
                dispatch(removeError());
                resolve();
            })
            .catch (err => {
                dispatch(addError(err));
                reject();
            });
        });
    }
}

export function signupUser(username) {
    return dispatch => {
        return new Promise ((resolve, reject) => {
            return apiCall(`/api/auth/signup/${username}`, "GET")
            .then(res => genKeyPair())
            .then(([pubKey, priKey]) => {
                return new Promise ((resolve, reject) => {
                    const body = {
                        username,
                        pubKey: pubKey
                    }
                    apiCall("/api/auth/signup", "POST", body)
                    .then(user => resolve({...user, priKey}))
                    .catch(err => reject(err));
                });
            })
            .then(({priKey, username, _id, token, server_key}) => {
                localStorage.setItem("jwtToken", token);
                dispatch(setCurrentUser({
                    username,
                    _id,
                    token
                }));

                const serverPublicKey = privateDecryptUsingKey(priKey, server_key);
                localStorage.setItem("serverPublicKey", serverPublicKey);
                dispatch(setServerPublicKey(serverPublicKey));

                generateTextFile(priKey, `${username}_endping.pem`)
                resolve();

            }).catch(err => {
                reject();
            });
        });
    }
}
import { apiCall } from '../../services/api';
import { genKeyPair } from '../../services/generateKeyPair';
import { setServerKey, setPrivateKey, privateDecryptUsingAuthKey, privateEncryptUsingAuthKey } from '../../services/encrypt';

// #TODO: Move this somewhere else
import { generateTextFile } from '../../services/generateTextFile';

import { SET_CURRENT_USER } from '../actionTypes';
import { setLoginError } from './errors';
import { setApiTokenHeader } from '../../services/api';
import { setChats } from './chats';

export function setCurrentUser (user) {
    return {
        type: SET_CURRENT_USER,
        user
    }
}

export function setAuthorizationToken(token) {
    setApiTokenHeader(token);
}

export function setAuthServerPublicKey (server_key) {
    setServerKey(server_key);
}

export function setAuthPrivateKey (priKey) {
    setPrivateKey(priKey);
}


export function loginUser(userData) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall (`/api/auth/login/${userData.username}`,"GET")
            .then(({_id, challenge}) => {
                try {
                    setAuthPrivateKey(userData.priKey);
                    const decryptedSoln = privateDecryptUsingAuthKey(challenge);
                    const challengeSoln = privateEncryptUsingAuthKey(decryptedSoln);
                    return apiCall ("/api/auth/login", "POST", {
                        challengeSoln, _id, username: userData.username
                    });
                } catch (err) {
                    throw new Error("Username or key file invalid");
                }

            })
            .then(user => userLoggedInHandler(dispatch, [userData.priKey, user]))
            .then (() => resolve())
            .catch(err => {
                dispatch(setLoginError(err.message));
                reject();
            });

        });
    }
}

export function signupUser(username) {
    return dispatch => {
        return new Promise ((resolve, reject) => {
            return apiCall(`/api/auth/signup/${username}`, "GET")
            .then(() => genKeyPair())
            .then(([pubKey, priKey]) => {
                return new Promise ((resolve, reject) => {
                    const body = {
                        username,
                        pubKey
                    }
                    apiCall("/api/auth/signup", "POST", body)
                    .then(user => resolve([priKey, user]))
                    .catch(err => reject(err));
                });
            })
            .then(userAuth => userLoggedInHandler(dispatch, userAuth))
            .then((priKey) => {
                generateTextFile(priKey, `${username}_endping.pem`);
                resolve();
            }).catch(err => {
                dispatch(setLoginError(err.message))
                reject();
            });
        });
    }
}

export function logoutUser () {
    return dispatch => {
        localStorage.clear();
        dispatch(setCurrentUser({}));
        dispatch(setChats([]));
        setAuthorizationToken(false);
    }
}

function userLoggedInHandler (dispatch, [priKey, {user, token, server_key}]) {
    return new Promise ((resolve, reject) => {
        try {

            // set private key
            setAuthPrivateKey(priKey);
            // save the user personal key
            localStorage.setItem("priKey", priKey);

            // authorize further api calls
            setAuthorizationToken(token);
            // save the user token to local storage
            localStorage.setItem("jwtToken", token);            

            // decrypt the server public key
            const serverPublicKey = privateDecryptUsingAuthKey(server_key);
            // save server public key in local storage
            localStorage.setItem("serverKey", serverPublicKey);

            dispatch(setLoginError(null));

            // set the current user
            dispatch(setCurrentUser(user));
            
            resolve(priKey);
        
        }catch(err) {
            reject("An error occured");
        }     
    });
}
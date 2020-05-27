import { apiCall } from '../../services/api';
import { genKeyPair } from '../../services/generateKeyPair';
import { privateDecryptUsingKey, privateEncryptUsingKey } from '../../services/encrypt';

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
            return apiCall (`/api/auth/login/${userData.username}`,"GET")
            .then(({_id, challenge}) => {
                try {
                    const decryptedSoln = privateDecryptUsingKey(userData.priKey, challenge);
                    const challengeSoln = privateEncryptUsingKey(userData.priKey, decryptedSoln);
                    return apiCall ("/api/auth/login", "POST", {
                        challengeSoln, _id, username: userData.username
                    });
                } catch (err) {
                    throw new Error("Username or key file invalid");
                }
            }).then (({username, _id, token, server_key}) => {
                // save the user token
                localStorage.setItem("jwtToken", token);
                // save the private key
                localStorage.setItem("priKey", userData.priKey);
                // save user to redux
                dispatch(setCurrentUser({
                    username,
                    _id,
                    token,
                    priKey: userData.priKey
                }));
                // save the server public key
                const serverPublicKey = privateDecryptUsingKey(userData.priKey, server_key);
                // save server public key to redux
                localStorage.setItem("serverPublicKey", serverPublicKey);
                dispatch(setServerPublicKey(serverPublicKey));
                dispatch(removeError());
                resolve();
            }).catch(err => {
                dispatch(addError(err.message));
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

                // save the user token
                localStorage.setItem("jwtToken", token);
                dispatch(setCurrentUser({
                    username,
                    _id,
                    token,
                    priKey
                }));

                // save private key to localstorage
                localStorage.setItem("priKey", priKey);

                // save the server public key
                const serverPublicKey = privateDecryptUsingKey(priKey, server_key);
                localStorage.setItem("serverPublicKey", serverPublicKey);
                dispatch(setServerPublicKey(serverPublicKey));

                dispatch(removeError());

                generateTextFile(priKey, `${username}_endping.pem`);
                resolve();

            }).catch(err => {
                dispatch(addError(err))
                reject();
            });
        });
    }
}

export function logoutUser () {
    return dispatch => {
        localStorage.clear();
        dispatch(setCurrentUser({}));
    }
}
const API_ENDPOINT = "http://localhost:3002"

const headers = {
    'Content-Type': 'application/json'
}

export const setApiTokenHeader = token => {
    if (token)
        headers['Authorization'] = `Bearer ${token}`;
    else
        delete headers['Authorization'];
}

export function apiCall (path, method, data) {
    return new Promise((resolve, reject) => {
        fetch(API_ENDPOINT + path, 
        {
            method,
            headers,
            body: JSON.stringify(data)
        })
        .then(response => {
            return new Promise ((resolveResponse, rejectResponse) => {
                if (response.status === 200) {
                    return resolve(response.json());
                }
                rejectResponse(response.json())    
            })
        })
        .catch(err => err)
        .then (({error}) => {
            reject(error)
        });
    });   
}
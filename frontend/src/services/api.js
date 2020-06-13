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
        console.log("API CALL TO " + path)
        fetch(API_ENDPOINT + path, 
        {
            method,
            headers,
            body: JSON.stringify(data)
        })
        .then(response => {
            return new Promise ((resolveResponse, rejectResponse) => {
                if (response.status === 200) {
                   resolveResponse(response);
                } else {
                    rejectResponse(response.json());
                }
            })
        })
        .then (response => response.json())
        .then (result => resolve(result))
        .catch(err =>  {
            err.then(error => {
                console.log("ERRROR")
                console.log(error)
                reject(error)
            });
        });
    });   
}
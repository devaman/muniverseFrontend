// import config from 'config';
//import { authHeader } from '../Helpers';
//const config  = "hello";
// import axios from 'axios';

export const userService = {
    login,
    // logout,
    // register,
    // getAll,
    // getById,
    // update,
    // delete: _delete
};

function login(userName, password) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userName, password })
    };

    return fetch('http://localhost:3003/api/v1/auth/login', requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user.data.token) {
                localStorage.setItem('user', JSON.stringify(user.data));
            }
            return user;
        });
}

// function logout() {
//     // remove user from local storage to log user out
//     localStorage.removeItem('user');
// }

// function getAll() {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     return fetch('${config.apiUrl}/users', requestOptions).then(handleResponse);
// }

// function getById(id) {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     return fetch('${config.apiUrl}/users/${id}', requestOptions).then(handleResponse);
// }

// function register(user) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };

//     return fetch('${config.apiUrl}/users/register', requestOptions).then(handleResponse);
// }

// function update(user) {
//     const requestOptions = {
//         method: 'PUT',
//         headers: { ...authHeader(), 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };

//     return fetch('${config.apiUrl}/users/${user.id}', requestOptions).then(handleResponse);;
// }

// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//     const requestOptions = {
//         method: 'DELETE',
//         headers: authHeader()
//     };

//     return fetch('${config.apiUrl}/users/${id}', requestOptions).then(handleResponse);
// }

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok || data.statusCode === 400) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
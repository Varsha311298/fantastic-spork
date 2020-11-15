import * as ActionTypes from './ActionTypes';
import { baseUrl, user_key, userUrl } from './config';
import { getToken } from '../Authorisation';

export const setUser = (details) => ({
    type: ActionTypes.SET_USER,
    payload: details
});

export const logout = () => ({
    type: ActionTypes.LOGOUT
});

export const registerUser = (firstname, lastname, email, password) => (dispatch) => {
    const newUser = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
    }
    newUser.date = new Date().toISOString();

    return fetch(userUrl + '/register', {
        method: 'POST',
        mode: "cors",
        cache: "no-cache",
        body: JSON.stringify(newUser),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error' + response.status + ": " + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => {
            if (response.status) {
                console.log('New User ', response);
                alert('Successfully registered! Please Login.');
            }
        })
        .catch(error => {
            console.log('Registeration failed: ', error.message);
            alert('Registeration failed: ' + error.message);
        })
}

export const loginUser = (email, password) => (dispatch) => {
    const user = {
        email: email,
        password: password
    }
    console.log(user);
    return fetch(userUrl + '/login', {
        method: 'POST',
        mode: "cors",
        cache: "no-cache",
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error' + response.status + ": " + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => {

            console.log('Logged In: ', response);
            if (response.status === false)
                alert(response.message)
            else {
                localStorage.setItem('token', response.auth_token);
                localStorage.setItem('name', response.firstname);
                dispatch(setUser(response));
                alert("Hello , " + response.firstname + " " + response.lastname);
            }
        })
        .catch(error => {
            console.log('Login failed: ', error.message);
            alert('Login failed: ' + error.message);
        });
}

export const logoutUser = () => (dispatch) => {
    localStorage.clear();
    dispatch(logout());
}

export const setRestaurants = (details) => ({
    type: ActionTypes.SET_RESTAURANTS,
    payload: details
});

export const fetchOrder = (details) => ({
    type: ActionTypes.FETCH_ORDERS,
    payload: details
});

export const setOrder = (items, rest) => (dispatch) => {
    items.map((item, id) => {
        item['restaurant'] = rest
    });
    const newOrder = {
        items: items,
        date: new Date().toISOString()
    }
    console.log(newOrder);
    return fetch(baseUrl + '/create', {
        method: 'POST',
        mode: "cors",
        cache: "no-cache",
        body: JSON.stringify(newOrder),
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => { console.log(response); dispatch(fetchOrder(response['output'])); alert("Order successfull :" + JSON.stringify(response)); })
        .catch(error => {
            console.log('Post comments ', error.message);
            alert('Your comment could not be posted: ' + error.message);
        })
}

export const getRestaurants = (lat, lon) => (dispatch) => {
    console.log(lat, lon);
    return fetch('https://developers.zomato.com/api/v2.1/search?count=20&lat=' + lat + '&lon=' + lon, {
        method: 'GET',
        headers: {
            'user-key': user_key
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error' + response.status + ": " + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => {
            console.log('Post Feedback ', response.restaurants);
            alert('Restaurants are based on current location');
            dispatch(setRestaurants(response.restaurants));
        })
        .catch(error => {
            console.log('Post Feedback ', error.message);
            alert('Your feedback could not be posted: ' + error.message);
        })
}

export const fetchOrders = () => (dispatch) => {

    return fetch( baseUrl+ '/fetch' , {
        method: 'GET',
        mode: "cors",
        cache: "no-cache",
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
            if (response.ok)
            {
                return response;
            }
            else {
                var error = new Error('Error' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
    },
    error => {
        throw error;
    }
    )
    .then(response => response.json())
    .then(response => {
        console.log(response['output']);
        dispatch(fetchOrder(response['output']));
    })
    .catch(error => console.log(error.message));
}

// export const saveOrder = () => {

//     return fetch(baseUrl + '/create', {
//         method: 'POST',
//         headers: {
//             'Authorization': `Bearer ${getToken()}`,
//             'Content-Type': 'application/json'
//         },
//         credentials: 'same-origin'
//     })
//         .then(response => {
//             if (response.ok) {
//                 return response;
//             }
//             else {
//                 var error = new Error('Error' + response.status + ": " + response.statusText);
//                 error.response = response;
//                 throw error;
//             }
//         },
//             error => {
//                 var errmess = new Error(error.message);
//                 throw error;
//             })
//         .then(response => response.json())
//         .then(response => {
//             console.log('Post Feedback ', response);
//             alert('Thank you for your feedback: ' + JSON.stringify(response));
//         })
//         .catch(error => {
//             console.log('Post Feedback ', error.message);
//             alert('Your feedback could not be posted: ' + error.message);
//         })

// }
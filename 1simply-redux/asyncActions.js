const redux = require('redux');
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');
const createStore = redux.createStore;
const applyMiddleware = require('redux').applyMiddleware;

const initialState = {
    loading: false, 
    users: [],
    errors: ''
};

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUESTED
    }
};

const fetchUsersSuccess = (data) => {
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: data
    }
};

const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILED,
        payload: error
    }
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USERS_REQUESTED:
            return {
                ...state,
                loading: true
            };
        case FETCH_USERS_SUCCEEDED:
            return {
                loading: false,
                users: action.payload,
                errors: ''
            };
        case FETCH_USERS_FAILED:
            return {
                loading: false,
                users: [],
                errors: action.payload
            };
    }
}

const fetchUsers = () => {
    //Thunk middleware allows the action creator 
    //to return a function instead of an action object.
    //This functino doesn't have to be pure.
    return function(dispatch) {
    //By receiving the dispatch method as an argument
    //this function can dispatch actions.
        dispatch(fetchUsersRequest());
        
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                const users = response.data.map(user => user.id);
                dispatch(fetchUsersSuccess(users));
            })
            .catch(err => {
                dispatch(fetchUsersFailure(err.message));
            })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => console.log(store.getState()));

store.dispatch(fetchUsers());
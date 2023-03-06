const configureStore = require('@reduxjs/toolkit').configureStore;
const cakeReducer = require('./features/cake/cakeSlice');
const brownieReducer = require('./features/brownie/brownieSlice');
const userReducer = require ('./features/user/userSlice');

const store = configureStore({
    reducer: {
        cake: cakeReducer,
        brownie: brownieReducer,
        user: userReducer
    }
});

module.exports = store;

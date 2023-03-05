const configureStore = require('@reduxjs/toolkit').configureStore;
const cakeReducer = require('./features/cake/cakeSlice');
const brownieReducer = require('./features/brownie/brownieSlice');

const store = configureStore({
    reducer: {
        cake: cakeReducer,
        brownie: brownieReducer
    }
});

module.exports = store;

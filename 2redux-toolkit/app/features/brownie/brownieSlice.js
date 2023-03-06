const { cakeActions } = require('../cake/cakeSlice.js');

const createSlice = require('@reduxjs/toolkit').createSlice;

const initialState = {
    numOfBrownie: 20
}

const brownieSlice = createSlice({
    name: 'brownie',
    initialState,
    reducers: {
        ordered: (state) => {
            state.numOfBrownie--;
        },
        restocked: (state, action) => {
            state.numOfBrownie += action.payload;
        }
    },
    // extraReducers: {
    //     ['cake/ordered']: (state) => {
    //         state.numOfBrownie--;
    //     }
    // }
    extraReducers: (builder) => {
        builder.addCase(cakeActions.ordered, (state) => {
            state.numOfBrownie--;
        })
    }
});

module.exports = brownieSlice.reducer;
module.exports.brownieActions = brownieSlice.actions;
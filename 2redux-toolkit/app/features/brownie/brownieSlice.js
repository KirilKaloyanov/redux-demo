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
    }
});

module.exports = brownieSlice.reducer;
module.exports.brownieActions = brownieSlice.actions;
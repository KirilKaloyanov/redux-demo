const store = require('./app/store.js');
const cakeActions = require('./app/features/cake/cakeSlice').cakeActions;
const brownieActions = require('./app/features/brownie/brownieSlice').brownieActions;

console.log('Initial state', store.getState());

const unsubscribe = store.subscribe(() => {
    console.log('Updated state', store.getState());
});

store.dispatch(cakeActions.ordered());
store.dispatch(cakeActions.ordered());
store.dispatch(cakeActions.ordered());
store.dispatch(cakeActions.restocked(3));
store.dispatch(brownieActions.ordered());
store.dispatch(brownieActions.ordered());
store.dispatch(brownieActions.ordered());
store.dispatch(brownieActions.restocked(3));

unsubscribe();
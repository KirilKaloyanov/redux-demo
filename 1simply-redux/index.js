const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';

//Action creators have to be pure functions
function orderCake() {
    return {
        type: CAKE_ORDERED, 
        payload: 1
    }
} 

function cakeRestocked(qty) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty
    }
}

function orderIceCream() {
    return {
        type: ICECREAM_ORDERED, 
        payload: 1
    }
} 

function iceCreamRestocked(qty) {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty
    }
}

const initialCakeState = {
    numOfCakes: 10
}

const initialIceCreamState = {
    numOfIceCreams: 20
}

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }
        default:
            return state;
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case ICECREAM_ORDERED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1
            }
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.payload
            }
        case CAKE_ORDERED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

const store = createStore(rootReducer);
console.log('Initial store', store.getState());

const unsubscribe = store.subscribe(() => console.log('Updated state: ', store.getState()));

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(cakeRestocked(3));

const actions = bindActionCreators({orderCake, cakeRestocked, orderIceCream, iceCreamRestocked}, store.dispatch);

actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.cakeRestocked(3);
actions.orderIceCream();
actions.orderIceCream();
actions.orderIceCream();
actions.iceCreamRestocked(3);

unsubscribe();

const redux = require('redux');
const createStore = redux.createStore
// For combining multiple reducers
const combineReducers = redux.combineReducers 


//*  An 'Action' is an object with 'type' property
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM= "BUY_ICECREAM";
// * ----------------------Action Creators-------------------
function buyCake() {
  return {
    type: BUY_CAKE,
    info: "First Redux Action",
  };
}
function buyIceCream() {
    return {
      type: BUY_ICECREAM,
    };
  }
//* ---------------Initial States-----------------------------
const initialCakeState = {
  numOfCakes: 10,
};
const initialIceCreamState = {
    numOfIceCreams:20
  };
// * ----------------------Reducers---------------------------
const CakeReducers = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state, //! copying state
        numOfCakes: state.numOfCakes - 1, //* changing those attributes that we want to change
      };
    default:
      return state;
  }
};
const IceCreamReducers = (state = initialIceCreamState, action) => {
    switch (action.type) {
      case BUY_ICECREAM:
      return {
          ...state, //! copying state
          numOfIceCreams: state.numOfIceCreams - 1, //* changing those attributes that we want to change
      };
      default:
        return state;
    }
  };

// * -----------------Combine Multiple Reducers-----------------
// This method accepts an object
const rootReducer = combineReducers({
    cake:CakeReducers,
    iceCream:IceCreamReducers

})
//*  -----------------------Store-------------------------------
// ? Creating STORE
const store = createStore(rootReducer)
console.log('Initial State: ', store.getState())
const unsubscribe = store.subscribe(()=>console.log('Updated State : ',store.getState()))
store.dispatch(buyCake()); // Notice the parentheses to call the function
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());

unsubscribe()

// * OUTPUT :
// Initial State:  { numOfCakes: 10 }
// Updated State :  { numOfCakes: 9 }
// Updated State :  { numOfCakes: 8 }
// Updated State :  { numOfCakes: 7 }
// Updated State :  { numOfCakes: 6 }
const redux = require('redux');
const createStore = redux.createStore
//* ---- creating first action in redux ----
// const BUY_CAKE = 'BUY_CAKE'
// {
//     type:BUY_CAKE,
//     info:'First Redux Action'
// }
// 'Action creator' is just a function that returns the action
// function buyCake ()
// {

// }
//*  An 'Action' is an object with 'type' property
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM= "BUY_ICECREAM";
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
//* Initial State

const initialState = {
  numOfCakes: 10,
  numOfIceCreams:20
};
//? REDUCERS  (prevState , action) =>
// * here everytim a new object is returned , prev state in not changed in place
const reducers = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state, //! copying state
        numOfCakes: state.numOfCakes - 1, //* changing those attributes that we want to change
      };

    case BUY_ICECREAM:
    return {
        ...state, //! copying state
        numOfIceCreams: state.numOfIceCreams - 1, //* changing those attributes that we want to change
    };
    default:
      return state;
  }
};

// ? Creating STORE
const store = createStore(reducers)
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
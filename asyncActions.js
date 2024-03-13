const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware; // Corrected name
// Middleware
const thunkMiddleware = require("redux-thunk").default; // Import and access the default export
// Axios
const axios = require("axios");
const initialState = {
  loading: false,
  data: [],
  error: "",
};
// Actions
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";
// Action Creators
const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};
const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};
const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};
// Redux thunk helps to return a 'function' instead of object
// Can do Async API calls
const fetchUsers = () => {
  return function (dispatch) {
    // Dispatch the action creator function
    dispatch(fetchUsersRequest());

    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const users = res.data.slice(0, 6);
        dispatch(fetchUsersSuccess(users));
      })
      .catch((err) => {
        dispatch(fetchUsersFailure(err.message));
      });
  };
};
// Reducer Function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
// Making Store
const store = createStore(reducer, applyMiddleware(thunkMiddleware)); // Corrected usage of applyMiddleware
store.subscribe(() => console.log("State : ", store.getState()));
store.dispatch(fetchUsers());

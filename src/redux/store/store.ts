import {configureStore} from '@reduxjs/toolkit';
import todoReducer from '../features/todo/todoSlice';

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

// react-redux --------------------------

// import {createStore} from 'redux';
// import todoReducer from '../reducers/todoReducer';

// const store = createStore(todoReducer);

// export default store;

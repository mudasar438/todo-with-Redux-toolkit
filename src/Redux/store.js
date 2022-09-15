import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './TodoSlice/todoSlice';
 

export const store = configureStore({
    // in this Reducer all root reducer cover which is called using useSelector hooks
reducer:{
    tasks: todoReducer,
}

});
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  todo: "",
  allTodo: [],
};

// create a todoSlice
const todoSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // add reducer
    addTodo: (state, action) => {
      const newTask = {
        id: new Date(),
        name: action.payload.task,
      };
      state.allTodo.push(newTask);
    },
    // delete reducer
    deleteTask: (state, action) => {
      return {
        ...state,
        allTodo: state.allTodo.filter((item) => {
          return item.id !== action.payload.id;
        }),
      };
    },
    // Edit reducer
    EditTask: (state, action) => {
      const { id, name } = action.payload;

      const existingTodo = state.allTodo.find((item) => item.id === id);

      if (existingTodo) {
        existingTodo.name = name;
      }

      console.log("state", state.allTodo);
    },
  },
});

export const { addTodo, deleteTask, EditTask } = todoSlice.actions;
export default todoSlice.reducer;

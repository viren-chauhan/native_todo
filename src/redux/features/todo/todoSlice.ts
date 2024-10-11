import { createSlice } from '@reduxjs/toolkit';

type TaskType = {
  id: number;
  task: string;
  completed: boolean;
};

const initialState: any = {
    todos: []
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state: any, actions) => {
      // 
      console.log("STATE : ", state, actions);
      return state;
      return [...state, actions.payload];
    },

    removeTodo: (state: any, actions) => {
      return state.filter((item: any) => item.id !== actions.payload)
    },

    updateTodo: (state: any, actions) => {
      let data = state.filter((i: any) => i.id === actions.payload.id)
      state = state.filter((i: any) => i.id !== data[0].id)
      return [actions.payload, ...state]
    },

    setAllTask: (state: any, actions) => {
      return state = actions.payload
    },

    default: (state: any) => {
      return state;
    },
  },
});

export const { addTodo, removeTodo, updateTodo, setAllTask } = todoSlice.actions;
export default todoSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';

type TaskType = {
  id: number;
  task: string;
  completed: boolean;
};

const initialState: TaskType[] = [
  
];

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state: any, actions) => {
      return [...state, actions.payload];
    },

    removeTodo : (state:any, actions) => {
    //  return state.filter((i:any) => !i.id.includes(actions.payload))
    return state.filter((item:any) => item.id !== actions.payload)
    },

    updateTodo : (state:any, actions) => {
      let data = state.filter((i:any) => i.id === actions.payload.id)
      state = state.filter((i:any) => i.id !== data[0].id)
      return [actions.payload,...state]
    },

    updateState: (state:any, actions) => {
      let data = state.filter((i:any) => i.id === actions.payload.id)
      state = state.filter((i:any) => i.id !== data[0].id)
      return [...state, actions.payload]
    },

    // setTodo : (state:any, actions) => {
    //   return data = 
    // }

    default: (state: any) => {
      return state;
    },
  },
});

export const {addTodo, removeTodo, updateTodo, updateState} = todoSlice.actions;
export default todoSlice.reducer;

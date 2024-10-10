import { useSelector, useDispatch } from "react-redux";
import { addTodo, removeTodo, updateState, updateTodo } from "../redux/features/todo/todoSlice";

const useTodos = ()=> {
    const dispatch = useDispatch();
    
    const data = useSelector((state:any) => state.todo);

    const createTodo = (newTask : any)=>{
        dispatch(addTodo(newTask));
    }

    const deleteTodo = (id:number) => {
        dispatch(removeTodo(id))
    }

    const editTodo = (id:any) => {
        dispatch(updateTodo(id))
    }
    
    const updateStatus = (id:any) => {
        dispatch(updateState(id))
    }

    return {data, createTodo, deleteTodo, editTodo, updateStatus};
}

export default useTodos
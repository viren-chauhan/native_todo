import { useSelector, useDispatch } from "react-redux";
import { addTodo, removeTodo, updateTodo, setAllTask } from "../redux/features/todo/todoSlice";

const useTodos = () => {
    const dispatch = useDispatch();

    const data = useSelector((state: any) => state.todo);

    const createTodo = (newTask: any) => {
        dispatch(addTodo(newTask));
    }

    const deleteTodo = (id: number) => {
        dispatch(removeTodo(id))
    }

    const editTodo = (data: any) => {
        dispatch(updateTodo(data))
    }

    const setTodo = (data: any) => {
        dispatch(setAllTask(data))
    }


    return { data, createTodo, deleteTodo, editTodo, setTodo };
}

export default useTodos
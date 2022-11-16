import { Todo } from '../../../model/Todo';
import {useState, KeyboardEvent} from 'react'

export type ElementProps = {
    todo: Todo;
    removeTodo: (nameTodo: Todo) => void;
    checkTodo:(id: number) => void;
    updateTodo:(newLabelTodo: string, id: number) => void;
};

function TodoElement({todo, removeTodo, checkTodo, updateTodo} : ElementProps) {

    var ENTER_KEY = "Enter";
    var ECHAP_KEY = "Escape";

    const [editingMode, setEditingMode] = useState(false);
    
    const handleUpdatedDone = (event: KeyboardEvent<HTMLInputElement>, id :number) => {
        if (event.key === ENTER_KEY) {
            const newLabelTodo = event.currentTarget.value;
            if(newLabelTodo.trim()) {
                updateTodo(newLabelTodo, id);
            } else {
                removeTodo(todo);
            }
            setEditingMode(false);
        } else if (event.key === ECHAP_KEY){
            setEditingMode(false);
        }
    }

    return (
        <li
            onDoubleClick = {() => setEditingMode(true)}
            className = {`${editingMode ? "editing" : ""} ${todo.completed ? "completed" : ""}`}>
            <div className='view'>
                <input
                    className = "toggle"
                    type = "checkbox"
                    checked = {todo.completed}
                    onChange = {() => checkTodo(todo.id)}
                />
                <label>{todo.libelle}</label>
                <button
                    className= "destroy"
                    onClick={() => removeTodo(todo)}>
                </button>
            </div>
            {editingMode && (
                <input
                    defaultValue={todo.libelle}
                    autoFocus
                    onKeyDown={(event) => handleUpdatedDone(event, todo.id)}
                    className = "edit">
                </input>)
            }
        </li>
    )
}

export default TodoElement;
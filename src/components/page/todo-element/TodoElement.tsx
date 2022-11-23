import { Todo } from '../../../model/Todo';
import {useState, KeyboardEvent} from 'react'

export type ElementProps = {
    todo: Todo;
    removeTodo: (nameTodo: Todo) => void;
    checkTodo:(todo: Todo) => void;
    updateTodo:(todo: Todo, newLabelTodo: string) => void;
};

function TodoElement({todo, removeTodo, checkTodo, updateTodo} : ElementProps) {

    var ENTER_KEY = "Enter";
    var ECHAP_KEY = "Escape";

    const [editingMode, setEditingMode] = useState(false);
    
    const handleUpdatedDone = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === ENTER_KEY) {
            const newLabelTodo = event.currentTarget.value;
            if(newLabelTodo.trim()) {
                updateTodo(todo, newLabelTodo);
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
            className = {`${editingMode ? "editing" : ""} ${todo.completed ? "completed" : ""}`}
            role="menuitem">
            <div className='view'>
                <input
                    className = "toggle"
                    type = "checkbox"
                    role = "menuitemcheckbox"
                    checked = {todo.completed}
                    onChange = {() => checkTodo(todo)}
                />
                <label>{todo.title}</label>
                <button
                    className= "destroy"
                    onClick={() => removeTodo(todo)}>
                </button>
            </div>
            {editingMode && (
                <input
                    role="combobox"
                    defaultValue={todo.title}
                    autoFocus
                    onKeyDown={(event) => handleUpdatedDone(event)}
                    className = "edit">
                </input>)
            }
        </li>
    )
}

export default TodoElement;
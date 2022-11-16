import {useState, ChangeEvent, KeyboardEvent} from 'react'

export type TaskInputProps = {
    placeholder: string;
    onSave: (nameTodo: string) => void;
};

function TodoInput({placeholder, onSave} : TaskInputProps){

    const [input, setInput] = useState('');

    var ENTER_KEY = "Enter";

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    }

    const addTodo = (event: KeyboardEvent<HTMLInputElement>) =>  {
        if (event.key === ENTER_KEY) {
            const newTodoLabel = event.currentTarget.value;
            if(newTodoLabel.trim()) {
                setInput('');
                onSave(newTodoLabel);  
            }
        }
    }

    return (
        <input
            value={input}
            placeholder = {placeholder}
            onKeyDown = {addTodo}
            onChange = {onChange}
            autoFocus = {true}
            className = "new-todo">
        </input>
    );
}

export default TodoInput;

import TodoElement from '../todo-element/TodoElement';
import { Todo } from '../../../model/Todo';

export type ListProps = {
    listTodos: Todo[];
    removeTodo: (nameTodo: Todo) => void;
    checkTodo:(id: number) => void;
    updateTodo:(newLabelTodo: string, id: number) => void;
};

function TodoList({listTodos, removeTodo, checkTodo, updateTodo}: ListProps) {
    
    return (
        <ul className='todo-list'>
            {listTodos.map(todo => (
                <TodoElement
                    key={todo.id}
                    todo={todo}
                    removeTodo={(todo) => removeTodo(todo)}
                    checkTodo={(id) => checkTodo(id)}
                    updateTodo={(newLabelTodo, id) => updateTodo(newLabelTodo, id)}
                />
            ))}
        </ul>
    );
}

export default TodoList;
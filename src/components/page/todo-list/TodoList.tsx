import TodoElement from '../todo-element/TodoElement';
import { Todo } from '../../../model/Todo';

export type ListProps = {
    listTodos: Todo[];
    removeTodo: (todo: Todo) => void;
    checkTodo:(todo: Todo) => void;
    updateTodo:(todo: Todo, newLabelTodo: string) => void;
};

function TodoList({listTodos, removeTodo, checkTodo, updateTodo}: ListProps) {
    
    return (
        <ul className='todo-list'>
            {listTodos.map(todo => (
                <TodoElement
                    key={todo.id}
                    todo={todo}
                    removeTodo={(todo) => removeTodo(todo)}
                    checkTodo={(todo) => checkTodo(todo)}
                    updateTodo={(todo, newLabelTodo) => updateTodo(todo, newLabelTodo)}
                />
            ))}
        </ul>
    );
}

export default TodoList;
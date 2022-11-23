import TodoInput from './todo-input/TodoInput';
import {useTodo} from './useTodo.hook'
import Footer from './footer/Footer';
import TodoList from './todo-list/TodoList';

export type PageProps = {
    filter: string;
};

function Page({filter} : PageProps){

    const {
        todos,
        filteredTodos,
        itemsLeft,
        itemsCompleted,
        saveTodo,
        removeTodo,
        updateTodo,
        checkTodo,
        handleMarkAllTodosAsCompleted,
        clearCompletedTodos
    } = useTodo(filter);

    return (
        <section className="todoapp">
            <header className="header">
            <h1>todos</h1>
            <TodoInput
                onSave = {(newTodoLbl : string) => {
                    saveTodo(newTodoLbl);
                }}
                placeholder = 'What needs to be done?'
            />
            </header>
        {todos.length > 0 && (
            <section className="main" role="main">
            <input checked={itemsCompleted === todos.length} onChange={() => handleMarkAllTodosAsCompleted()} id="toggle-all" className="toggle-all" type="checkbox"></input>
            <label htmlFor="toggle-all">Mark all as complete</label>
            <TodoList
                listTodos = {filteredTodos}
                removeTodo={(todoToRemove) => removeTodo(todoToRemove)}
                checkTodo = {(todo) => checkTodo(todo)} 
                updateTodo = {(todo, newLabelTodo) => updateTodo(todo, newLabelTodo)}
            />
            </section>
        )}       
        {todos.length > 0 && (
            <Footer
                itemsLeft = {itemsLeft}
                itemsCompleted = {itemsCompleted}
                clearCompletedTodos = {() => clearCompletedTodos()}
             />
        )}
        </section>
    );
}

export default Page;

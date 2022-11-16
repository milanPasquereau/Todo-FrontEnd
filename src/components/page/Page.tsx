import TodoInput from './todo-input/TodoInput';
import {useTodo} from './useTodo.hook'
import Footer from './footer/Footer';
import TodoList from './todo-list/TodoList';

function Page(){

    const {
        todos,
        filteredTodos,
        allTodosAreCompleted,
        activeFilter,
        itemsLeft,
        itemsCompleted,
        saveTodo,
        removeTodo,
        updateTodo,
        checkTodo,
        handleMarkAllTodosAsCompleted,
        clearCompletedTodos,
        updateActiveFilter
     } = useTodo();

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
            <section className="main">
            <input checked={allTodosAreCompleted} onChange={() => handleMarkAllTodosAsCompleted()} id="toggle-all" className="toggle-all" type="checkbox"></input>
            <label htmlFor="toggle-all">Mark all as complete</label>
            <TodoList
                listTodos = {filteredTodos}
                removeTodo={(todoToRemove) => removeTodo(todoToRemove)}
                checkTodo = {(id) => checkTodo(id)} 
                updateTodo = {(newLabelTodo, id) => updateTodo(newLabelTodo, id)}
            />
            </section>
        )}       
        {todos.length > 0 && (
            <Footer
                itemsLeft = {itemsLeft}
                itemsCompleted = {itemsCompleted}
                activeFilter = {activeFilter}
                clearCompletedTodos = {() => clearCompletedTodos()}
                updateActiveFilter = {(newFilter: string) => updateActiveFilter(newFilter)}
             />
        )}
        </section>
    );
}

export default Page;

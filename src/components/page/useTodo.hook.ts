import {useState} from 'react'
import {Todo} from '../../model/Todo';

export function useTodo(){

    /*  const [todos, setTodos] = useState<Todo[]>(JSON.parse(localStorage.getItem('todos-react') || '[]'));
        const [activeFilter, setActiveFilter] = useState(localStorage.getItem('filter-react') || 'All');*/
    const [todos, setTodos] = useState<Todo[]>([]);
    const [allTodosAreCompleted, setAllTodosCompleted] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All');
    
    const filteredTodos = todos.filter((todo) => {
        switch(activeFilter) {
            case 'Active': return !todo.completed;
            case 'Completed': return todo.completed;
            default: return todo;
        }
      });

    const itemsLeft = todos.filter((todo: Todo) => {
        return !todo.completed;
    }).length;

    const itemsCompleted = todos.filter((todo: Todo) => {
        return todo.completed;
    }).length;

    const saveTodo = (newTodoLbl : string) => {
        if (newTodoLbl.length !== 0) {
            updateTodos([...todos, {
                id: todos[todos.length - 1] ? todos[todos.length - 1].id + 1 : 1,
                libelle: newTodoLbl,
                completed: false,
            }]);
        }
    }

    const checkTodo = (id: number) => {
        const newTodos = todos.map(todo => {
            if(todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        updateTodos(newTodos);
        setAllTodosCompleted(todos.filter(todo => {
            return todo.completed;
        }).length === todos.length);
    }

    const removeTodo = (todoToRemove: Todo) => {
        updateTodos(todos.filter((todo) => {
            return todo.id !== todoToRemove.id;
        }));
    }

    const updateTodo = (newLabelTodo : string, id: number) => {
        updateTodos(todos.map(todo => {
            if(todo.id === id) {
              todo.libelle = newLabelTodo
            }
            return todo;
        }));
    }
      
    const handleMarkAllTodosAsCompleted = () => {
        updateTodos(todos.map(todo => {
            todo.completed = !allTodosAreCompleted;
            return todo;
        }));
        setAllTodosCompleted(!allTodosAreCompleted);
    }

    const updateActiveFilter = (newFilter: string) => {
        setActiveFilter(newFilter);
        //localStorage.setItem('filter-react', JSON.stringify(newFilter));
    }

    const clearCompletedTodos = () => {
        updateTodos(todos.filter((todo) => {
            return !todo.completed;
        }));
    }

    const updateTodos = (newTodos : Todo[]) => {
        setTodos(newTodos);
        //localStorage.setItem('todos-react', JSON.stringify(newTodos));
    }

    return {
        todos,
        filteredTodos,
        allTodosAreCompleted,
        activeFilter,
        itemsLeft,
        itemsCompleted,
        saveTodo,
        handleMarkAllTodosAsCompleted,
        clearCompletedTodos,
        checkTodo,
        updateActiveFilter,
        removeTodo,
        updateTodo
    }
}





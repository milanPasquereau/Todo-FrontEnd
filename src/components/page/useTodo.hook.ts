import {useState, useEffect} from 'react'
import {Todo} from '../../model/Todo';

const API_URL = 'http://localhost:8080/todos/';

export function useTodo(filter: string){
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const headers = { 'Content-Type': 'application/json' }
        fetch(API_URL, {headers})
            .then(response => response.json())
            .then(data => { setTodos(data) });
    }, [todos]);

    const filteredTodos = todos.filter((todo) => {
        switch(filter) {
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
            const requestOptions = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: newTodoLbl })
            };
            fetch(API_URL, requestOptions)
                .then(response => response.json())
                .then(data => setTodos([...todos, data]));
        }
    }

    const removeTodo = (todoToRemove: Todo) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
            }
        };
        fetch(API_URL+todoToRemove.id, requestOptions)
            .then(() => setTodos(todos.filter((todo) => {
                return todo.id !== todoToRemove.id;
        })));
    }
    
    const clearCompletedTodos = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
            }
        };
        fetch('http://localhost:8080/todos?completed=true', requestOptions)
        .then(() =>  setTodos(todos.filter((todo) => {
            return !todo.completed;
        })));
    }

    const checkTodo = (todo: Todo) => {
        const requestOptions = {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: !todo.completed })
        };

        fetch(API_URL+todo.id, requestOptions)
        .then(response => response.json())
        .then(data => {
            setTodos(todos.map(localTodo => {
            if(localTodo.id === data.id) {
                localTodo.completed = data.completed;
            }
            return localTodo;
        }))});
    }

    const updateTodo = (todo: Todo, newLabelTodo: string) => {
        const requestOptions = {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: newLabelTodo})
        };

        fetch(API_URL+todo.id, requestOptions)
        .then(response => response.json())
        .then(data => setTodos(todos.map(localTodo => {
            if(localTodo.id === data.id) {
                localTodo.title = newLabelTodo
            }
            return localTodo;
        })));
    }
      
    const handleMarkAllTodosAsCompleted = () => {
        const allTodosAreCompleted = itemsCompleted === todos.length;
        todos.forEach(todo => {
            const requestOptions = {
                method: 'PATCH',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ completed: !allTodosAreCompleted})
            };
    
            fetch(API_URL+todo.id, requestOptions)
            .then(response => response.json())
            .then(() => setTodos(todos.map(localTodo => {
                localTodo.completed = !allTodosAreCompleted;
                return localTodo;
            })));
        });
    }

    return {
        todos,
        filteredTodos,
        itemsLeft,
        itemsCompleted,
        saveTodo,
        handleMarkAllTodosAsCompleted,
        clearCompletedTodos,
        checkTodo,
        removeTodo,
        updateTodo
    }
}





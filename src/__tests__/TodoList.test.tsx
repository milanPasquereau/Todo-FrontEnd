import { render, screen } from '@testing-library/react';
import TodoList from '../components/page/todo-list/TodoList';

describe('TodoList component should', () => {

    const removeTodoMock = jest.fn();
    const checkTodoMock = jest.fn();
    const updateTodoMock = jest.fn();

    it('render properly all todos', async () => {
        const todos = [
            {
                id: "0e7fd850-b27e-40a4-8a1f-d2dfdf3c2f93",
                title: "Todo 1",
                completed: true,
                order: 1,
                url: "http://localhost:8080/todos/0e7fd850-b27e-40a4-8a1f-d2dfdf3c2f93"
            }, {
                id: "0e7fd850-b27e-40a4-8a1f-d2dfdf3c2f94",
                title: "Todo 2",
                completed: true,
                order: 2,
                url: "http://localhost:8080/todos/0e7fd850-b27e-40a4-8a1f-d2dfdf3c2f94"
            }
        ]
        render(
            <TodoList
                listTodos= {todos}
                removeTodo={removeTodoMock}
                checkTodo={checkTodoMock}
                updateTodo={updateTodoMock}
            />
        );

        expect(await screen.findByRole('list')).toBeInTheDocument();
        expect((await screen.findAllByRole('menuitem')).length).toBe(todos.length);
    });
});
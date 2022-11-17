import { render, screen } from '@testing-library/react';
import TodoList from '../components/page/todo-list/TodoList';

describe('TodoList component should', () => {

    const removeTodoMock = jest.fn();
    const checkTodoMock = jest.fn();
    const updateTodoMock = jest.fn();

    it('render properly all todos', async () => {
        const todos = [
            {
                id: 1,
                libelle: "Todo 1",
                completed: true,
            }, {
                id: 2,
                libelle: "Todo 2",
                completed: true,
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
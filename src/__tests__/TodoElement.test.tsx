import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoElement from '../components/page/todo-element/TodoElement';

describe('TodoElement component should', () => {

    const removeTodoMock = jest.fn();
    const checkTodoMock = jest.fn();
    const updateTodoMock = jest.fn();

    const todo = {
        id: 1,
        libelle: "Todo 1",
        completed: false,
    };

    it('render properly', async () => {
        render(
            <TodoElement
                todo = {todo}
                removeTodo={removeTodoMock}
                checkTodo={checkTodoMock}
                updateTodo={updateTodoMock}
            />
        );
        
        expect(await screen.findByText('Todo 1')).toBeInTheDocument();
        expect(await screen.findByRole('button')).toBeInTheDocument();
        expect(await screen.findByRole('menuitemcheckbox')).toBeInTheDocument();
    });

    it('remove a todo', async () => {
        render(
            <TodoElement
                todo = {todo}
                removeTodo={removeTodoMock}
                checkTodo={checkTodoMock}
                updateTodo={updateTodoMock}
            />
        );
        fireEvent.click(screen.getByRole('button'));
        expect(removeTodoMock).toHaveBeenNthCalledWith(1, todo);
    });

    it.each`
        checked  | nameTest
        ${true}  | ${'check'}
        ${false} | ${'uncheck'}
    `('$nameTest a todo', async (checked) => {

        const todoChecked = {
            id: 1,
            libelle: "Todo 1",
            completed: checked,
        };

        render(
            <TodoElement
                todo = {todoChecked}
                removeTodo={removeTodoMock}
                checkTodo={checkTodoMock}
                updateTodo={updateTodoMock}
            />
        );
        fireEvent.click(screen.getByRole('menuitemcheckbox'));
        expect(checkTodoMock).toHaveBeenNthCalledWith(1, todoChecked.id);
    });

    it('enable editing mode and show editing input', async () => {
        render(
            <TodoElement
                todo = {todo}
                removeTodo={removeTodoMock}
                checkTodo={checkTodoMock}
                updateTodo={updateTodoMock}
            />
        );
        fireEvent.doubleClick(screen.getByText('Todo 1'));
        expect(await screen.findByRole('combobox')).toBeInTheDocument();
    });

    it('update todo with current label when key down enter is pressed in editing mode', async () => {
        render(
            <TodoElement
                todo = {todo}
                removeTodo={removeTodoMock}
                checkTodo={checkTodoMock}
                updateTodo={updateTodoMock}
            />
        );
        fireEvent.doubleClick(screen.getByText('Todo 1'));
        fireEvent.keyDown(screen.getByRole('combobox'), {key: 'Enter', code: 'Enter', charCode: 13});
        expect(updateTodoMock).toHaveBeenNthCalledWith(1, todo.libelle, todo.id);
        expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });

    it('update todo with modified label when key down enter is pressed in editing mode', async () => {
        render(
            <TodoElement
                todo = {todo}
                removeTodo={removeTodoMock}
                checkTodo={checkTodoMock}
                updateTodo={updateTodoMock}
            />
        );
        fireEvent.doubleClick(screen.getByText('Todo 1'));
        userEvent.type(await screen.findByRole('combobox'), ' coucou{enter}');
        expect(updateTodoMock).toHaveBeenNthCalledWith(1, 'Todo 1 coucou', todo.id);
        expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });

    it('not update todo with modified label when key down escape is pressed in editing mode', async () => {
        render(
            <TodoElement
                todo = {{
                    id: 1,
                    libelle: "Todo 1",
                    completed: false,
                }}
                removeTodo={removeTodoMock}
                checkTodo={checkTodoMock}
                updateTodo={updateTodoMock}
            />
        );
        fireEvent.doubleClick(screen.getByText('Todo 1'));
        userEvent.type(await screen.findByRole('combobox'), ' coucou{escape}');
        expect(updateTodoMock).toHaveBeenCalledTimes(0);
        expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });

    it('remove todo with blank label when key down enter is pressed in editing mode', async () => {
        const todoBlank = {
            id: 1,
            libelle: "",
            completed: false,
        };
        render(
            <TodoElement
                todo = {todoBlank}
                removeTodo={removeTodoMock}
                checkTodo={checkTodoMock}
                updateTodo={updateTodoMock}
            />
        );
        fireEvent.doubleClick(screen.getByRole('menuitem'));
        userEvent.type(await screen.findByRole('combobox'), '     {enter}');
        expect(removeTodoMock).toHaveBeenNthCalledWith(1, todoBlank);
        expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });
});
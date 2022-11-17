import { fireEvent, render, screen, waitFor, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Page from '../components/page/Page';

import {useTodo} from '../components/page/useTodo.hook';

    
jest.mock('../components/page/useTodo.hook', () => {
    return {
        useTodo : jest.fn()
    }
});

describe('Page component should', () => {

    it('hide main and footer when no todos', async () => {

        (useTodo as jest.Mock).mockReturnValue({
            todos: []
        });
        render(<Page/>);

        expect(screen.queryByRole('main')).not.toBeInTheDocument();
        expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
    });

    it('show main and footer when existing todos', async () => {

        (useTodo as jest.Mock).mockReturnValue({
            todos: [{id: 1, libelle: 'Premier todo', completed: false}],
            filteredTodos: [{id: 1, libelle: 'Premier todo', completed: false}],
        });
        render(<Page/>);

        expect(screen.queryByRole('main')).toBeInTheDocument();
        expect(screen.queryByRole('contentinfo')).toBeInTheDocument();
    });
        
    it('save todo', async () => {
        const saveTodoMock = jest.fn();

        (useTodo as jest.Mock).mockReturnValue({
            todos: [],
            saveTodo: saveTodoMock
        });

        render(<Page/>);

        userEvent.type(
            await screen.findByPlaceholderText('What needs to be done?'),
            'coucou{enter}'
        );
        
        await waitFor(() => {
            expect(saveTodoMock).toHaveBeenNthCalledWith(1, 'coucou');
        });
    });

    it('check todo', async () => {
        const checkTodoMock = jest.fn();

        (useTodo as jest.Mock).mockReturnValue({
            todos: [{id: 1, libelle: 'Premier todo', completed: false}],
            filteredTodos: [{id: 1, libelle: 'Premier todo', completed: false}],
            checkTodo: checkTodoMock
        });

        render(<Page/>);

        userEvent.click(
            await screen.findByRole('menuitemcheckbox'));
        
        await waitFor(() => {
            expect(checkTodoMock).toHaveBeenNthCalledWith(1, 1);
        });
    });

    it('remove todo', async () => {
        const removeTodoMock = jest.fn();

        const todo = {
            id: 1,
            libelle: "Todo 1",
            completed: false,
        };

        (useTodo as jest.Mock).mockReturnValue({
            todos: [todo],
            filteredTodos: [todo],
            removeTodo: removeTodoMock
        });

        render(<Page/>);

        userEvent.click(await screen.findByRole('button'));
        
        await waitFor(() => {
            expect(removeTodoMock).toHaveBeenNthCalledWith(1, todo);
        });
    });

    it('update todo', async () => {
        const updateTodoMock = jest.fn();

        const todo = {
            id: 1,
            libelle: "Premier todo",
            completed: false,
        };

        (useTodo as jest.Mock).mockReturnValue({
            todos: [todo],
            filteredTodos: [todo],
            updateTodo: updateTodoMock
        });

        render(<Page/>);

        userEvent.dblClick(await screen.findByRole('menuitem'));
        userEvent.type(await screen.findByRole('combobox'), ' modifie{enter}');
        
        await waitFor(() => {
            expect(updateTodoMock).toHaveBeenNthCalledWith(1, 'Premier todo modifie', 1);
        });
    });

    it('handle mark all todos as completed', async () => {
        const handleMarkAllTodosAsCompletedMock = jest.fn();

        const todo = {
            id: 1,
            libelle: "Premier todo",
            completed: false,
        };

        (useTodo as jest.Mock).mockReturnValue({
            todos: [todo],
            filteredTodos: [todo],
            handleMarkAllTodosAsCompleted: handleMarkAllTodosAsCompletedMock
        });

        render(<Page/>);

        userEvent.click(await screen.findByRole('checkbox'));
        
        await waitFor(() => {
            expect(handleMarkAllTodosAsCompletedMock).toHaveBeenCalledTimes(1);
        });
    });

    it('clear all completed todos', async () => {
        const clearCompletedTodosMock = jest.fn();

        const todo = {
            id: 1,
            libelle: "Premier todo",
            completed: true,
        };

        (useTodo as jest.Mock).mockReturnValue({
            todos: [todo],
            filteredTodos: [todo],
            itemsCompleted: 1,
            clearCompletedTodos: clearCompletedTodosMock
        });

        render(<Page/>);

        userEvent.click(screen.queryAllByRole('button')[1]);
        
        await waitFor(() => {
            expect(clearCompletedTodosMock).toHaveBeenCalledTimes(1);
        });
    });

    it.each`
            filter         | nameTest
            ${'All'}       | ${'all'}
            ${'Active'}    | ${'active'}
            ${'Completed'} | ${'completed'}
        `('update filter to $nameTest', async ({filter, nameTest}) => {
        const updateActiveFilterMock = jest.fn();

        const todo = {
            id: 1,
            libelle: "Premier todo",
            completed: false,
        };

        (useTodo as jest.Mock).mockReturnValue({
            todos: [todo],
            filteredTodos: [todo],
            itemsCompleted: 0,
            itemsLeft: 1,
            updateActiveFilter: updateActiveFilterMock
        });

        render(<Page/>);

        fireEvent.click(screen.getByText(filter));
        
        await waitFor(() => {
            expect(updateActiveFilterMock).toHaveBeenNthCalledWith(1, filter);
        });
    });
});
 
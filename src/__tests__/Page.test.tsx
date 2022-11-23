import { fireEvent, render, screen, waitFor, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Page from '../components/page/Page';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useTodo} from '../components/page/useTodo.hook';

    
jest.mock('../components/page/useTodo.hook', () => {
    return {
        useTodo : jest.fn()
    }
});

describe('Page component should', () => {

    const todo = {
        id: "0e7fd850-b27e-40a4-8a1f-d2dfdf3c2f93",
        title: "Todo 1",
        completed: false,
        order: 1,
        url: "http://localhost:8080/todos/0e7fd850-b27e-40a4-8a1f-d2dfdf3c2f93"
    };

    it('hide main and footer when no todos', async () => {

        (useTodo as jest.Mock).mockReturnValue({
            todos: []
        });
        
        render(
            <BrowserRouter>
                <Page
                    filter='All'
                />
             </BrowserRouter>
        );

        expect(screen.queryByRole('main')).not.toBeInTheDocument();
        expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
    });

    it('show main and footer when existing todos', async () => {

        (useTodo as jest.Mock).mockReturnValue({
            todos: [todo],
            filteredTodos: [todo],
        });

        render(
            <BrowserRouter>
                <Page
                    filter='All'
                />
             </BrowserRouter>
        );

        expect(screen.queryByRole('main')).toBeInTheDocument();
        expect(screen.queryByRole('contentinfo')).toBeInTheDocument();
    });
        
    it('save todo', async () => {
        const saveTodoMock = jest.fn();

        (useTodo as jest.Mock).mockReturnValue({
            todos: [],
            saveTodo: saveTodoMock
        });

        render(
            <BrowserRouter>
                <Page
                    filter='All'
                />
             </BrowserRouter>
        );

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
            todos: [todo],
            filteredTodos: [todo],
            checkTodo: checkTodoMock
        });

        render(
            <BrowserRouter>
                <Page
                    filter='All'
                />
             </BrowserRouter>
        );

        userEvent.click(
            await screen.findByRole('menuitemcheckbox'));
        
        await waitFor(() => {
            expect(checkTodoMock).toHaveBeenNthCalledWith(1, todo);
        });
    });

    it('remove todo', async () => {
        const removeTodoMock = jest.fn();

        (useTodo as jest.Mock).mockReturnValue({
            todos: [todo],
            filteredTodos: [todo],
            removeTodo: removeTodoMock
        });

        render(
            <BrowserRouter>
                <Page
                    filter='All'
                />
             </BrowserRouter>
        );

        userEvent.click(await screen.findByRole('button'));
        
        await waitFor(() => {
            expect(removeTodoMock).toHaveBeenNthCalledWith(1, todo);
        });
    });

    it('update todo', async () => {
        const updateTodoMock = jest.fn();

        (useTodo as jest.Mock).mockReturnValue({
            todos: [todo],
            filteredTodos: [todo],
            updateTodo: updateTodoMock
        });

        render(
            <BrowserRouter>
                <Page
                    filter='All'
                />
             </BrowserRouter>
        );

        userEvent.dblClick(await screen.findByRole('menuitem'));
        userEvent.type(await screen.findByRole('combobox'), ' modifie{enter}');
        
        await waitFor(() => {
            expect(updateTodoMock).toHaveBeenNthCalledWith(1, todo, todo.title+' modifie');
        });
    });

    it('handle mark all todos as completed', async () => {
        const handleMarkAllTodosAsCompletedMock = jest.fn();

        (useTodo as jest.Mock).mockReturnValue({
            todos: [todo],
            filteredTodos: [todo],
            handleMarkAllTodosAsCompleted: handleMarkAllTodosAsCompletedMock
        });

        render(
            <BrowserRouter>
                <Page
                    filter='All'
                />
             </BrowserRouter>
        );

        userEvent.click(await screen.findByRole('checkbox'));
        
        await waitFor(() => {
            expect(handleMarkAllTodosAsCompletedMock).toHaveBeenCalledTimes(1);
        });
    });

    it('clear all completed todos', async () => {
        const clearCompletedTodosMock = jest.fn();

        todo.completed = true;

        (useTodo as jest.Mock).mockReturnValue({
            todos: [todo],
            filteredTodos: [todo],
            itemsCompleted: 1,
            clearCompletedTodos: clearCompletedTodosMock
        });

        render(
            <BrowserRouter>
                <Page
                    filter='All'
                />
             </BrowserRouter>
        );

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

        (useTodo as jest.Mock).mockReturnValue({
            todos: [todo],
            filteredTodos: [todo],
            itemsCompleted: 0,
            itemsLeft: 1,
            updateActiveFilter: updateActiveFilterMock
        });

        render(
            <BrowserRouter>
                <Page
                    filter='All'
                />
             </BrowserRouter>
        );

        fireEvent.click(screen.getByText(filter));
        
    });
});
 
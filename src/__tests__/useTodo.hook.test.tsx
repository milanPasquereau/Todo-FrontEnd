import { act, renderHook, waitFor } from '@testing-library/react';
import {PropsWithChildren} from 'react'
import { useTodo } from '../components/page/useTodo.hook';
import server from '../mocks/server';
import { rest } from 'msw'

describe('useTodo hook should', () => {

    const todo = {
        id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
        title: 'Premier todo',
        completed: false,
        order: 1,
        url: 'http://localhost:8080/todos/f79e82e8-c34a-4dc7-a49e-9fadc0979fda'
    };

    it('initialize functions and attributes', async () => {
        const {result} = renderHook(() => useTodo('All'));

        expect(result.current).toEqual({
            todos: [],
            filteredTodos: [],
            itemsCompleted: 0,
            itemsLeft: 0,
            checkTodo: expect.any(Function),
            clearCompletedTodos: expect.any(Function),
            handleMarkAllTodosAsCompleted: expect.any(Function),
            removeTodo: expect.any(Function),
            saveTodo: expect.any(Function),
            updateTodo: expect.any(Function)
        });
    });

    describe('save todo', () => {

        it('with valid label', async () => {
            const {result} = renderHook(() => useTodo('All'));

            server.use(rest.get('http://localhost:8080/todos/', (req, res, ctx) => {
                return res.once(
                    ctx.status(200),
                    ctx.json([todo])
                );
            }));

            act(() => {
                result.current.saveTodo('Premier todo');
            });
      
            await waitFor(() => {
                expect(result.current).toEqual(expect.objectContaining({
                    todos: [todo],
                    filteredTodos: [todo],
                    itemsCompleted: 0,
                    itemsLeft: 1,
                }));
            });
        });
    
        it('with empty label', async () => {
            const {result} = renderHook(() => useTodo('All'));
            result.current.saveTodo('');
            await waitFor(() => {
                expect(result.current).toEqual(expect.objectContaining({
                    todos: [],
                    filteredTodos: [],
                    itemsCompleted: 0,
                    itemsLeft: 0,
                }));
            });
        });
    });

    describe('check todo', () => {

        it('not checked', async () => {
            const {result} = renderHook(() => useTodo('All'));

            server.use(rest.get('http://localhost:8080/todos/', (req, res, ctx) => {
                return res.once(
                    ctx.status(200),
                    ctx.json([todo])
                );
            }));

            act(() => {
                result.current.checkTodo(todo);
            });

            server.use(rest.get('http://localhost:8080/todos/', (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json([{ ...todo, completed: true }])
                );
            }));

            await waitFor(() => {
                expect(result.current).toEqual(expect.objectContaining({
                    todos: [{ ...todo, completed: true }],
                    filteredTodos: [{ ...todo, completed: true }],
                    itemsCompleted: 1,
                    itemsLeft: 0,
                }));
            });
        });
    
        it('already checked', async () => {
            const {result} = renderHook(() => useTodo('All'));
            server.use(rest.get('http://localhost:8080/todos', (req, res, ctx) => {
                return res.once(
                    ctx.status(200),
                    ctx.json([{ ...todo, completed: true }])
                );
            }));

            server.use(rest.get('http://localhost:8080/todos', (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json([{ ...todo, completed: false }])
                );
            }));

            result.current.checkTodo(todo);

            await waitFor(() => {
                expect(result.current).toEqual(expect.objectContaining({
                    todos: [{ ...todo, completed: false }],
                    filteredTodos: [{ ...todo, completed: false }],
                    itemsCompleted: 0,
                    itemsLeft: 1,
                }));
            });
        });
    });

    describe('remove todo', () => {
        
        it('with one existing todo', async () => {
            const {result} = renderHook(() => useTodo('All'));

            server.use(rest.get('http://localhost:8080/todos', (req, res, ctx) => {
                return res.once(
                    ctx.status(200),
                    ctx.json([todo])
                );
            }));

            result.current.removeTodo(todo);
    
            await waitFor(() => {
                expect(result.current).toEqual(expect.objectContaining({
                    todos: [],
                    filteredTodos: [],
                    itemsCompleted: 0,
                    itemsLeft: 0,
                }));
            });
        });
    });

    describe('update todo', () => {
        
        it('with label by id', async () => {
            const {result} = renderHook(() => useTodo('All'));

            server.use(rest.get('http://localhost:8080/todos', (req, res, ctx) => {
                return res.once(
                    ctx.status(200),
                    ctx.json([todo])
                );
            }));

            server.use(rest.get('http://localhost:8080/todos', (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json([{ ...todo, title: 'Premier todo modifie' }])
                );
            }));

            result.current.updateTodo(todo, 'Premier todo modifie');
    
            await waitFor(() => {
                expect(result.current).toEqual(expect.objectContaining({
                    todos: [{ ...todo, title: 'Premier todo modifie' }],
                    filteredTodos: [{ ...todo, title: 'Premier todo modifie' }],
                    itemsCompleted: 0,
                    itemsLeft: 1,
                }));
            });
        });
    });

    describe('mark all todos as', () => {
        
        it('completed', async () => {
            const {result} = renderHook(() => useTodo('All'));

            const secondTodo = {
                id: '9fadc097-c34a-4dc7-a49e-9fadc0979fda',
                title: 'Second todo',
                completed: false,
                order: 2,
                url: 'http://localhost:8080/todos/9fadc097-c34a-4dc7-a49e-9fadc0979fda'
            };

            server.use(rest.get('http://localhost:8080/todos', (req, res, ctx) => {
                return res.once(
                    ctx.status(200),
                    ctx.json([todo, secondTodo])
                );
            }));

            server.use(rest.get('http://localhost:8080/todos', (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json([{ ...todo, completed: true },{ ...secondTodo, completed: true }])
                );
            }));

            result.current.handleMarkAllTodosAsCompleted();
    
            await waitFor(() => {
                expect(result.current).toEqual(expect.objectContaining({
                    todos: [{ ...todo, completed: true },{ ...secondTodo, completed: true }],
                    filteredTodos: [{ ...todo, completed: true },{ ...secondTodo, completed: true }],
                    itemsCompleted: 2,
                    itemsLeft: 0,
                }));
            });
        });

        it('uncompleted', async () => {
            const {result} = renderHook(() => useTodo('All'));

            const secondTodo = {
                id: '9fadc097-c34a-4dc7-a49e-9fadc0979fda',
                title: 'Second todo',
                completed: true,
                order: 2,
                url: 'http://localhost:8080/todos/9fadc097-c34a-4dc7-a49e-9fadc0979fda'
            };

            server.use(rest.get('http://localhost:8080/todos', (req, res, ctx) => {
                return res.once(
                    ctx.status(200),
                    ctx.json([{ ...todo, completed: true }, secondTodo])
                );
            }));

            server.use(rest.get('http://localhost:8080/todos', (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json([{ ...todo, completed: false },{ ...secondTodo, completed: false }])
                );
            }));

            result.current.handleMarkAllTodosAsCompleted();
    
            await waitFor(() => {
                expect(result.current).toEqual(expect.objectContaining({
                    todos: [{ ...todo, completed: false },{ ...secondTodo, completed: false }],
                    filteredTodos: [{ ...todo, completed: false },{ ...secondTodo, completed: false }],
                    itemsCompleted: 0,
                    itemsLeft: 2,
                }));
            });
        });
    });

    describe('clear completed todos', () => {

        it('with one completed todo', async () => {
            const {result} = renderHook(() => useTodo('All'));

            server.use(rest.get('http://localhost:8080/todos', (req, res, ctx) => {
                return res.once(
                    ctx.status(200),
                    ctx.json([{ ...todo, completed: true }])
                );
            }));

            server.use(rest.get('http://localhost:8080/todos', (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json([])
                );
            }));

            result.current.handleMarkAllTodosAsCompleted();
    
            await waitFor(() => {
                expect(result.current).toEqual(expect.objectContaining({
                    todos: [],
                    filteredTodos: [],
                    itemsCompleted: 0,
                    itemsLeft: 0,
                }));
            });
        });
    });

});
import { act, renderHook, waitFor } from '@testing-library/react';
import { useTodo } from '../components/page/useTodo.hook';

describe('useTodo hook should', () => {

    it('initialize functions and attributes', async () => {
        const {result} = renderHook(() => useTodo());

        expect(result.current).toEqual({
            todos: [],
            filteredTodos: [],
            itemsCompleted: 0,
            itemsLeft: 0,
            activeFilter: "All",
            allTodosAreCompleted: false,
            checkTodo: expect.any(Function),
            clearCompletedTodos: expect.any(Function),
            handleMarkAllTodosAsCompleted: expect.any(Function),
            removeTodo: expect.any(Function),
            saveTodo: expect.any(Function),
            updateActiveFilter: expect.any(Function),
            updateTodo: expect.any(Function)
        });
    });

    describe('save todo', () => {

        it('with valid label', async () => {
            const {result} = renderHook(() => useTodo());
    
            act(() => {
                result.current.saveTodo('Premier todo');
            });
    
            await waitFor(() => {
                expect(result.current).toEqual(expect.objectContaining({
                    todos: [{id: 1, libelle: 'Premier todo', completed: false}],
                    filteredTodos: [{id: 1, libelle: 'Premier todo', completed: false}],
                    itemsCompleted: 0,
                    itemsLeft: 1,
                }));
            });
        });
    
        it('with empty label', async () => {
            const {result} = renderHook(() => useTodo());
    
            act(() => {
                result.current.saveTodo('');
            });
   
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
            const {result} = renderHook(() => useTodo());
    
            act(() => {
                result.current.saveTodo('Premier todo');
            });

            act(() => {
                result.current.checkTodo(1);
            });
    
            await waitFor(() => {
                expect(result.current).toEqual(expect.objectContaining({
                    todos: [{id: 1, libelle: 'Premier todo', completed: true}],
                    filteredTodos: [{id: 1, libelle: 'Premier todo', completed: true}],
                    allTodosAreCompleted: true,
                    itemsCompleted: 1,
                    itemsLeft: 0,
                }));
            });
        });
    
        it('already checked', async () => {
            const {result} = renderHook(() => useTodo());
    
            act(() => {
                result.current.saveTodo('Premier todo');
            });

            act(() => {
                result.current.checkTodo(1);
                result.current.checkTodo(1);
            });

            await waitFor(() => {
                expect(result.current).toEqual(expect.objectContaining({
                    todos: [{id: 1, libelle: 'Premier todo', completed: false}],
                    filteredTodos: [{id: 1, libelle: 'Premier todo', completed: false}],
                    allTodosAreCompleted: false,
                    itemsCompleted: 0,
                    itemsLeft: 1,
                }));
            });
        });
    });

    describe('remove todo', () => {
        
        it('with one existing todo', async () => {
            const {result} = renderHook(() => useTodo());

            const todo = {id: 1, libelle: 'Premier todo', completed: false};
    
            act(() => {
                result.current.saveTodo('Premier todo');
            });

            act(() => {
                result.current.removeTodo(todo);
            });
    
            await waitFor(() => {
                expect(result.current).toEqual(expect.objectContaining({
                    todos: [],
                    filteredTodos: [],
                    allTodosAreCompleted: false,
                    itemsCompleted: 0,
                    itemsLeft: 0,
                }));
            });
        });
    
        it('with two existing todos', async () => {
            const {result} = renderHook(() => useTodo());

            const todo = {id: 1, libelle: 'Premier todo', completed: false};
    
            act(() => {
                result.current.saveTodo('Premier todo');
            });

            act(() => {
                result.current.saveTodo('Second todo');
            });

            act(() => {
                result.current.removeTodo(todo);
            });
    
            await waitFor(() => {
                expect(result.current).toEqual(expect.objectContaining({
                    todos: [{id: 2, libelle: 'Second todo', completed: false}],
                    filteredTodos: [{id: 2, libelle: 'Second todo', completed: false}],
                    allTodosAreCompleted: false,
                    itemsCompleted: 0,
                    itemsLeft: 1,
                }));
            });
        });
    });

    describe('update todo', () => {
        
        it('with label by id', async () => {
            const {result} = renderHook(() => useTodo());

            act(() => {
                result.current.saveTodo('Premier todo');
            });

            act(() => {
                result.current.updateTodo('Premier todo modifie', 1);
            });
    
            await waitFor(() => {
                expect(result.current).toEqual(expect.objectContaining({
                    todos: [{id: 1, libelle: 'Premier todo modifie', completed: false}],
                    filteredTodos: [{id: 1, libelle: 'Premier todo modifie', completed: false}],
                    allTodosAreCompleted: false,
                    itemsCompleted: 0,
                    itemsLeft: 1,
                }));
            });
        });
    });

    describe('mark all todos as', () => {
        
        it('completed', async () => {
            const {result} = renderHook(() => useTodo());

            act(() => {
                result.current.saveTodo('Premier todo');
            });

            act(() => {
                result.current.saveTodo('Second todo');
            });

            act(() => {
                result.current.handleMarkAllTodosAsCompleted();
            });
    
            await waitFor(() => {
                expect(result.current).toEqual(expect.objectContaining({
                    todos: [
                        {id: 1, libelle: 'Premier todo', completed: true},
                        {id: 2, libelle: 'Second todo', completed: true}],
                    filteredTodos: [
                        {id: 1, libelle: 'Premier todo', completed: true},
                        {id: 2, libelle: 'Second todo', completed: true}],
                    allTodosAreCompleted: true,
                    itemsCompleted: 2,
                    itemsLeft: 0,
                }));
            });
        });

        it('uncompleted', async () => {
            const {result} = renderHook(() => useTodo());

            act(() => {
                result.current.saveTodo('Premier todo');
            });

            act(() => {
                result.current.saveTodo('Second todo');
            });

            act(() => {
                result.current.handleMarkAllTodosAsCompleted();
            });

            act(() => {
                result.current.handleMarkAllTodosAsCompleted();
            });
    
            await waitFor(() => {
                expect(result.current).toEqual(expect.objectContaining({
                    todos: [
                        {id: 1, libelle: 'Premier todo', completed: false},
                        {id: 2, libelle: 'Second todo', completed: false}],
                    filteredTodos: [
                        {id: 1, libelle: 'Premier todo', completed: false},
                        {id: 2, libelle: 'Second todo', completed: false}],
                    allTodosAreCompleted: false,
                    itemsCompleted: 0,
                    itemsLeft: 2,
                }));
            });
        });
    });

    describe('update active filter', () => {
        
        it.each`
            filter         | nameTest
            ${'All'}       | ${'all'}
            ${'Active'}    | ${'active'}
            ${'Completed'} | ${'completed'}
        `('to $nameTest', async (filter) => {
            const {result} = renderHook(() => useTodo());

            act(() => {
                result.current.updateActiveFilter(filter);
            });
    
            await waitFor(() => {
                expect(result.current).toEqual(expect.objectContaining({
                    activeFilter: filter,
                }));
            })
        });
    });

    describe('clear completed todos', () => {
        
        it('with one completed todo', async () => {
            const {result} = renderHook(() => useTodo());

            act(() => {
                result.current.saveTodo('Premier todo');
            });

            act(() => {
                result.current.saveTodo('Second todo');
            });

            act(() => {
                result.current.checkTodo(1);
            });

            act(() => {
                result.current.clearCompletedTodos();
            });
    
            await waitFor(() => {
                expect(result.current).toEqual(expect.objectContaining({
                    todos: [{id: 2, libelle: 'Second todo', completed: false}],
                    filteredTodos: [{id: 2, libelle: 'Second todo', completed: false}],
                    allTodosAreCompleted: false,
                    itemsCompleted: 0,
                    itemsLeft: 1,
                }));
            })
        });
    });

});
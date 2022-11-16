import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Footer from '../components/page/footer/Footer';

describe('Footer component should', () => {

    const clearCompletedTodosMock = jest.fn();
    const updateActiveFilterMock = jest.fn();

    it('render properly with no items completed', async () => {
        render(
            <Footer
                itemsLeft={1}
                itemsCompleted={0}
                activeFilter={"All"}
                clearCompletedTodos={clearCompletedTodosMock}
                updateActiveFilter={updateActiveFilterMock}
            />
        );
        
        expect(await screen.findByRole('contentinfo')).toBeInTheDocument();
        expect(await screen.findByRole('list')).toBeInTheDocument();
        expect((await screen.findAllByRole('link')).length).toBe(3);
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
        expect(screen.getByText("All")).toHaveClass('selected');
    });

    it('render properly with 2 items completed', async () => {
        render(
            <Footer
                itemsLeft={1}
                itemsCompleted={2}
                activeFilter={"Completed"}
                clearCompletedTodos={clearCompletedTodosMock}
                updateActiveFilter={updateActiveFilterMock}
            />
        );
        
        expect(await screen.findByRole('contentinfo')).toBeInTheDocument();
        expect(await screen.findByRole('list')).toBeInTheDocument();
        expect((await screen.findAllByRole('link')).length).toBe(3);
        expect(await screen.findByRole('button')).toBeInTheDocument();
        expect(screen.getByText("Completed")).toHaveClass('selected');
    });

    it.each(['All', 'Active', 'Completed'])('select %s filter', async (filter) => {
        render(
            <Footer
                itemsLeft={1}
                itemsCompleted={2}
                activeFilter={""}
                clearCompletedTodos={clearCompletedTodosMock}
                updateActiveFilter={updateActiveFilterMock}
            />
        );
        fireEvent.click(screen.getByText(filter));

        expect(updateActiveFilterMock).toHaveBeenCalledTimes(1);
        expect(updateActiveFilterMock).toBeCalledWith(filter);
    });

    it('clear all completed todos and hide clear button', async () => {
        render(
            <Footer
                itemsLeft={1}
                itemsCompleted={2}
                activeFilter={"Completed"}
                clearCompletedTodos={clearCompletedTodosMock}
                updateActiveFilter={updateActiveFilterMock}
            />
        );
        fireEvent.click(screen.getByRole('button'));

        await waitFor(() => {
            expect(screen.getByRole('button')).not.toBeInTheDocument;
        })

        expect(clearCompletedTodosMock).toHaveBeenCalledTimes(1);
    });
});
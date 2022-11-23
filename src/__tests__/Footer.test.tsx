import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Footer from '../components/page/footer/Footer';
import { BrowserRouter , useParams} from "react-router-dom";
describe('Footer component should', () => {

    const clearCompletedTodosMock = jest.fn();

    it('render properly with no items completed', async () => {
        render(
            <BrowserRouter>
                <Footer
                    itemsLeft={1}
                    itemsCompleted={0}
                    clearCompletedTodos={clearCompletedTodosMock}
                />
            </BrowserRouter>
        );
        
        expect(await screen.findByRole('contentinfo')).toBeInTheDocument();
        expect(await screen.findByRole('list')).toBeInTheDocument();
        expect((await screen.findAllByRole('link')).length).toBe(3);
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
        expect(screen.getByText("All")).toHaveClass('selected');
    });

    it('render properly with 2 items completed', async () => {
        render(
            <BrowserRouter>
                <Footer
                    itemsLeft={1}
                    itemsCompleted={2}
                    clearCompletedTodos={clearCompletedTodosMock}
                />
            </BrowserRouter>
        );
        
        expect(await screen.findByRole('contentinfo')).toBeInTheDocument();
        expect(await screen.findByRole('list')).toBeInTheDocument();
        expect((await screen.findAllByRole('link')).length).toBe(3);
        expect(await screen.findByRole('button')).toBeInTheDocument();
        expect(screen.getByText("All")).toHaveClass('selected');
      
    });

    it('clear all completed todos and hide clear button', async () => {
        render(
            <BrowserRouter>
                <Footer
                    itemsLeft={1}
                    itemsCompleted={2}
                    clearCompletedTodos={clearCompletedTodosMock}
                />
            </BrowserRouter>
        );
        fireEvent.click(screen.getByRole('button'));

        await waitFor(() => {
            expect(screen.getByRole('button')).not.toBeInTheDocument;
        })

        expect(clearCompletedTodosMock).toHaveBeenCalledTimes(1);
    });
});
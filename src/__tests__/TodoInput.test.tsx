import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoInput from '../components/page/todo-input/TodoInput';

describe('TodoInput component should', () => {

    const onSaveMock = jest.fn();
    const placeholder = 'What needs to be done?';

    it('render properly', async () => {
        render(
            <TodoInput
                placeholder={placeholder}
                onSave={onSaveMock}
            />
        );
        expect(await screen.findByRole('textbox')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toHaveFocus();
        expect(screen.getByRole('textbox')).toHaveClass('new-todo');
    });

    it('not save the new todo when keydown is not Enter', async () => {
        render(
            <TodoInput
                placeholder={placeholder}
                onSave={onSaveMock}
            />
        );
        userEvent.type(await screen.findByPlaceholderText(placeholder), 'coucou{escape}');
        expect(onSaveMock).toHaveBeenCalledTimes(0);
    });

    it('save the new todo with valid label', async () => {
        const newTodoLabel = 'coucou';
        render(
            <TodoInput
                placeholder={placeholder}
                onSave={onSaveMock}
            />
        );
        userEvent.type(await screen.findByPlaceholderText(placeholder), newTodoLabel+'{enter}');
        expect(onSaveMock).toHaveBeenNthCalledWith(1, newTodoLabel);
    });

    it('not save the new todo with blank label', async () => {
        render(
            <TodoInput
                placeholder={placeholder}
                onSave={onSaveMock}
            />
        );
        userEvent.type(await screen.findByPlaceholderText(placeholder), '    {enter}');
        expect(onSaveMock).toHaveBeenCalledTimes(0);
    });
});

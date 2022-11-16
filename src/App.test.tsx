import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
    it('should render properly', async () => {
        render(
            <App/>
        ); 
        expect(await screen.findByRole('generic')).toBeInTheDocument();
    });
});
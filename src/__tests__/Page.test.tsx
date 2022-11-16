import { render, screen } from '@testing-library/react';
import {useState} from 'react'
import React from 'react';
import Page from '../components/page/Page';

describe('Page component', () => {

    //React.useState = jest.fn().mockReturnValueOnce(stubInitialTodos);

    it('should render properly', async () => {
        render(
            <Page/>
        );
        //expect(await screen.findByRole('checkbox')).toBeInTheDocument;
    });
});
// Mock useState before rendering your component
 
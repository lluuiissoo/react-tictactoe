import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { render, unmountComponentAtNode } from 'react-dom';
 
import ToDo from './todo';

let container = null;

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("root");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});
 
describe('ToDo', () => {
  test('renders ToDo component', () => {
    render(<ToDo />, container);

    //screen.debug(); //Prints out html output

    expect(screen.getByText('Search:')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();

    const input = screen.getByRole('textbox');
    fireEvent.change(input, {
        target: {value: 'JavaScript'},
    });

    //screen.debug();

  });
});
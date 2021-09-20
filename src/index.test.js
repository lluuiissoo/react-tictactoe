import React from 'react';
import { Game } from './index';
import { render, unmountComponentAtNode } from 'react-dom';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

let container = null;

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

test('renders game board', () => {
  act(()=>{
    render(Game, container);
  })  
  screen.debug();
  //expect(getByText(/game/)).toBeInTheDocument();

});
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

test('App renders without crashing', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // ensure a piece of UI is in the document
  expect(screen.getByText(/Create Your Fake Crypto Persona/i)).toBeInTheDocument();
});

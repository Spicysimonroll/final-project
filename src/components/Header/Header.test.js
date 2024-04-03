import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Header from './Header';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe('Button component', () => {
  it('renders the header with the correct elements', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const barsIcon = screen.getByTestId('bars');
    const cartIcon = screen.getByTestId('cart');
    const logo = screen.getByAltText('Little Lemon\'s logo');

    expect(barsIcon).toBeInTheDocument();
    expect(cartIcon).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
  });

  it('redirect to the correct path when clicking on the logo', () => {
    const history = createMemoryHistory();

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const logoLink = screen.getByRole('link', { name: /Little Lemon's logo/i });

    expect(logoLink).toBeInTheDocument();

    fireEvent.click(logoLink);

    expect(history.location.pathname).toBe('/');
  })
});

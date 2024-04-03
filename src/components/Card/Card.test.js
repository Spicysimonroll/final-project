import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import { BrowserRouter } from 'react-router-dom';

describe('Card component', () => {
  it('renders card with the correct information', () => {
    const name = 'Example Name';
    const description = 'Example Description';
    const price = '$10';
    const imageSrc = 'example.jpg';

    render(
      <BrowserRouter>
        <Card name={name} description={description} price={price} image={imageSrc} />
      </BrowserRouter>
    );

    const cardName = screen.getByText(name);
    const cardDescription = screen.getByText(description);
    const cardPrice = screen.getByText(price);
    const cardImage = screen.getByAltText(name);

    expect(cardName).toBeInTheDocument();
    expect(cardDescription).toBeInTheDocument();
    expect(cardPrice).toBeInTheDocument();
    expect(cardImage).toBeInTheDocument();
  });
});

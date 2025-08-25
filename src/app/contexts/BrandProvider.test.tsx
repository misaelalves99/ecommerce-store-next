// app/contexts/BrandProvider.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrandProvider } from './BrandProvider';
import { BrandContext } from './BrandContext';
import React, { useContext } from 'react';
import '@testing-library/jest-dom';

describe('BrandProvider', () => {
  const TestComponent = () => {
    const { brands, addBrand } = useContext(BrandContext);
    return (
      <div>
        <ul data-testid="brand-list">
          {brands.map((b) => (
            <li key={b.id}>{b.name}</li>
          ))}
        </ul>
        <button onClick={() => addBrand('Nova Marca')}>Adicionar Marca</button>
      </div>
    );
  };

  it('deve inicializar com marcas mockadas', () => {
    render(
      <BrandProvider>
        <TestComponent />
      </BrandProvider>
    );

    const list = screen.getByTestId('brand-list');
    expect(list.children.length).toBeGreaterThan(0); // Pelo menos 1 marca inicial
  });

  it('deve adicionar uma nova marca corretamente', async () => {
    render(
      <BrandProvider>
        <TestComponent />
      </BrandProvider>
    );

    const addButton = screen.getByRole('button', { name: /adicionar marca/i });
    await userEvent.click(addButton);

    const list = screen.getByTestId('brand-list');
    expect(list).toHaveTextContent('Nova Marca');
  });
});

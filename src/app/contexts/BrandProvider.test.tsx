// app/contexts/BrandProvider.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useContext } from 'react';
import { BrandProvider } from './BrandProvider';
import { BrandContext } from './BrandContext';
import '@testing-library/jest-dom';

describe('BrandProvider', () => {
  const TestComponent = () => {
    const { brands, addBrand, updateBrand, removeBrand } = useContext(BrandContext);
    return (
      <div>
        <ul data-testid="brand-list">
          {brands.map((b) => (
            <li key={b.id}>
              {b.name}
              <button onClick={() => updateBrand(b.id, `Atualizada ${b.name}`)}>Atualizar</button>
              <button onClick={() => removeBrand(b.id)}>Remover</button>
            </li>
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

  it('deve atualizar uma marca existente', async () => {
    render(
      <BrandProvider>
        <TestComponent />
      </BrandProvider>
    );

    const firstUpdateButton = screen.getAllByText(/atualizar/i)[0];
    await userEvent.click(firstUpdateButton);

    const list = screen.getByTestId('brand-list');
    expect(list.children[0]).toHaveTextContent('Atualizada');
  });

  it('deve remover uma marca existente', async () => {
    render(
      <BrandProvider>
        <TestComponent />
      </BrandProvider>
    );

    const initialCount = screen.getByTestId('brand-list').children.length;
    const firstRemoveButton = screen.getAllByText(/remover/i)[0];
    await userEvent.click(firstRemoveButton);

    const list = screen.getByTestId('brand-list');
    expect(list.children.length).toBe(initialCount - 1);
  });
});

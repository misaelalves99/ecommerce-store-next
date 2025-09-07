// app/contexts/CategoryProvider.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useContext } from 'react';
import { CategoryProvider } from './CategoryProvider';
import { CategoryContext } from './CategoryContext';
import '@testing-library/jest-dom';

describe('CategoryProvider', () => {
  const TestComponent = () => {
    const { categories, addCategory, updateCategory, removeCategory } =
      useContext(CategoryContext);

    return (
      <div>
        <ul data-testid="category-list">
          {categories.map((c) => (
            <li key={c.id}>
              {c.name}
              <button onClick={() => updateCategory(c.id, { name: `Atualizada ${c.name}` })}>
                Atualizar
              </button>
              <button onClick={() => removeCategory(c.id)}>Remover</button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => addCategory({ name: 'Nova Categoria', description: 'Descrição' })}
        >
          Adicionar Categoria
        </button>
      </div>
    );
  };

  it('deve inicializar com categorias mockadas', () => {
    render(
      <CategoryProvider>
        <TestComponent />
      </CategoryProvider>
    );

    const list = screen.getByTestId('category-list');
    expect(list.children.length).toBeGreaterThan(0);
  });

  it('deve adicionar uma nova categoria corretamente', async () => {
    render(
      <CategoryProvider>
        <TestComponent />
      </CategoryProvider>
    );

    const addButton = screen.getByRole('button', { name: /adicionar categoria/i });
    await userEvent.click(addButton);

    const list = screen.getByTestId('category-list');
    expect(list).toHaveTextContent('Nova Categoria');
  });

  it('deve atualizar uma categoria existente', async () => {
    render(
      <CategoryProvider>
        <TestComponent />
      </CategoryProvider>
    );

    const firstUpdateButton = screen.getAllByText(/atualizar/i)[0];
    await userEvent.click(firstUpdateButton);

    const list = screen.getByTestId('category-list');
    expect(list.children[0]).toHaveTextContent('Atualizada');
  });

  it('deve remover uma categoria existente', async () => {
    render(
      <CategoryProvider>
        <TestComponent />
      </CategoryProvider>
    );

    const initialCount = screen.getByTestId('category-list').children.length;
    const firstRemoveButton = screen.getAllByText(/remover/i)[0];
    await userEvent.click(firstRemoveButton);

    const list = screen.getByTestId('category-list');
    expect(list.children.length).toBe(initialCount - 1);
  });
});

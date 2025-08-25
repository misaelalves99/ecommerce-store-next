// app/contexts/CategoryProvider.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CategoryProvider } from './CategoryProvider';
import { CategoryContext } from './CategoryContext';
import React, { useContext } from 'react';
import '@testing-library/jest-dom';

describe('CategoryProvider', () => {
  const TestComponent = () => {
    const { categories, addCategory } = useContext(CategoryContext);
    return (
      <div>
        <ul data-testid="category-list">
          {categories.map((c) => (
            <li key={c.id}>{c.name}</li>
          ))}
        </ul>
        <button onClick={() => addCategory({ name: 'Nova Categoria', description: 'Descrição' })}>
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
    expect(list.children.length).toBeGreaterThan(0); // Pelo menos 1 categoria inicial
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
});

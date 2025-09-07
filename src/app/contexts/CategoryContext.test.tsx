// app/contexts/CategoryContext.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import React, { useContext } from 'react';
import { CategoryContext } from './CategoryContext';
import '@testing-library/jest-dom';
import type { CategoryContextType } from '../types/CategoryContextType';

describe('CategoryContext - valor padrão', () => {
  const TestComponent = () => {
    const { categories, addCategory, updateCategory, removeCategory } =
      useContext<CategoryContextType>(CategoryContext);

    return (
      <div>
        <span data-testid="categories-count">{categories.length}</span>
        <button
          onClick={() =>
            addCategory({ name: 'Nova Categoria', description: 'Descrição' })
          }
        >
          Adicionar
        </button>
        <button onClick={() => updateCategory(1, { name: 'Atualizada' })}>
          Atualizar
        </button>
        <button onClick={() => removeCategory(1)}>Remover</button>
      </div>
    );
  };

  it('deve fornecer valor padrão corretamente', () => {
    render(<TestComponent />);

    // Array inicial vazio
    expect(screen.getByTestId('categories-count')).toHaveTextContent('0');

    // Botões existem
    expect(screen.getByRole('button', { name: /adicionar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /atualizar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /remover/i })).toBeInTheDocument();

    // Clicar nos botões não quebra (funções vazias)
    fireEvent.click(screen.getByRole('button', { name: /adicionar/i }));
    fireEvent.click(screen.getByRole('button', { name: /atualizar/i }));
    fireEvent.click(screen.getByRole('button', { name: /remover/i }));
  });
});

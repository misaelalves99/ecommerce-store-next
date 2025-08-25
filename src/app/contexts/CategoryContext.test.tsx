// app/contexts/CategoryContext.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { CategoryContext } from './CategoryContext';
import React, { useContext } from 'react';
import '@testing-library/jest-dom';
import type { CategoryContextType } from '../types/CategoryContextType';

describe('CategoryContext', () => {
  it('deve fornecer o valor padrão corretamente', () => {
    const TestComponent = () => {
      const context = useContext<CategoryContextType>(CategoryContext);
      return (
        <div>
          <span data-testid="categories-count">{context.categories.length}</span>
          {/* Corrigido: passamos um objeto categoria válido */}
          <button
            onClick={() =>
              context.addCategory({ name: 'Nova Categoria', description: 'Descrição' })
            }
          >
            Adicionar
          </button>
        </div>
      );
    };

    render(<TestComponent />);

    expect(screen.getByTestId('categories-count')).toHaveTextContent('0');

    const button = screen.getByRole('button', { name: /adicionar/i });
    expect(button).toBeInTheDocument();

    // Simula clique
    fireEvent.click(button);
  });
});

// app/contexts/BrandContext.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { BrandContext } from './BrandContext';
import React, { useContext } from 'react';
import '@testing-library/jest-dom';
import type { BrandContextType } from '../types/BrandContextType';

describe('BrandContext', () => {
  it('deve fornecer o valor padrão corretamente', () => {
    const TestComponent = () => {
      const context = useContext<BrandContextType>(BrandContext);
      return (
        <div>
          <span data-testid="brands-count">{context.brands.length}</span>
          {/* Corrigido: passamos uma função que chama addBrand com valor fixo */}
          <button onClick={() => context.addBrand('Nova Marca')}>Adicionar</button>
        </div>
      );
    };

    render(<TestComponent />);

    expect(screen.getByTestId('brands-count')).toHaveTextContent('0');

    const button = screen.getByRole('button', { name: /adicionar/i });
    expect(button).toBeInTheDocument();

    // Podemos testar clique
    fireEvent.click(button);
  });
});

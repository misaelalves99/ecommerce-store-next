// app/contexts/BrandContext.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import React, { useContext } from 'react';
import { BrandContext } from './BrandContext';
import '@testing-library/jest-dom';

describe('BrandContext - valor padrão', () => {
  const TestComponent = () => {
    const { brands, addBrand, updateBrand, removeBrand } = useContext(BrandContext);
    return (
      <div>
        <span data-testid="brands-count">{brands.length}</span>
        <button onClick={() => addBrand('Nova Marca')}>Adicionar</button>
        <button onClick={() => updateBrand(1, 'Atualizada')}>Atualizar</button>
        <button onClick={() => removeBrand(1)}>Remover</button>
      </div>
    );
  };

  it('deve fornecer valor padrão corretamente', () => {
    render(<TestComponent />);

    // Array inicial vazio
    expect(screen.getByTestId('brands-count')).toHaveTextContent('0');

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

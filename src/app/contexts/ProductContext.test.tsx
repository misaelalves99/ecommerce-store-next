// app/contexts/ProductContext.test.tsx

import { render, screen } from '@testing-library/react';
import { ProductContext } from './ProductContext';
import React, { useContext } from 'react';
import '@testing-library/jest-dom';
import type { ProductContextType } from '../types/ProductContextType';

describe('ProductContext', () => {
  it('deve fornecer undefined como valor padrão quando não houver Provider', () => {
    const TestComponent = () => {
      // ⬅️ permite undefined
      const context = useContext<ProductContextType | undefined>(ProductContext);
      return (
        <div>
          <span data-testid="context-value">{context ? 'defined' : 'undefined'}</span>
        </div>
      );
    };

    render(<TestComponent />);
    expect(screen.getByTestId('context-value')).toHaveTextContent('undefined');
  });

  it('deve fornecer valores quando o Provider for usado', () => {
    const mockContext: ProductContextType = {
      products: [],
      addProduct: jest.fn(),
      removeProduct: jest.fn(),
      updateProduct: jest.fn(),
    };

    const TestComponent = () => {
      const context = useContext<ProductContextType | undefined>(ProductContext);
      return (
        <div>
          <span data-testid="context-value">{context ? 'defined' : 'undefined'}</span>
        </div>
      );
    };

    render(
      <ProductContext.Provider value={mockContext}>
        <TestComponent />
      </ProductContext.Provider>
    );

    expect(screen.getByTestId('context-value')).toHaveTextContent('defined');
  });
});

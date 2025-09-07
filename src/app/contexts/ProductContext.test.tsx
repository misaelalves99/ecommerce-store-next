// app/contexts/ProductContext.test.tsx

import { render, screen } from '@testing-library/react';
import React, { useContext } from 'react';
import { ProductContext, ProductContextType } from './ProductContext';
import '@testing-library/jest-dom';

describe('ProductContext - valor padrão', () => {
  const TestComponent = () => {
    const context = useContext<ProductContextType | undefined>(ProductContext);
    return (
      <div>
        <span data-testid="context-value">{context ? 'defined' : 'undefined'}</span>
      </div>
    );
  };

  it('deve ser undefined sem Provider', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('context-value')).toHaveTextContent('undefined');
  });

  it('deve fornecer valores quando Provider é usado', () => {
    const mockContext: ProductContextType = {
      products: [],
      addProduct: jest.fn(),
      updateProduct: jest.fn(),
      removeProduct: jest.fn(),
    };

    render(
      <ProductContext.Provider value={mockContext}>
        <TestComponent />
      </ProductContext.Provider>
    );

    expect(screen.getByTestId('context-value')).toHaveTextContent('defined');
  });
});

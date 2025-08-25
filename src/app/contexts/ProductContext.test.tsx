// app/contexts/ProductContext.test.tsx

import { render, screen } from '@testing-library/react';
import { ProductContext } from './ProductContext';
import React, { useContext } from 'react';
import '@testing-library/jest-dom';
import type { ProductContextType } from '../types/ProductContextType';

describe('ProductContext', () => {
  it('deve fornecer undefined como valor padrão', () => {
    const TestComponent = () => {
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
});

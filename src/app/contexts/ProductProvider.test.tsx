// app/contexts/ProductProvider.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductProvider } from './ProductProvider';
import { ProductContext } from './ProductContext';
import React, { useContext } from 'react';
import '@testing-library/jest-dom';

describe('ProductProvider', () => {
  const TestComponent = () => {
    const { products, addProduct } = useContext(ProductContext)!;
    return (
      <div>
        <ul data-testid="product-list">
          {products.map((p) => (
            <li key={p.id}>{p.name}</li>
          ))}
        </ul>
        <button
          onClick={() =>
            addProduct({
              id: 0,
              name: 'Novo Produto',
              description: 'Descrição',
              sku: 'SKU001',
              price: 100,
              stock: 10,
              categoryId: 1,
              brandId: 1,
              isActive: true,
            })
          }
        >
          Adicionar Produto
        </button>
      </div>
    );
  };

  it('deve inicializar com produtos mockados', () => {
    render(
      <ProductProvider>
        <TestComponent />
      </ProductProvider>
    );

    const list = screen.getByTestId('product-list');
    expect(list.children.length).toBeGreaterThan(0); // Pelo menos 1 produto inicial
  });

  it('deve adicionar um novo produto corretamente', async () => {
    render(
      <ProductProvider>
        <TestComponent />
      </ProductProvider>
    );

    const addButton = screen.getByRole('button', { name: /adicionar produto/i });
    await userEvent.click(addButton);

    const list = screen.getByTestId('product-list');
    expect(list).toHaveTextContent('Novo Produto');
  });
});

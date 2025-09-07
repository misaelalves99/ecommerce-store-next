// app/contexts/ProductProvider.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useContext } from 'react';
import { ProductsProvider } from './ProductProvider';
import { ProductContext } from './ProductContext';
import '@testing-library/jest-dom';
import type { Product } from '../types/Product';

describe('ProductsProvider', () => {
  const TestComponent = () => {
    const context = useContext(ProductContext)!;
    const { products, addProduct, updateProduct, removeProduct } = context;

    return (
      <div>
        <ul data-testid="product-list">
          {products.map((p) => (
            <li key={p.id}>
              {p.name}
              <button onClick={() => updateProduct({ ...p, name: `Atualizado ${p.name}` })}>
                Atualizar
              </button>
              <button onClick={() => removeProduct(p.id)}>Remover</button>
            </li>
          ))}
        </ul>
        <button
          onClick={() =>
            addProduct({
              name: 'Novo Produto',
              description: 'Descrição',
              sku: 'SKU001',
              price: 100,
              stock: 10,
              categoryId: 1,
              brandId: 1,
              isActive: true,
            } as Product)
          }
        >
          Adicionar Produto
        </button>
      </div>
    );
  };

  it('deve inicializar com produtos mockados', () => {
    render(
      <ProductsProvider>
        <TestComponent />
      </ProductsProvider>
    );

    const list = screen.getByTestId('product-list');
    expect(list.children.length).toBeGreaterThan(0);
  });

  it('deve adicionar um novo produto corretamente', async () => {
    render(
      <ProductsProvider>
        <TestComponent />
      </ProductsProvider>
    );

    const addButton = screen.getByRole('button', { name: /adicionar produto/i });
    await userEvent.click(addButton);

    const list = screen.getByTestId('product-list');
    expect(list).toHaveTextContent('Novo Produto');
  });

  it('deve atualizar um produto existente', async () => {
    render(
      <ProductsProvider>
        <TestComponent />
      </ProductsProvider>
    );

    const firstUpdateButton = screen.getAllByText(/atualizar/i)[0];
    await userEvent.click(firstUpdateButton);

    const list = screen.getByTestId('product-list');
    expect(list.children[0]).toHaveTextContent(/Atualizado/);
  });

  it('deve remover um produto existente', async () => {
    render(
      <ProductsProvider>
        <TestComponent />
      </ProductsProvider>
    );

    const initialCount = screen.getByTestId('product-list').children.length;
    const firstRemoveButton = screen.getAllByText(/remover/i)[0];
    await userEvent.click(firstRemoveButton);

    const list = screen.getByTestId('product-list');
    expect(list.children.length).toBe(initialCount - 1);
  });
});

// app/products/page.test.tsx

import { render, screen } from '@testing-library/react';
import ProductsPage from './page';
import * as useProductsHook from '../hooks/useProducts';
import { products as mockProducts } from '../mocks/products';

jest.mock('../hooks/useProducts');

describe('ProductsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar título e botão de adicionar', () => {
    (useProductsHook.useProducts as jest.Mock).mockReturnValue({
      products: [],
    });

    render(<ProductsPage />);

    expect(screen.getByText(/Produtos/i)).toBeInTheDocument();
    expect(screen.getByText(/Adicionar Produto/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Adicionar Produto/i })).toHaveAttribute('href', '/products/create');
  });

  it('deve renderizar lista de produtos', () => {
    (useProductsHook.useProducts as jest.Mock).mockReturnValue({
      products: mockProducts,
    });

    render(<ProductsPage />);

    // Verifica se cada produto está na tela pelo nome
    mockProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });
  });
});

// app/products/page.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductsPage from './page';
import * as useProductsHook from '../hooks/useProducts';
import * as nextNavigation from 'next/navigation';
import { products as mockProducts } from '../mocks/products';

jest.mock('../hooks/useProducts');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('ProductsPage', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (nextNavigation.useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  it('deve renderizar título e botão de adicionar', () => {
    (useProductsHook.useProducts as jest.Mock).mockReturnValue({
      products: [],
    });

    render(<ProductsPage />);

    expect(screen.getByText(/Produtos/i)).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /Cadastrar Novo Produto/i });
    expect(button).toBeInTheDocument();

    // Testa clique do botão
    userEvent.click(button);
    expect(pushMock).toHaveBeenCalledWith('/products/create');
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

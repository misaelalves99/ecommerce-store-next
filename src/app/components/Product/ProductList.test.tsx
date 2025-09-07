// app/components/Product/ProductList.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import ProductList from './ProductList';
import type { Product } from '../../types/Product';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { useProducts } from '../../hooks/useProducts';
import { useBrands } from '../../hooks/useBrands';
import { useCategories } from '../../hooks/useCategories';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../hooks/useProducts');
jest.mock('../../hooks/useBrands');
jest.mock('../../hooks/useCategories');

describe('ProductList', () => {
  const mockPush = jest.fn();

  const products: Product[] = [
    {
      id: 1,
      name: 'Smartphone XYZ',
      description: 'Smartphone com várias funcionalidades',
      sku: 'XYZ123',
      price: 1999.99,
      stock: 50,
      categoryId: 1,
      brandId: 1,
      categoryName: 'Eletrônicos',
      brandName: 'MarcaX',
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'Camiseta ABC',
      description: 'Camiseta confortável para esportes',
      sku: 'ABC456',
      price: 99.9,
      stock: 100,
      categoryId: 2,
      brandId: 2,
      categoryName: 'Roupas',
      brandName: 'MarcaY',
      isActive: false,
      createdAt: new Date().toISOString(),
    },
  ];

  const brands = [
    { id: 1, name: 'MarcaX' },
    { id: 2, name: 'MarcaY' },
  ];

  const categories = [
    { id: 1, name: 'Eletrônicos' },
    { id: 2, name: 'Roupas' },
  ];

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useProducts as jest.Mock).mockReturnValue({ products });
    (useBrands as jest.Mock).mockReturnValue({ brands });
    (useCategories as jest.Mock).mockReturnValue({ categories });
    jest.clearAllMocks();
  });

  it('deve renderizar cabeçalho da tabela', () => {
    render(<ProductList />);
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Preço')).toBeInTheDocument();
    expect(screen.getByText('Marca')).toBeInTheDocument();
    expect(screen.getByText('Categoria')).toBeInTheDocument();
    expect(screen.getByText('Ativo')).toBeInTheDocument();
    expect(screen.getByText('Ações')).toBeInTheDocument();
  });

  it('deve renderizar corretamente os produtos e seus dados', () => {
    render(<ProductList />);

    // Primeiro produto
    expect(screen.getByText('Smartphone XYZ')).toBeInTheDocument();
    expect(screen.getByText('R$ 1.999,99')).toBeInTheDocument();
    expect(screen.getByText('Eletrônicos')).toBeInTheDocument();
    expect(screen.getByText('MarcaX')).toBeInTheDocument();
    expect(screen.getByText('Sim')).toBeInTheDocument();

    // Segundo produto
    expect(screen.getByText('Camiseta ABC')).toBeInTheDocument();
    expect(screen.getByText('R$ 99,90')).toBeInTheDocument();
    expect(screen.getByText('Roupas')).toBeInTheDocument();
    expect(screen.getByText('MarcaY')).toBeInTheDocument();
    expect(screen.getByText('Não')).toBeInTheDocument();
  });

  it('deve navegar corretamente ao clicar nos botões', () => {
    render(<ProductList />);

    fireEvent.click(screen.getAllByText('Detalhes')[0]);
    expect(mockPush).toHaveBeenCalledWith('/products/1');

    fireEvent.click(screen.getAllByText('Editar')[0]);
    expect(mockPush).toHaveBeenCalledWith('/products/edit/1');

    fireEvent.click(screen.getAllByText('Excluir')[0]);
    expect(mockPush).toHaveBeenCalledWith('/products/delete/1');
  });

  it('deve exibir mensagem quando não houver produtos', () => {
    (useProducts as jest.Mock).mockReturnValue({ products: [] });
    render(<ProductList />);
    expect(screen.getByText('Nenhum produto encontrado.')).toBeInTheDocument();
  });
});

// app/components/Product/ProductList.test.tsx

import { render, screen } from '@testing-library/react';
import ProductList from './ProductList';
import type { Product } from '../../types/Product';
import '@testing-library/jest-dom';

describe('ProductList', () => {
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
      category: { name: 'Eletrônicos' },
      brand: { name: 'MarcaX' },
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
      category: { name: 'Roupas' },
      brand: { name: 'MarcaY' },
      isActive: false,
      createdAt: new Date().toISOString(), // 🔹 adicionado
    },
  ];

  it('deve renderizar cabeçalho da tabela', () => {
    render(<ProductList products={products} />);
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Preço')).toBeInTheDocument();
    expect(screen.getByText('Categoria')).toBeInTheDocument();
    expect(screen.getByText('Marca')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Ações')).toBeInTheDocument();
  });

  it('deve renderizar corretamente os produtos e seus dados', () => {
    render(<ProductList products={products} />);

    // Primeiro produto
    expect(screen.getByText('Smartphone XYZ')).toBeInTheDocument();
    expect(screen.getByText('R$ 1.999,99')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('Eletrônicos')).toBeInTheDocument();
    expect(screen.getByText('MarcaX')).toBeInTheDocument();
    expect(screen.getByText('Ativo')).toBeInTheDocument();

    // Segundo produto
    expect(screen.getByText('Camiseta ABC')).toBeInTheDocument();
    expect(screen.getByText('R$ 99,90')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Roupas')).toBeInTheDocument();
    expect(screen.getByText('MarcaY')).toBeInTheDocument();
    expect(screen.getByText('Inativo')).toBeInTheDocument();
  });

  it('deve renderizar links de ações corretamente', () => {
    render(<ProductList products={products} />);

    const detalhesLink = screen.getByText('Detalhes');
    expect(detalhesLink).toHaveAttribute('href', '/products/1');

    const editarLink = screen.getByText('Editar');
    expect(editarLink).toHaveAttribute('href', '/products/edit/1');

    const excluirLink = screen.getByText('Excluir');
    expect(excluirLink).toHaveAttribute('href', '/products/delete/1');
  });
});

// app/components/Product/ProductDetails.test.tsx

import { render, screen } from '@testing-library/react';
import ProductDetails from './ProductDetails';
import type { Product } from '../../types/Product';
import '@testing-library/jest-dom';

describe('ProductDetails', () => {
  const mockProduct: Product = {
    id: 1,
    name: 'Smartphone XYZ',
    description: 'Smartphone com várias funcionalidades',
    sku: 'XYZ123',
    price: 1999.99,
    stock: 50,
    categoryId: 1,
    brandId: 1,
    category: { name: 'Eletrônicos' }, // apenas name, opcional
    brand: { name: 'MarcaX' },         // apenas name, opcional
    isActive: true,
  };

  it('deve renderizar corretamente todas as informações do produto', () => {
    render(<ProductDetails product={mockProduct} />);

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();

    expect(screen.getByText('Descrição:')).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();

    expect(screen.getByText('SKU:')).toBeInTheDocument();
    expect(screen.getByText(mockProduct.sku)).toBeInTheDocument();

    expect(screen.getByText('Preço:')).toBeInTheDocument();
    expect(
      screen.getByText(mockProduct.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
    ).toBeInTheDocument();

    expect(screen.getByText('Estoque:')).toBeInTheDocument();
    expect(screen.getByText(String(mockProduct.stock))).toBeInTheDocument();

    expect(screen.getByText('Categoria:')).toBeInTheDocument();
    expect(screen.getByText(mockProduct.category?.name ?? '-')).toBeInTheDocument();

    expect(screen.getByText('Marca:')).toBeInTheDocument();
    expect(screen.getByText(mockProduct.brand?.name ?? '-')).toBeInTheDocument();

    expect(screen.getByText('Status:')).toBeInTheDocument();
    expect(screen.getByText('Ativo')).toBeInTheDocument();
  });

  it('deve exibir "-" quando categoria ou marca forem undefined', () => {
    const productWithoutCategoryAndBrand: Product = {
      ...mockProduct,
      category: undefined,
      brand: undefined,
    };
    render(<ProductDetails product={productWithoutCategoryAndBrand} />);

    expect(screen.getAllByText('-').length).toBeGreaterThanOrEqual(2); // Categoria e Marca
  });

  it('deve exibir "Inativo" quando isActive for false', () => {
    const inactiveProduct: Product = { ...mockProduct, isActive: false };
    render(<ProductDetails product={inactiveProduct} />);

    expect(screen.getByText('Inativo')).toBeInTheDocument();
  });
});

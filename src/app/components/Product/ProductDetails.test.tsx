// app/components/Product/ProductDetails.test.tsx
import { render, screen } from '@testing-library/react';
import ProductDetails from './ProductDetails';
import type { Product } from '../../types/Product';
import '@testing-library/jest-dom';

describe('ProductDetails - testes robustos', () => {
  const baseProduct: Product = {
    id: 1,
    name: 'Produto Teste',
    description: 'Descrição teste',
    sku: 'SKU123',
    price: 100,
    stock: 10,
    categoryId: 1,
    brandId: 1,
    categoryName: 'Categoria X',
    brandName: 'Marca Y',
    isActive: true,
    createdAt: new Date().toISOString(),
  };

  it('renderiza corretamente todas as informações', () => {
    render(<ProductDetails product={baseProduct} />);

    expect(screen.getByText(baseProduct.name)).toBeInTheDocument();
    expect(screen.getByText('Descrição:')).toBeInTheDocument();
    expect(screen.getByText(baseProduct.description)).toBeInTheDocument();

    expect(screen.getByText('SKU:')).toBeInTheDocument();
    expect(screen.getByText(baseProduct.sku)).toBeInTheDocument();

    expect(screen.getByText('Preço:')).toBeInTheDocument();
    expect(
      screen.getByText(baseProduct.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
    ).toBeInTheDocument();

    expect(screen.getByText('Estoque:')).toBeInTheDocument();
    expect(screen.getByText(String(baseProduct.stock))).toBeInTheDocument();

    expect(screen.getByText('Categoria:')).toBeInTheDocument();
    expect(screen.getByText(baseProduct.categoryName ?? '-')).toBeInTheDocument();

    expect(screen.getByText('Marca:')).toBeInTheDocument();
    expect(screen.getByText(baseProduct.brandName ?? '-')).toBeInTheDocument();

    expect(screen.getByText('Status:')).toBeInTheDocument();
    expect(screen.getByText('Ativo')).toBeInTheDocument();
  });

  it('exibe "-" quando categoria ou marca forem ausentes', () => {
    const product = { ...baseProduct, categoryName: '', brandName: '' };
    render(<ProductDetails product={product} />);

    const dashes = screen.getAllByText('-');
    expect(dashes.length).toBeGreaterThanOrEqual(2);
  });

  it('exibe "Inativo" quando isActive for false', () => {
    const product = { ...baseProduct, isActive: false };
    render(<ProductDetails product={product} />);
    expect(screen.getByText('Inativo')).toBeInTheDocument();
  });

  it('renderiza preço zero corretamente', () => {
    const product = { ...baseProduct, price: 0 };
    render(<ProductDetails product={product} />);
    expect(screen.getByText('R$ 0,00')).toBeInTheDocument();
  });

  it('renderiza estoque zero corretamente', () => {
    const product = { ...baseProduct, stock: 0 };
    render(<ProductDetails product={product} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renderiza strings vazias corretamente', () => {
    const product = { ...baseProduct, name: '', description: '', sku: '' };
    render(<ProductDetails product={product} />);
    expect(screen.getByText('')).toBeInTheDocument();
    expect(screen.getByText('Descrição:')).toBeInTheDocument();
    expect(screen.getByText('SKU:')).toBeInTheDocument();
  });
});

// app/components/Product/ProductForm.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductForm from './ProductForm';
import type { Product, Category, Brand } from '../../types/Product';

describe('ProductForm', () => {
  const mockCategories: Category[] = [
    { id: 1, name: 'Eletrônicos' },
    { id: 2, name: 'Roupas' },
  ];

  const mockBrands: Brand[] = [
    { id: 1, name: 'MarcaX' },
    { id: 2, name: 'MarcaY' },
  ];

  const initialProduct: Product = {
    id: 1,
    name: '',
    description: '',
    sku: '',
    price: 0,
    stock: 0,
    categoryId: 0,
    brandId: 0,
    categoryName: '',
    brandName: '',
    isActive: true,
    createdAt: new Date().toISOString(),
  };

  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar todos os campos do formulário', () => {
    render(
      <ProductForm
        initialData={initialProduct}
        categories={mockCategories}
        brands={mockBrands}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sku/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/preço/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/estoque/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/categoria/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/marca/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ativo/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /salvar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
  });

  it('deve preencher os campos com valores iniciais', () => {
    const filledProduct: Product = {
      ...initialProduct,
      name: 'Produto X',
      description: 'Descrição X',
      sku: 'SKU001',
      price: 100,
      stock: 10,
      categoryId: 1,
      brandId: 1,
      categoryName: 'Eletrônicos',
      brandName: 'MarcaX',
      isActive: false,
    };

    render(
      <ProductForm
        initialData={filledProduct}
        categories={mockCategories}
        brands={mockBrands}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByLabelText(/nome/i)).toHaveValue('Produto X');
    expect(screen.getByLabelText(/descrição/i)).toHaveValue('Descrição X');
    expect(screen.getByLabelText(/sku/i)).toHaveValue('SKU001');
    expect(screen.getByLabelText(/preço/i)).toHaveValue(100);
    expect(screen.getByLabelText(/estoque/i)).toHaveValue(10);
    expect(screen.getByLabelText(/categoria/i)).toHaveValue('1');
    expect(screen.getByLabelText(/marca/i)).toHaveValue('1');
    expect(screen.getByLabelText(/ativo/i)).not.toBeChecked();
  });

  it('deve exibir erros de validação se campos obrigatórios estiverem vazios', async () => {
    render(
      <ProductForm
        initialData={initialProduct}
        categories={mockCategories}
        brands={mockBrands}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /salvar/i }));

    expect(await screen.findByText(/nome é obrigatório/i)).toBeInTheDocument();
    expect(screen.getByText(/descrição é obrigatória/i)).toBeInTheDocument();
    expect(screen.getByText(/sku é obrigatório/i)).toBeInTheDocument();
    expect(screen.getByText(/preço deve ser maior que zero/i)).toBeInTheDocument();
    expect(screen.getByText(/estoque não pode ser negativo/i)).toBeInTheDocument();
    expect(screen.getByText(/categoria é obrigatória/i)).toBeInTheDocument();
    expect(screen.getByText(/marca é obrigatória/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('deve chamar onSubmit com os dados corretos quando o formulário for válido', async () => {
    render(
      <ProductForm
        initialData={initialProduct}
        categories={mockCategories}
        brands={mockBrands}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    await userEvent.type(screen.getByLabelText(/nome/i), 'Smartphone XYZ');
    await userEvent.type(screen.getByLabelText(/descrição/i), 'Smartphone avançado');
    await userEvent.type(screen.getByLabelText(/sku/i), 'XYZ123');
    await userEvent.type(screen.getByLabelText(/preço/i), '1999.99');
    await userEvent.type(screen.getByLabelText(/estoque/i), '50');
    await userEvent.selectOptions(screen.getByLabelText(/categoria/i), '1');
    await userEvent.selectOptions(screen.getByLabelText(/marca/i), '1');

    fireEvent.click(screen.getByRole('button', { name: /salvar/i }));

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Smartphone XYZ',
        description: 'Smartphone avançado',
        sku: 'XYZ123',
        price: 1999.99,
        stock: 50,
        categoryId: 1,
        brandId: 1,
        categoryName: 'Eletrônicos',
        brandName: 'MarcaX',
      })
    );
  });

  it('atualiza categoryName e brandName ao selecionar categoria/marca', async () => {
    render(
      <ProductForm
        initialData={initialProduct}
        categories={mockCategories}
        brands={mockBrands}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    await userEvent.selectOptions(screen.getByLabelText(/categoria/i), '2');
    await userEvent.selectOptions(screen.getByLabelText(/marca/i), '2');

    fireEvent.click(screen.getByRole('button', { name: /salvar/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        categoryId: 2,
        categoryName: 'Roupas',
        brandId: 2,
        brandName: 'MarcaY',
      })
    );
  });

  it('deve chamar onCancel quando o botão Cancelar for clicado', () => {
    render(
      <ProductForm
        initialData={initialProduct}
        categories={mockCategories}
        brands={mockBrands}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /cancelar/i }));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('deve alternar o checkbox de isActive', () => {
    render(
      <ProductForm
        initialData={initialProduct}
        categories={mockCategories}
        brands={mockBrands}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    const checkbox = screen.getByLabelText(/ativo/i) as HTMLInputElement;
    expect(checkbox.checked).toBe(true);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });
});

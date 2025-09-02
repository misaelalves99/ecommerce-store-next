// app/products/create/page.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import CreateProductPage from './page';
import * as nextNavigation from 'next/navigation';
import * as useProductsHook from '../../hooks/useProducts';
import { categories as mockCategories } from '../../mocks/categories';
import { brands as mockBrands } from '../../mocks/brands';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('CreateProductPage', () => {
  const pushMock = jest.fn();
  const addProductMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (nextNavigation.useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
    jest.spyOn(useProductsHook, 'useProducts').mockReturnValue({
      products: [],
      addProduct: addProductMock,
      removeProduct: jest.fn(), // 🔹 obrigatório para ProductContextType
      updateProduct: jest.fn(), // 🔹 obrigatório para ProductContextType
    });
  });

  it('deve renderizar o formulário com título correto', () => {
    render(<CreateProductPage />);

    expect(screen.getByText(/Adicionar Produto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descrição/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/SKU/i)).toBeInTheDocument();
  });

  it('deve chamar addProduct e router.push ao enviar o formulário', () => {
    render(<CreateProductPage />);

    const nameInput = screen.getByLabelText(/Nome/i);
    const descriptionInput = screen.getByLabelText(/Descrição/i);
    const skuInput = screen.getByLabelText(/SKU/i);
    const priceInput = screen.getByLabelText(/Preço/i);
    const stockInput = screen.getByLabelText(/Estoque/i);
    const categorySelect = screen.getByLabelText(/Categoria/i);
    const brandSelect = screen.getByLabelText(/Marca/i);
    const submitButton = screen.getByText(/Adicionar/i);

    fireEvent.change(nameInput, { target: { value: 'Produto Teste' } });
    fireEvent.change(descriptionInput, { target: { value: 'Descrição Teste' } });
    fireEvent.change(skuInput, { target: { value: 'SKU123' } });
    fireEvent.change(priceInput, { target: { value: 100 } });
    fireEvent.change(stockInput, { target: { value: 10 } });
    fireEvent.change(categorySelect, { target: { value: mockCategories[0].id } });
    fireEvent.change(brandSelect, { target: { value: mockBrands[0].id } });

    fireEvent.click(submitButton);

    expect(addProductMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Produto Teste',
        description: 'Descrição Teste',
        sku: 'SKU123',
        price: 100,
        stock: 10,
        categoryId: mockCategories[0].id,
        brandId: mockBrands[0].id,
      })
    );
    expect(pushMock).toHaveBeenCalledWith('/products');
  });

  it('deve chamar router.push ao cancelar', () => {
    render(<CreateProductPage />);

    const cancelButton = screen.getByText(/Cancelar/i);
    fireEvent.click(cancelButton);

    expect(pushMock).toHaveBeenCalledWith('/products');
  });
});

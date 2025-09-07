// app/products/edit/[id]/page.test.tsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditProductPage from './page';
import * as nextNavigation from 'next/navigation';
import { Product } from '../../../types/Product';
import '@testing-library/jest-dom';
import * as useProductsHook from '../../../hooks/useProducts';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('EditProductPage', () => {
  const pushMock = jest.fn();
  const useRouterMock = nextNavigation.useRouter as jest.Mock;

  const mockProduct: Product = {
    id: 1,
    name: 'Produto Teste',
    description: 'Descrição',
    sku: 'SKU123',
    price: 100,
    stock: 10,
    categoryId: 1,
    brandId: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
    categoryName: 'Categoria Teste',
    brandName: 'Marca Teste',
  };

  const updateProductMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useRouterMock.mockReturnValue({ push: pushMock });

    jest.spyOn(useProductsHook, 'useProducts').mockReturnValue({
      products: [mockProduct],
      addProduct: jest.fn(),
      removeProduct: jest.fn(),
      updateProduct: updateProductMock,
    });
  });

  it('deve renderizar "Carregando..." se o produto não for encontrado', () => {
    jest.spyOn(useProductsHook, 'useProducts').mockReturnValue({
      products: [],
      addProduct: jest.fn(),
      removeProduct: jest.fn(),
      updateProduct: jest.fn(),
    });

    render(<EditProductPage params={{ id: '9999' }} />);
    expect(screen.getByText(/Carregando/i)).toBeInTheDocument();
  });

  it('deve renderizar o formulário com dados do produto existente', async () => {
    render(<EditProductPage params={{ id: String(mockProduct.id) }} />);

    await waitFor(() => {
      expect(screen.getByText(/Editar Produto/i)).toBeInTheDocument();
      expect(screen.getByDisplayValue(mockProduct.name)).toBeInTheDocument();
      expect(screen.getByDisplayValue(mockProduct.description)).toBeInTheDocument();
      expect(screen.getByDisplayValue(mockProduct.sku)).toBeInTheDocument();
    });
  });

  it('botão cancelar deve chamar router.push', async () => {
    render(<EditProductPage params={{ id: String(mockProduct.id) }} />);

    const cancelButton = await screen.findByText(/Cancelar/i);
    fireEvent.click(cancelButton);

    expect(pushMock).toHaveBeenCalledWith('/products');
  });

  it('submeter formulário deve chamar updateProduct e router.push', async () => {
    render(<EditProductPage params={{ id: String(mockProduct.id) }} />);

    const submitButton = await screen.findByText(/Salvar/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(updateProductMock).toHaveBeenCalledWith(
        expect.objectContaining({
          id: mockProduct.id,
          name: mockProduct.name,
          description: mockProduct.description,
        })
      );
      expect(pushMock).toHaveBeenCalledWith('/products');
    });
  });
});

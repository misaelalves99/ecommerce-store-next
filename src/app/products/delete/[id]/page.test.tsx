// app/pages/products/delete/[id]/page.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeleteProductPage from './page';
import * as nextNavigation from 'next/navigation';
import * as useProductsHook from '../../../hooks/useProducts';
import { Product } from '../../../types/Product';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

describe('DeleteProductPage', () => {
  const pushMock = jest.fn();

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
    categoryName: 'Categoria Teste', // corrigido
    brandName: 'Marca Teste',        // corrigido
  };

  const removeProductMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (nextNavigation.useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (nextNavigation.useParams as jest.Mock).mockReturnValue({ id: String(mockProduct.id) });

    jest.spyOn(useProductsHook, 'useProducts').mockReturnValue({
      products: [mockProduct],
      addProduct: jest.fn(),
      removeProduct: removeProductMock,
      updateProduct: jest.fn(),
    });
  });

  it('deve renderizar corretamente o produto a ser excluído', () => {
    render(<DeleteProductPage />);
    expect(screen.getByText(/Excluir Produto/i)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(/Tem certeza que deseja excluir/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Excluir/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancelar/i })).toBeInTheDocument();
  });

  it('deve chamar removeProduct e redirecionar ao confirmar exclusão', async () => {
    render(<DeleteProductPage />);

    jest.spyOn(window, 'confirm').mockReturnValueOnce(true);

    const deleteButton = screen.getByRole('button', { name: /Excluir/i });
    await userEvent.click(deleteButton);

    expect(removeProductMock).toHaveBeenCalledWith(mockProduct.id);
    expect(pushMock).toHaveBeenCalledWith('/products');
  });

  it('não deve excluir o produto se o usuário cancelar a confirmação', async () => {
    render(<DeleteProductPage />);

    jest.spyOn(window, 'confirm').mockReturnValueOnce(false);

    const deleteButton = screen.getByRole('button', { name: /Excluir/i });
    await userEvent.click(deleteButton);

    expect(removeProductMock).not.toHaveBeenCalled();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it('deve navegar para /products ao clicar em Cancelar', async () => {
    render(<DeleteProductPage />);
    const cancelButton = screen.getByRole('button', { name: /Cancelar/i });
    await userEvent.click(cancelButton);

    expect(pushMock).toHaveBeenCalledWith('/products');
  });

  it('deve mostrar "Carregando..." se o produto não for encontrado', () => {
    (nextNavigation.useParams as jest.Mock).mockReturnValue({ id: '9999' });

    render(<DeleteProductPage />);
    expect(screen.getByText(/Carregando/i)).toBeInTheDocument();
  });
});

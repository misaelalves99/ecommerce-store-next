// app/products/create/page.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    (nextNavigation.useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    jest.spyOn(useProductsHook, 'useProducts').mockReturnValue({
      products: [],
      addProduct: addProductMock,
      removeProduct: jest.fn(),
      updateProduct: jest.fn(),
    });
  });

  it('deve renderizar o formulário com todos os campos', () => {
    render(<CreateProductPage />);

    expect(screen.getByText(/Cadastrar Produto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descrição/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/SKU/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Preço/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Estoque/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Marca/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Categoria/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Ativo/i)).toBeInTheDocument();
    expect(screen.getByText(/Salvar/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancelar/i)).toBeInTheDocument();
  });

  it('deve enviar o formulário corretamente e chamar addProduct e router.push', async () => {
    render(<CreateProductPage />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Nome/i), 'Produto Teste');
    await user.type(screen.getByLabelText(/Descrição/i), 'Descrição Teste');
    await user.type(screen.getByLabelText(/SKU/i), 'SKU123');
    await user.clear(screen.getByLabelText(/Preço/i));
    await user.type(screen.getByLabelText(/Preço/i), '100');
    await user.clear(screen.getByLabelText(/Estoque/i));
    await user.type(screen.getByLabelText(/Estoque/i), '10');
    await user.selectOptions(screen.getByLabelText(/Marca/i), mockBrands[0].id.toString());
    await user.selectOptions(screen.getByLabelText(/Categoria/i), mockCategories[0].id.toString());
    await user.click(screen.getByLabelText(/Ativo/i));
    await user.click(screen.getByText(/Salvar/i));

    expect(addProductMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Produto Teste',
        description: 'Descrição Teste',
        sku: 'SKU123',
        price: 100,
        stock: 10,
        brandId: mockBrands[0].id,
        categoryId: mockCategories[0].id,
        isActive: true,
      })
    );
    expect(pushMock).toHaveBeenCalledWith('/products');
  });

  it('deve chamar router.push ao cancelar', async () => {
    render(<CreateProductPage />);
    const user = userEvent.setup();
    await user.click(screen.getByText(/Cancelar/i));
    expect(pushMock).toHaveBeenCalledWith('/products');
  });
});

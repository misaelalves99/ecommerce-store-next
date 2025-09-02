// app/products/edit/[id]/page.test.tsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditProductPage from './page';
import * as nextNavigation from 'next/navigation';
import { products as mockProducts } from '../../../mocks/products';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('EditProductPage', () => {
  const pushMock = jest.fn();
  const useRouterMock = nextNavigation.useRouter as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    useRouterMock.mockReturnValue({ push: pushMock });
  });

  it('deve renderizar "Carregando..." se o produto não for encontrado', () => {
    render(<EditProductPage params={{ id: '9999' }} />);
    expect(screen.getByText(/Carregando/i)).toBeInTheDocument();
  });

  it('deve renderizar o formulário com dados do produto existente', async () => {
    const product = mockProducts[0];
    render(<EditProductPage params={{ id: String(product.id) }} />);

    // Espera até o efeito carregar os dados
    await waitFor(() => {
      expect(screen.getByText(/Editar Produto/i)).toBeInTheDocument();
      expect(screen.getByDisplayValue(product.name)).toBeInTheDocument();
      expect(screen.getByDisplayValue(product.description)).toBeInTheDocument();
      expect(screen.getByDisplayValue(product.sku)).toBeInTheDocument();
    });
  });

  it('botão cancelar deve chamar router.push', async () => {
    const product = mockProducts[0];
    render(<EditProductPage params={{ id: String(product.id) }} />);

    const cancelButton = await screen.findByText(/Cancelar/i);
    fireEvent.click(cancelButton);
    expect(pushMock).toHaveBeenCalledWith('/products');
  });

  it('submeter formulário deve chamar handleSave e router.push', async () => {
    const product = mockProducts[0];
    render(<EditProductPage params={{ id: String(product.id) }} />);

    const submitButton = await screen.findByText(/Salvar/i);
    fireEvent.click(submitButton);

    // Apenas verificamos se o push foi chamado (handleSave faz updateProduct e router.push)
    await waitFor(() => expect(pushMock).toHaveBeenCalledWith('/products'));
  });
});

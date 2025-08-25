// app/products/edit/[id]/page.test.tsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditProductPage from './page';
import * as nextNavigation from 'next/navigation';
import { products as mockProducts } from '../../../mocks/products';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

describe('EditProductPage', () => {
  const pushMock = jest.fn();
  const useRouterMock = nextNavigation.useRouter as jest.Mock;
  const useParamsMock = nextNavigation.useParams as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    useRouterMock.mockReturnValue({ push: pushMock });
  });

  it('deve renderizar "Carregando..." se o produto não for encontrado imediatamente', () => {
    useParamsMock.mockReturnValue({ id: '9999' });
    render(<EditProductPage />);
    expect(screen.getByText(/Carregando/i)).toBeInTheDocument();
  });

  it('deve renderizar o formulário com dados do produto existente', async () => {
    const product = mockProducts[0];
    useParamsMock.mockReturnValue({ id: String(product.id) });

    render(<EditProductPage />);

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
    useParamsMock.mockReturnValue({ id: String(product.id) });

    render(<EditProductPage />);

    const cancelButton = screen.getByText(/Cancelar/i);
    fireEvent.click(cancelButton);
    expect(pushMock).toHaveBeenCalledWith('/products');
  });

  it('submeter formulário deve chamar handleSave e router.push', async () => {
    const product = mockProducts[0];
    useParamsMock.mockReturnValue({ id: String(product.id) });

    render(<EditProductPage />);

    const submitButton = await screen.findByText(/Salvar/i);
    fireEvent.click(submitButton);

    // Apenas verificamos se o push foi chamado (handleSave faz console.log)
    await waitFor(() => expect(pushMock).toHaveBeenCalledWith('/products'));
  });
});

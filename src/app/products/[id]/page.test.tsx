// app/products/[id]/page.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DetailsProductPage from './page';
import { products as mockProducts } from '../../mocks/products';

// Mock do router
const pushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
  useParams: () => ({ id: String(mockProducts[0].id) }),
}));

// Mock do hook useProducts
jest.mock('../../hooks/useProducts', () => ({
  useProducts: () => ({ products: mockProducts }),
}));

describe('DetailsProductPage', () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it('deve renderizar detalhes do produto se encontrado', () => {
    render(<DetailsProductPage />);

    const product = mockProducts[0];

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(/Voltar/i)).toBeInTheDocument();
    expect(screen.getByText(/Editar/i)).toBeInTheDocument();
  });

  it('deve mostrar mensagem de produto não encontrado se id inválido', () => {
    // Mockar useParams para id inexistente
    jest.mocked(require('next/navigation').useParams).mockReturnValue({ id: '9999' });

    render(<DetailsProductPage />);

    expect(screen.getByText(/Produto não encontrado/i)).toBeInTheDocument();
    expect(screen.getByText(/Voltar/i)).toBeInTheDocument();
  });

  it('botão Voltar deve chamar router.push', async () => {
    render(<DetailsProductPage />);
    const button = screen.getByText(/Voltar/i);
    await userEvent.click(button);
    expect(pushMock).toHaveBeenCalledWith('/products');
  });

  it('botão Editar deve chamar router.push com o id do produto', async () => {
    render(<DetailsProductPage />);
    const button = screen.getByText(/Editar/i);
    await userEvent.click(button);
    expect(pushMock).toHaveBeenCalledWith(`/products/edit/${mockProducts[0].id}`);
  });
});

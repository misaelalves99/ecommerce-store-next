// app/products/[id]/page.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DetailsProductPage from './page';
import { products as mockProducts } from '../../mocks/products';
import * as nextNavigation from 'next/navigation';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

describe('DetailsProductPage', () => {
  const useParamsMock = nextNavigation.useParams as jest.Mock;

  it('deve renderizar detalhes do produto se encontrado', () => {
    const product = mockProducts[0];
    useParamsMock.mockReturnValue({ id: String(product.id) });

    render(<DetailsProductPage />);

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(/Voltar/i)).toBeInTheDocument();
  });

  it('deve mostrar mensagem de produto não encontrado se id inválido', () => {
    useParamsMock.mockReturnValue({ id: '9999' });

    render(<DetailsProductPage />);

    expect(screen.getByText(/Produto não encontrado/i)).toBeInTheDocument();
    expect(screen.getByText(/Voltar/i)).toBeInTheDocument();
  });

  it('botão Voltar deve existir e ser clicável', async () => {
    const product = mockProducts[0];
    useParamsMock.mockReturnValue({ id: String(product.id) });

    render(<DetailsProductPage />);

    const button = screen.getByText(/Voltar/i);
    expect(button).toBeInTheDocument();

    // Podemos apenas simular clique sem navegação real
    await userEvent.click(button);
  });
});

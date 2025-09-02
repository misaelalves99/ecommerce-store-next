// app/products/[id]/page.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DetailsProductPage from './page';
import { products as mockProducts } from '../../mocks/products';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

describe('DetailsProductPage', () => {
  it('deve renderizar detalhes do produto se encontrado', () => {
    const product = mockProducts[0];

    render(<DetailsProductPage params={{ id: String(product.id) }} />);

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(/Voltar/i)).toBeInTheDocument();
  });

  it('deve mostrar mensagem de produto não encontrado se id inválido', () => {
    render(<DetailsProductPage params={{ id: '9999' }} />);

    expect(screen.getByText(/Produto não encontrado/i)).toBeInTheDocument();
    expect(screen.getByText(/Voltar/i)).toBeInTheDocument();
  });

  it('botão Voltar deve existir e ser clicável', async () => {
    const product = mockProducts[0];

    render(<DetailsProductPage params={{ id: String(product.id) }} />);

    const button = screen.getByText(/Voltar/i);
    expect(button).toBeInTheDocument();

    // Simula clique (router.push está mockado)
    await userEvent.click(button);
  });
});

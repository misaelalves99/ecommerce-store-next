// app/categories/[id]/page.test.tsx

import { render, screen } from '@testing-library/react';
import DetailsCategoryPage from './page';
import { categories as mockCategories } from '../../mocks/categories';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('DetailsCategoryPage', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    jest.clearAllMocks();
    window.alert = jest.fn(); // mock alert global
  });

  it('exibe mensagem de loading inicialmente', () => {
    render(<DetailsCategoryPage params={{ id: '1' }} />);
    expect(screen.getByText(/Carregando detalhes da categoria/i)).toBeInTheDocument();
  });

  it('renderiza detalhes da categoria quando encontrada', async () => {
    render(<DetailsCategoryPage params={{ id: '1' }} />);

    const category = mockCategories.find(c => c.id === 1);

    expect(await screen.findByText('Detalhes da Categoria')).toBeInTheDocument();
    expect(screen.getByText(category!.name)).toBeInTheDocument();

    // Testa links
    const voltarLink = screen.getByRole('link', { name: /Voltar/i });
    const editarLink = screen.getByRole('link', { name: /Editar/i });

    expect(voltarLink).toHaveAttribute('href', '/categories');
    expect(editarLink).toHaveAttribute('href', `/categories/edit/${category!.id}`);
  });

  it('redireciona quando categoria não encontrada', () => {
    render(<DetailsCategoryPage params={{ id: '999' }} />);

    expect(window.alert).toHaveBeenCalledWith('Categoria não encontrada.');
    expect(pushMock).toHaveBeenCalledWith('/categories');
  });
});

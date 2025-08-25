// app/categories/[id]/page.test.tsx

import { render, screen } from '@testing-library/react';
import DetailsCategoryPage from './page';
import { categories as mockCategories } from '../../mocks/categories';
import '@testing-library/jest-dom';
import { useRouter, useParams } from 'next/navigation';

// Mock do useRouter e useParams
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

describe('DetailsCategoryPage', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('exibe mensagem de loading inicialmente', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    render(<DetailsCategoryPage />);
    expect(screen.getByText(/Carregando detalhes da categoria/i)).toBeInTheDocument();
  });

  it('renderiza detalhes da categoria quando encontrada', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(<DetailsCategoryPage />);
    // Espera que o título apareça
    const category = mockCategories.find(c => c.id === 1);
    expect(await screen.findByText('Categoria - Detalhes')).toBeInTheDocument();
    expect(screen.getByText(category!.name)).toBeInTheDocument();

    // Testa links
    expect(screen.getByRole('link', { name: /Voltar/i })).toHaveAttribute('href', '/categories');
    expect(screen.getByRole('link', { name: /Editar/i })).toHaveAttribute(
      'href',
      `/categories/edit/${category!.id}`
    );
  });

  it('redireciona quando categoria não encontrada', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '999' });
    window.alert = jest.fn(); // mock alert

    render(<DetailsCategoryPage />);
    expect(window.alert).toHaveBeenCalledWith('Categoria não encontrada.');
    expect(pushMock).toHaveBeenCalledWith('/categories');
  });
});

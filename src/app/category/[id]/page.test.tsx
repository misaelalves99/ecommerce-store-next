// app/categories/[id]/page.test.tsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DetailsCategoryPage from './page';
import { categories as mockCategories } from '../../mocks/categories';
import { useRouter, useParams } from 'next/navigation';
import { useCategories } from '../../hooks/useCategories';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock('../../hooks/useCategories', () => ({
  useCategories: jest.fn(),
}));

describe('DetailsCategoryPage', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    jest.clearAllMocks();
    window.alert = jest.fn();
  });

  it('exibe mensagem "Categoria não encontrada" se o id não existir', async () => {
    (useCategories as jest.Mock).mockReturnValue({ categories: mockCategories });
    (useParams as jest.Mock).mockReturnValue({ id: '999' });

    render(<DetailsCategoryPage />);

    await waitFor(() => {
      expect(screen.getByText(/Categoria não encontrada/i)).toBeInTheDocument();
    });

    const voltarBtn = screen.getByRole('button', { name: /Voltar/i });
    fireEvent.click(voltarBtn);

    expect(pushMock).toHaveBeenCalledWith('/category');
  });

  it('renderiza detalhes da categoria existente', async () => {
    (useCategories as jest.Mock).mockReturnValue({ categories: mockCategories });
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    render(<DetailsCategoryPage />);

    const category = mockCategories.find(c => c.id === 1)!;

    await waitFor(() => {
      expect(screen.getByText(/Detalhes da Categoria/i)).toBeInTheDocument();
      expect(screen.getByText(category.name)).toBeInTheDocument();
    });

    const voltarBtn = screen.getByRole('button', { name: /Voltar/i });
    const editarBtn = screen.getByRole('button', { name: /Editar/i });

    fireEvent.click(voltarBtn);
    expect(pushMock).toHaveBeenCalledWith('/category');

    fireEvent.click(editarBtn);
    expect(pushMock).toHaveBeenCalledWith(`/category/edit/${category.id}`);
  });
});

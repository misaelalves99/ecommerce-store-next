// app/categories/page.test.tsx

import { render, screen } from '@testing-library/react';
import CategoryPage from './page';
import { useCategories } from '../hooks/useCategories';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';

// Mock do useCategories
jest.mock('../hooks/useCategories');

// Mock do useRouter do Next.js
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('CategoryPage', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza corretamente o título e botão de adicionar categoria', () => {
    (useCategories as jest.Mock).mockReturnValue({ categories: [] });
    render(<CategoryPage />);

    expect(screen.getByText(/Categorias/i)).toBeInTheDocument();
    expect(screen.getByText(/Adicionar Categoria/i)).toBeInTheDocument();
  });

  it('renderiza lista de categorias recebida do hook', () => {
    const mockData = [
      { id: 1, name: 'Categoria A', description: 'Descrição A' },
      { id: 2, name: 'Categoria B', description: 'Descrição B' },
    ];
    (useCategories as jest.Mock).mockReturnValue({ categories: mockData });

    render(<CategoryPage />);

    expect(screen.getByText('Categoria A')).toBeInTheDocument();
    expect(screen.getByText('Categoria B')).toBeInTheDocument();
  });

  it('botão "Adicionar Categoria" redireciona para /category/create', async () => {
    (useCategories as jest.Mock).mockReturnValue({ categories: [] });
    render(<CategoryPage />);

    const user = userEvent.setup();
    const addButton = screen.getByText(/Adicionar Categoria/i);
    await user.click(addButton);

    // Link do Next.js não dispara push no teste, mas podemos testar href
    expect(addButton.closest('a')).toHaveAttribute('href', '/category/create');
  });
});

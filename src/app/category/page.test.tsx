// app/categories/page.test.tsx

import { render, screen } from '@testing-library/react';
import CategoryPage from './page';
import { useCategories } from '../hooks/useCategories';
import '@testing-library/jest-dom';

// Mock do useCategories
jest.mock('../hooks/useCategories');

describe('CategoryPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza corretamente o título e botão de adicionar categoria', () => {
    (useCategories as jest.Mock).mockReturnValue({ categories: [] });
    render(<CategoryPage />);

    expect(screen.getByText(/Categorias/i)).toBeInTheDocument();
    const addButton = screen.getByText(/Adicionar Categoria/i);
    expect(addButton).toBeInTheDocument();
    expect(addButton.closest('a')).toHaveAttribute('href', '/category/create');
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
});

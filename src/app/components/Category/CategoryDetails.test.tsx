// app/components/Category/CategoryDetails.test.tsx

import { render, screen } from '@testing-library/react';
import CategoryDetails from './CategoryDetails';
import type { Category } from '../../types/Category';

describe('CategoryDetails', () => {
  const mockCategory: Category = {
    id: 1,
    name: 'Eletrônicos',
    description: 'Produtos eletrônicos variados',
    createdAt: '2023-01-10T10:00:00Z',
  };

  it('deve renderizar corretamente os detalhes da categoria', () => {
    render(<CategoryDetails category={mockCategory} />);

    // Verifica se o título está presente
    expect(screen.getByText('Detalhes da Categoria')).toBeInTheDocument();

    // Verifica cada detalhe individualmente
    expect(screen.getByText('ID:')).toBeInTheDocument();
    expect(screen.getByText(String(mockCategory.id))).toBeInTheDocument();

    expect(screen.getByText('Nome:')).toBeInTheDocument();
    expect(screen.getByText(mockCategory.name)).toBeInTheDocument();

    expect(screen.getByText('Descrição:')).toBeInTheDocument();
    expect(screen.getByText(mockCategory.description)).toBeInTheDocument();
  });
});

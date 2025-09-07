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

    // Verifica se o nome da categoria aparece como título do card
    expect(screen.getByText(mockCategory.name)).toBeInTheDocument();

    // Verifica cada detalhe individualmente
    expect(screen.getByText(/ID:/i)).toBeInTheDocument();
    expect(screen.getByText(String(mockCategory.id))).toBeInTheDocument();

    expect(screen.getByText(/Nome:/i)).toBeInTheDocument();
    expect(screen.getAllByText(mockCategory.name)[1]).toBeInTheDocument();

    expect(screen.getByText(/Descrição:/i)).toBeInTheDocument();
    expect(screen.getByText(mockCategory.description)).toBeInTheDocument();
  });

  it('mostra "-" se descrição estiver vazia', () => {
    const categoryWithoutDescription: Category = {
      ...mockCategory,
      description: '',
    };
    render(<CategoryDetails category={categoryWithoutDescription} />);
    expect(screen.getByText('-')).toBeInTheDocument();
  });
});

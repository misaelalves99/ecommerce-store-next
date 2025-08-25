// app/components/Category/CategoryList.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import CategoryList from './CategoryList';
import type { Category } from '../../types/Category';
import '@testing-library/jest-dom';

describe('CategoryList', () => {
  const categories: Category[] = [
    { id: 1, name: 'Eletrônicos', description: 'Produtos eletrônicos', createdAt: '2023-01-10T10:00:00Z' },
    { id: 2, name: 'Roupas', description: 'Vestuário e acessórios', createdAt: '2023-02-05T15:30:00Z' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve exibir mensagem quando não houver categorias', () => {
    render(<CategoryList categories={[]} />);
    expect(screen.getByText('Nenhuma categoria cadastrada.')).toBeInTheDocument();
  });

  it('deve renderizar uma tabela com categorias', () => {
    render(<CategoryList categories={categories} />);

    // Verifica cabeçalho
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Descrição')).toBeInTheDocument();
    expect(screen.getByText('Ações')).toBeInTheDocument();

    // Verifica conteúdo da primeira categoria
    expect(screen.getByText('Eletrônicos')).toBeInTheDocument();
    expect(screen.getByText('Produtos eletrônicos')).toBeInTheDocument();

    // Verifica links
    const detalhesLink = screen.getByText('Detalhes');
    expect(detalhesLink).toHaveAttribute('href', '/category/1');

    const editarLink = screen.getByText('Editar');
    expect(editarLink).toHaveAttribute('href', '/category/edit/1');
  });

  it('deve chamar alert ao clicar em Excluir', () => {
    window.alert = jest.fn(); // Mock do alert

    render(<CategoryList categories={categories} />);
    const excluirBtn = screen.getAllByText('Excluir')[0];

    fireEvent.click(excluirBtn);
    expect(window.alert).toHaveBeenCalledWith('Excluir categoria Eletrônicos');
  });
});

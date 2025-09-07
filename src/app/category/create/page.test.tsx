// app/categories/create/page.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateCategoryPage from './page';
import { useRouter } from 'next/navigation';
import { useCategories } from '../../hooks/useCategories';

// Mock do Next.js useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock do hook useCategories
jest.mock('../../hooks/useCategories', () => ({
  useCategories: jest.fn(),
}));

describe('CreateCategoryPage', () => {
  const pushMock = jest.fn();
  const addCategoryMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (useCategories as jest.Mock).mockReturnValue({ addCategory: addCategoryMock });
    jest.clearAllMocks();
  });

  it('renderiza o título da página', () => {
    render(<CreateCategoryPage />);
    expect(screen.getByText(/Adicionar Categoria/i)).toBeInTheDocument();
  });

  it('chama addCategory e redireciona ao submeter o formulário', async () => {
    render(<CreateCategoryPage />);

    // Captura todos os inputs do formulário (primeiro e segundo textbox)
    const textboxes = screen.getAllByRole('textbox');
    const nameInput = textboxes[0];
    const descriptionInput = textboxes[1];

    const submitButton = screen.getByRole('button', { name: /Salvar|Adicionar/i });

    await userEvent.type(nameInput, 'Nova Categoria');
    await userEvent.type(descriptionInput, 'Descrição teste');

    await userEvent.click(submitButton);

    expect(addCategoryMock).toHaveBeenCalledWith({
      name: 'Nova Categoria',
      description: 'Descrição teste',
    });
    expect(pushMock).toHaveBeenCalledWith('/category');
  });

  it('redireciona ao cancelar', async () => {
    render(<CreateCategoryPage />);

    const cancelButton = screen.getByRole('button', { name: /Cancelar/i });
    await userEvent.click(cancelButton);

    expect(pushMock).toHaveBeenCalledWith('/category');
  });
});

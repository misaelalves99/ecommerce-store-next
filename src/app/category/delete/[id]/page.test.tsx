// app/categories/delete/[id]/page.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeleteCategoryPage from './page';
import { CategoryContext } from '../../../contexts/CategoryContext';
import { CategoryContextType } from '../../../types/CategoryContextType';
import { useRouter, useParams } from 'next/navigation';

// Mock do Next.js
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

describe('DeleteCategoryPage', () => {
  const pushMock = jest.fn();
  const removeCategoryMock = jest.fn();

  // Mock completo de categoria
  const category = {
    id: 1,
    name: 'Categoria Teste',
    description: 'Descrição da categoria',
    createdAt: new Date().toISOString(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    pushMock.mockClear();
    removeCategoryMock.mockClear();
  });

  const renderWithContext = (categories = [category]) => {
    const contextValue: CategoryContextType = {
      categories,
      addCategory: jest.fn(),
      removeCategory: removeCategoryMock,
      updateCategory: jest.fn(),
    };

    return render(
      <CategoryContext.Provider value={contextValue}>
        <DeleteCategoryPage />
      </CategoryContext.Provider>
    );
  };

  it('mostra mensagem de carregando quando a categoria não foi encontrada', () => {
    renderWithContext([]);
    expect(screen.getByText(/Carregando/i)).toBeInTheDocument();
  });

  it('renderiza a categoria encontrada', async () => {
    renderWithContext();
    expect(await screen.findByText(/Excluir Categoria/i)).toBeInTheDocument();
    expect(screen.getByText(/Categoria Teste/i)).toBeInTheDocument();
    expect(screen.getByText(/Descrição da categoria/i)).toBeInTheDocument();
  });

  it('cancela exclusão e volta para /category', async () => {
    renderWithContext();
    const cancelBtn = await screen.findByRole('button', { name: /Cancelar/i });
    await userEvent.click(cancelBtn);

    expect(pushMock).toHaveBeenCalledWith('/category');
  });

  it('confirma exclusão e remove a categoria', async () => {
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);

    renderWithContext();
    const deleteBtn = await screen.findByRole('button', { name: /Excluir/i });
    await userEvent.click(deleteBtn);

    expect(removeCategoryMock).toHaveBeenCalledWith(1);
    expect(pushMock).toHaveBeenCalledWith('/category');

    confirmSpy.mockRestore();
  });

  it('nega exclusão no confirm → não chama remove nem push', async () => {
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(false);

    renderWithContext();
    const deleteBtn = await screen.findByRole('button', { name: /Excluir/i });
    await userEvent.click(deleteBtn);

    expect(removeCategoryMock).not.toHaveBeenCalled();
    expect(pushMock).not.toHaveBeenCalled();

    confirmSpy.mockRestore();
  });
});

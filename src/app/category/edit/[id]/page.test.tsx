// app/categories/edit/[id]/page.test.tsx

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditCategoryPage from './page';
import { useRouter } from 'next/navigation';
import { useCategories } from '../../../hooks/useCategories';
import { categories as mockCategories } from '../../../mocks/categories';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../../hooks/useCategories', () => ({
  useCategories: jest.fn(),
}));

describe('EditCategoryPage', () => {
  const pushMock = jest.fn();
  const updateCategoryMock = jest.fn();
  const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (useCategories as jest.Mock).mockReturnValue({
      categories: mockCategories,
      updateCategory: updateCategoryMock,
    });
    jest.clearAllMocks();
  });

  it('exibe mensagem de loading se categoria não encontrada', () => {
    render(<EditCategoryPage params={{ id: '9999' }} />);
    expect(screen.getByText(/Carregando categoria/i)).toBeInTheDocument();
  });

  it('carrega a categoria correta quando id existe', () => {
    const category = mockCategories[0];
    render(<EditCategoryPage params={{ id: String(category.id) }} />);

    expect(screen.getByText(/Editar Categoria/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(category.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(category.description)).toBeInTheDocument();
  });

  it('alerta e redireciona se categoria não encontrada', async () => {
    render(<EditCategoryPage params={{ id: '9999' }} />);
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Categoria não encontrada.');
      expect(pushMock).toHaveBeenCalledWith('/category');
    });
  });

  it('redireciona ao cancelar', async () => {
    const category = mockCategories[0];
    render(<EditCategoryPage params={{ id: String(category.id) }} />);
    const cancelButton = screen.getByRole('button', { name: /Cancelar/i });
    await userEvent.click(cancelButton);
    expect(pushMock).toHaveBeenCalledWith('/category');
  });

  it('submete formulário e chama updateCategory', async () => {
    const category = mockCategories[0];
    render(<EditCategoryPage params={{ id: String(category.id) }} />);
    
    const nameInput = screen.getByLabelText(/Nome/i);
    const descriptionInput = screen.getByLabelText(/Descrição/i);
    const submitButton = screen.getByRole('button', { name: /Salvar|Atualizar/i });

    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Nova Categoria');
    await userEvent.clear(descriptionInput);
    await userEvent.type(descriptionInput, 'Nova descrição');
    await userEvent.click(submitButton);

    expect(updateCategoryMock).toHaveBeenCalledWith(category.id, {
      name: 'Nova Categoria',
      description: 'Nova descrição',
    });
    expect(pushMock).toHaveBeenCalledWith('/category');
  });
});

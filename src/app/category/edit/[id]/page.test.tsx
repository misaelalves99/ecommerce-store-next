// app/categories/edit/[id]/page.test.tsx

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditCategoryPage from './page';
import { useRouter } from 'next/navigation';
import { categories as mockCategories } from '../../../mocks/categories';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('EditCategoryPage', () => {
  const pushMock = jest.fn();
  const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    jest.clearAllMocks();
  });

  it('exibe mensagem de loading quando category ainda não está carregada', () => {
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

  it('submete formulário e redireciona', async () => {
    const category = mockCategories[0];
    render(<EditCategoryPage params={{ id: String(category.id) }} />);

    const nameInput = screen.getByLabelText(/Nome/i);
    const descriptionInput = screen.getByLabelText(/Descrição/i);
    const submitButton = screen.getByRole('button', { name: /Salvar|Atualizar/i });

    await userEvent.type(nameInput, 'Nova Categoria');
    await userEvent.type(descriptionInput, 'Nova descrição');
    await userEvent.click(submitButton);

    expect(pushMock).toHaveBeenCalledWith('/category');
  });
});

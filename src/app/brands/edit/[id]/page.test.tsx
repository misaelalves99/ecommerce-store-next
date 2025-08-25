// app/brands/edit/[id]/page.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditBrandPage from './page';
import { useRouter, usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe('EditBrandPage', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (usePathname as jest.Mock).mockReturnValue('/brands/edit/1');
    pushMock.mockClear();
  });

  it('renderiza o título e o formulário com o nome inicial', async () => {
    render(<EditBrandPage />);
    expect(screen.getByText(/Editar Marca/i)).toBeInTheDocument();
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Marca 1'); // assumindo que mockBrands[0].name === 'Marca 1'
  });

  it('chama handleUpdate e navega ao submeter o formulário', async () => {
    render(<EditBrandPage />);
    const input = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /Salvar|Atualizar/i });

    await userEvent.clear(input);
    await userEvent.type(input, 'Marca Atualizada');
    await userEvent.click(submitButton);

    expect(pushMock).toHaveBeenCalledWith('/brands');
  });

  it('navega ao cancelar', async () => {
    render(<EditBrandPage />);
    const cancelButton = screen.getByRole('button', { name: /Cancelar/i });

    await userEvent.click(cancelButton);

    expect(pushMock).toHaveBeenCalledWith('/brands');
  });

  it('redireciona se a marca não existe', async () => {
    (usePathname as jest.Mock).mockReturnValue('/brands/edit/999'); // id inexistente
    window.alert = jest.fn();

    render(<EditBrandPage />);
    expect(window.alert).toHaveBeenCalledWith('Marca não encontrada.');
    expect(pushMock).toHaveBeenCalledWith('/brands');
  });
});

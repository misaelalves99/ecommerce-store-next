// app/brands/edit/[id]/page.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditBrandPage from './page';

// Mock do Next Router
const pushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: pushMock })),
}));

// Mock do hook useBrands
const updateBrandMock = jest.fn();
const mockBrands = [
  { id: 1, name: 'Marca 1', createdAt: new Date().toISOString(), isActive: true },
  { id: 2, name: 'Marca 2', createdAt: new Date().toISOString(), isActive: true },
];
jest.mock('../../../hooks/useBrands', () => ({
  useBrands: jest.fn(() => ({
    brands: mockBrands,
    updateBrand: updateBrandMock,
  })),
}));

describe('EditBrandPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProps = (id: string) =>
    render(<EditBrandPage params={{ id }} />);

  it('renderiza o título e o formulário com o nome inicial', async () => {
    renderWithProps('1');

    expect(await screen.findByText(/Editar Marca/i)).toBeInTheDocument();
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Marca 1');
  });

  it('chama updateBrand e navega ao submeter o formulário', async () => {
    renderWithProps('1');

    const input = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /Salvar|Atualizar/i });

    await userEvent.clear(input);
    await userEvent.type(input, 'Marca Atualizada');
    await userEvent.click(submitButton);

    expect(updateBrandMock).toHaveBeenCalledWith(1, 'Marca Atualizada');
    expect(pushMock).toHaveBeenCalledWith('/brands');
  });

  it('navega ao cancelar', async () => {
    renderWithProps('1');

    const cancelButton = screen.getByRole('button', { name: /Cancelar/i });
    await userEvent.click(cancelButton);

    expect(pushMock).toHaveBeenCalledWith('/brands');
  });

  it('redireciona se a marca não existe', async () => {
    window.alert = jest.fn();

    renderWithProps('999'); // id inexistente

    expect(window.alert).toHaveBeenCalledWith('Marca não encontrada.');
    expect(pushMock).toHaveBeenCalledWith('/brands');
  });
});

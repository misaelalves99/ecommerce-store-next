// app/brands/delete/[id]/page.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeleteBrandPage from './page';
import { BrandContext } from '../../../contexts/BrandContext';
import { BrandContextType } from '../../../types/BrandContextType';
import { Brand } from '../../../types/Brand';
import { useRouter, useParams } from 'next/navigation';

// Mock do Next Router e Params
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

describe('DeleteBrandPage', () => {
  const pushMock = jest.fn();
  const removeBrandMock = jest.fn();

  // Marca mockada completa para respeitar o tipo Brand
  const brand: Brand = {
    id: 1,
    name: 'Marca Teste',
    createdAt: new Date().toISOString(),
    isActive: true,
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (useParams as jest.Mock).mockReturnValue({ id: '1' });

    pushMock.mockClear();
    removeBrandMock.mockClear();
  });

  const renderWithContext = (brands: Brand[] = [brand]) => {
    const contextValue: BrandContextType = {
      brands,
      addBrand: jest.fn(),
      removeBrand: removeBrandMock,
      updateBrand: jest.fn(),
    };

    return render(
      <BrandContext.Provider value={contextValue}>
        <DeleteBrandPage />
      </BrandContext.Provider>
    );
  };

  it('mostra mensagem de carregando quando a marca não foi encontrada ainda', () => {
    renderWithContext([]);
    expect(screen.getByText(/Carregando/i)).toBeInTheDocument();
  });

  it('renderiza a marca encontrada', async () => {
    renderWithContext();
    expect(await screen.findByText(/Excluir Marca/i)).toBeInTheDocument();
    expect(screen.getByText(/Marca Teste/i)).toBeInTheDocument();
  });

  it('cancela exclusão e volta para /brands', async () => {
    renderWithContext();

    const cancelBtn = await screen.findByRole('button', { name: /Cancelar/i });
    await userEvent.click(cancelBtn);

    expect(pushMock).toHaveBeenCalledWith('/brands');
  });

  it('confirma exclusão e remove a marca', async () => {
    // mock do confirm
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);

    renderWithContext();

    const deleteBtn = await screen.findByRole('button', { name: /Excluir/i });
    await userEvent.click(deleteBtn);

    expect(removeBrandMock).toHaveBeenCalledWith(1);
    expect(pushMock).toHaveBeenCalledWith('/brands');

    confirmSpy.mockRestore();
  });

  it('nega exclusão no confirm → não chama remove nem push', async () => {
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(false);

    renderWithContext();

    const deleteBtn = await screen.findByRole('button', { name: /Excluir/i });
    await userEvent.click(deleteBtn);

    expect(removeBrandMock).not.toHaveBeenCalled();
    expect(pushMock).not.toHaveBeenCalled();

    confirmSpy.mockRestore();
  });
});

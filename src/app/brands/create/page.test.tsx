// app/brands/create/page.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateBrandPage from './page';
import { BrandContext } from '../../contexts/BrandContext';
import { BrandContextType } from '../../types/BrandContextType';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('CreateBrandPage', () => {
  const pushMock = jest.fn();
  const addBrandMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    pushMock.mockClear();
    addBrandMock.mockClear();
  });

  const renderWithContext = () => {
    const contextValue: BrandContextType = {
      brands: [],        // necessário para satisfazer o tipo
      addBrand: addBrandMock,
    };

    return render(
      <BrandContext.Provider value={contextValue}>
        <CreateBrandPage />
      </BrandContext.Provider>
    );
  };

  it('renderiza o título', () => {
    renderWithContext();
    expect(screen.getByText(/Adicionar Marca/i)).toBeInTheDocument();
  });

  it('chama addBrand e navega ao submeter o formulário', async () => {
    renderWithContext();
    const input = screen.getByRole('textbox'); 
    const submitButton = screen.getByRole('button', { name: /Salvar|Adicionar/i });

    await userEvent.type(input, 'Nova Marca');
    await userEvent.click(submitButton);

    expect(addBrandMock).toHaveBeenCalledWith('Nova Marca');
    expect(pushMock).toHaveBeenCalledWith('/brands');
  });

  it('navega ao cancelar', async () => {
    renderWithContext();
    const cancelButton = screen.getByRole('button', { name: /Cancelar/i });

    await userEvent.click(cancelButton);

    expect(pushMock).toHaveBeenCalledWith('/brands');
  });
});

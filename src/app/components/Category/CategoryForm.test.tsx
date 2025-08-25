// app/components/Category/CategoryForm.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategoryForm from './CategoryForm';

describe('CategoryForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar com campos vazios por padrão', () => {
    render(<CategoryForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText(/nome/i)).toHaveValue('');
    expect(screen.getByLabelText(/descrição/i)).toHaveValue('');
    expect(screen.getByRole('button', { name: /salvar/i })).toBeInTheDocument();
  });

  it('deve preencher os campos com initialName e initialDescription', () => {
    render(
      <CategoryForm
        initialName="Eletrônicos"
        initialDescription="Produtos variados"
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByLabelText(/nome/i)).toHaveValue('Eletrônicos');
    expect(screen.getByLabelText(/descrição/i)).toHaveValue('Produtos variados');
  });

  it('deve mostrar erros se os campos estiverem vazios ao enviar', async () => {
    render(<CategoryForm onSubmit={mockOnSubmit} />);
    
    fireEvent.click(screen.getByRole('button', { name: /salvar/i }));

    expect(await screen.findByText('O nome é obrigatório.')).toBeInTheDocument();
    expect(await screen.findByText('A descrição é obrigatória.')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('deve chamar onSubmit com dados corretos', async () => {
    render(<CategoryForm onSubmit={mockOnSubmit} />);
    
    await userEvent.type(screen.getByLabelText(/nome/i), 'Eletrônicos');
    await userEvent.type(screen.getByLabelText(/descrição/i), 'Produtos variados');
    
    fireEvent.click(screen.getByRole('button', { name: /salvar/i }));

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'Eletrônicos',
      description: 'Produtos variados',
    });
  });

  it('deve chamar onCancel quando o botão Cancelar for clicado', async () => {
    render(<CategoryForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    fireEvent.click(screen.getByRole('button', { name: /cancelar/i }));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });
});

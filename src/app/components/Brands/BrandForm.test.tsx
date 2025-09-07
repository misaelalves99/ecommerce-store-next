// app/components/Brand/BrandForm.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import BrandForm from './BrandForm';

describe('BrandForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza o formulário com valor inicial', () => {
    render(<BrandForm initialName="Marca Teste" onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    expect(screen.getByLabelText(/Nome da Marca/i)).toHaveValue('Marca Teste');
    expect(screen.getByRole('button', { name: /Salvar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancelar/i })).toBeInTheDocument();
  });

  it('chama onSubmit com valor correto ao enviar', () => {
    render(<BrandForm onSubmit={mockOnSubmit} />);
    
    const input = screen.getByLabelText(/Nome da Marca/i);
    fireEvent.change(input, { target: { value: 'Nova Marca' } });
    fireEvent.click(screen.getByRole('button', { name: /Salvar/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith('Nova Marca');
  });

  it('exibe erro se o nome estiver vazio', () => {
    render(<BrandForm onSubmit={mockOnSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/Nome da Marca/i), { target: { value: ' ' } });
    fireEvent.click(screen.getByRole('button', { name: /Salvar/i }));

    expect(screen.getByText(/O nome da marca é obrigatório./i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('remove o erro após uma submissão válida', () => {
    render(<BrandForm onSubmit={mockOnSubmit} />);
    
    const input = screen.getByLabelText(/Nome da Marca/i);
    const submitBtn = screen.getByRole('button', { name: /Salvar/i });

    // Submissão inválida
    fireEvent.change(input, { target: { value: ' ' } });
    fireEvent.click(submitBtn);
    expect(screen.getByText(/O nome da marca é obrigatório./i)).toBeInTheDocument();

    // Submissão válida
    fireEvent.change(input, { target: { value: 'Marca Corrigida' } });
    fireEvent.click(submitBtn);
    expect(mockOnSubmit).toHaveBeenCalledWith('Marca Corrigida');
    expect(screen.queryByText(/O nome da marca é obrigatório./i)).not.toBeInTheDocument();
  });

  it('chama onCancel ao clicar no botão Cancelar', () => {
    render(<BrandForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    fireEvent.click(screen.getByRole('button', { name: /Cancelar/i }));
    
    expect(mockOnCancel).toHaveBeenCalled();
  });
});

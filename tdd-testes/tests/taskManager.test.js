import { describe, it, expect } from 'vitest';
import { removeTask } from '../src/taskManager.js';

describe('Função removeTask', () => {
  const tarefas = [
    { id: 1, title: 'Estudar TDD' },
    { id: 2, title: 'Fazer commits' },
    { id: 3, title: 'Beber água' }
  ];

  it('Deve remover a tarefa correta pelo ID e manter as outras intactas', () => {
    const result = removeTask(tarefas, 2);
    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { id: 1, title: 'Estudar TDD' },
      { id: 3, title: 'Beber água' }
    ]);
  });

  it('Deve retornar um novo array (imutabilidade)', () => {
    const result = removeTask(tarefas, 1);
    expect(result).not.toBe(tarefas); 
  });

  it('Deve retornar a lista completa se o ID for inexistente', () => {
    const result = removeTask(tarefas, 99);
    expect(result).toHaveLength(3);
    expect(result).toEqual(tarefas);
  });

  it('Deve retornar um array vazio se a lista fornecida for vazia', () => {
    const result = removeTask([], 1);
    expect(result).toEqual([]);
  });
});
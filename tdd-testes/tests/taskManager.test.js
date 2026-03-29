import { describe, it, expect } from 'vitest';
import { removeTask, filterTasks } from '../src/taskManager.js';

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

describe('Função filterTasks', () => {
  const tarefas = [
    { id: 1, title: 'Estudar TDD', status: 'completed' },
    { id: 2, title: 'Fazer commits', status: 'pending' },
    { id: 3, title: 'Beber água', status: 'pending' }
  ];

  it('Deve retornar todas as tarefas', () => {
    const result = filterTasks(tarefas, 'all');
    expect(result).toHaveLength(3);
    expect(result).toEqual(tarefas);
  });

  it('Deve retornar apenas as tarefas pendentes', () => {
    const result = filterTasks(tarefas, 'pending');
    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { id: 2, title: 'Fazer commits', status: 'pending' },
      { id: 3, title: 'Beber água', status: 'pending' }
    ]);
  });

  it('Deve retornar apenas as tarefas concluídas', () => {
    const result = filterTasks(tarefas, 'completed');
    expect(result).toHaveLength(1);
    expect(result).toEqual([
      { id: 1, title: 'Estudar TDD', status: 'completed' }
    ]);
  });

  it('Deve retornar todas as tarefas se o filtro for desconhecido', () => {
    const result = filterTasks(tarefas, 'status_maluco');
    expect(result).toHaveLength(3);
    expect(result).toEqual(tarefas);
  });

  it('Deve retornar um array vazio se a lista fornecida for vazia', () => {
    const result = filterTasks([], 'pending');
    expect(result).toEqual([]);
  });

  it('Deve retornar um novo array mesmo quando retorna todas as tarefas', () => {
    const resultAll = filterTasks(tarefas, 'all');
    const resultDefault = filterTasks(tarefas, 'desconhecido');
    expect(resultAll).not.toBe(tarefas);
    expect(resultDefault).not.toBe(tarefas);
  });
});
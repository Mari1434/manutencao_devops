import { describe, it, expect } from 'vitest';
import { removeTask, filterTasks, countTasks, countCompleted, countPending, createTask, validatePriority, filterByPriority } from '../src/taskManager.js';

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

describe('Funções de Contagem', () => {
  const tasks = [
    { id: 1, title: 'Estudar Vitest', completed: true },
    { id: 2, title: 'Fazer commits RED', completed: false },
    { id: 3, title: 'Beber água', completed: false }
  ];

  const allCompletedTasks = [
    { id: 1, title: 'Tarefa 1', completed: true },
    { id: 2, title: 'Tarefa 2', completed: true }
  ];

  describe('countTasks', () => {
    it('Deve retornar o total de tarefas', () => {
      expect(countTasks(tasks)).toBe(3);
    });

    it('Deve retornar 0 se a lista for vazia', () => {
      expect(countTasks([])).toBe(0);
    });
  });

  describe('countCompleted', () => {
    it('Deve retornar apenas a quantidade de tarefas concluídas', () => {
      expect(countCompleted(tasks)).toBe(1);
    });

    it('Deve retornar 0 se a lista for vazia', () => {
      expect(countCompleted([])).toBe(0);
    });

    it('Deve retornar 0 quando não houver nenhuma tarefa concluída', () => {
      const onlyPending = [{ id: 1, completed: false }];
      expect(countCompleted(onlyPending)).toBe(0);
    });
  });

  describe('countPending', () => {
    it('Deve retornar apenas a quantidade de tarefas pendentes', () => {
      expect(countPending(tasks)).toBe(2);
    });

    it('Deve retornar 0 se a lista for vazia', () => {
      expect(countPending([])).toBe(0);
    });

    it('Deve retornar 0 quando não houver nenhuma tarefa pendente', () => {
      expect(countPending(allCompletedTasks)).toBe(0);
    });
  });
});

describe('Funcionalidades de Prioridade', () => {
  
  describe('createTask', () => {
    it('Deve criar uma tarefa com a prioridade fornecida', () => {
      const task = createTask('Estudar Vitest', 'high');
      expect(task).toHaveProperty('title', 'Estudar Vitest');
      expect(task).toHaveProperty('priority', 'high');
    });

    it('Deve criar uma tarefa com prioridade "medium" por padrão', () => {
      const task = createTask('Fazer commits RED');
      expect(task).toHaveProperty('priority', 'medium');
    });
  });

  describe('validatePriority', () => {
    it('Deve retornar true para prioridades válidas', () => {
      expect(validatePriority('low')).toBe(true);
      expect(validatePriority('medium')).toBe(true);
      expect(validatePriority('high')).toBe(true);
    });

    it('Deve retornar false para prioridades inválidas', () => {
      expect(validatePriority('urgente')).toBe(false);
      expect(validatePriority('')).toBe(false);
    });
  });

  describe('filterByPriority', () => {
    const tasks = [
      { id: 1, title: 'Tarefa 1', priority: 'high' },
      { id: 2, title: 'Tarefa 2', priority: 'medium' },
      { id: 3, title: 'Tarefa 3', priority: 'high' },
      { id: 4, title: 'Tarefa 4', priority: 'low' }
    ];

    it('Deve retornar apenas as tarefas com a prioridade especificada', () => {
      const highPriorityTasks = filterByPriority(tasks, 'high');
      
      expect(highPriorityTasks).toHaveLength(2);
      expect(highPriorityTasks).toEqual([
        { id: 1, title: 'Tarefa 1', priority: 'high' },
        { id: 3, title: 'Tarefa 3', priority: 'high' }
      ]);
    });

    it('Deve retornar um array vazio se nenhuma tarefa tiver a prioridade especificada', () => {
      const urgentTasks = filterByPriority(tasks, 'urgente');
      expect(urgentTasks).toEqual([]);
    });
  });
});
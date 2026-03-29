export const removeTask = (tasks, taskId) => tasks.filter(task => task.id !== taskId);

export const filterTasks = (tasks, status) => {
  switch (status) {
    case 'completed':
      return tasks.filter(task => task.status === 'completed');
    case 'pending':
      return tasks.filter(task => task.status === 'pending');
    default:
      return [...tasks]; 
  }
};

export const countTasks = (tasks) => tasks.length;

export const countCompleted = (tasks) => tasks.filter(task => task.completed === true).length;

export const countPending = (tasks) => tasks.filter(task => task.completed === false).length;

export const createTask = (title, priority = 'medium') => ({
  id: Date.now(),
  title,
  priority,
  completed: false
});

export const validatePriority = (priority) => {
  const validPriorities = ['low', 'medium', 'high'];
  return validPriorities.includes(priority);
};

export const filterByPriority = (tasks, priority) => tasks.filter(task => task.priority === priority);

export const isDuplicate = (tasks, title) => {
  const cleanTitle = title.trim().toLowerCase();
  return tasks.some(task => task.title.trim().toLowerCase() === cleanTitle);
};

export const addTask = (tasks, title) => {
  if (isDuplicate(tasks, title)) throw new Error('Tarefa já existe');
  
  return [
    ...tasks, 
    { id: Date.now(), title: title.trim(), completed: false }
  ];
};
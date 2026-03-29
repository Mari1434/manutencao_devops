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
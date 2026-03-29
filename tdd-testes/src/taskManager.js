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

export function countTasks(tasks) {
  return tasks.length;
}

export function countCompleted(tasks) {
  const completedTasks = tasks.filter(function(task) {
    return task.completed === true;
  });
  return completedTasks.length;
}

export function countPending(tasks) {
  const pendingTasks = tasks.filter(function(task) {
    return task.completed === false;
  });
  return pendingTasks.length;
}
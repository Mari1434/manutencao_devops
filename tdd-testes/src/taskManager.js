export const removeTask = (tasks, taskId) => tasks.filter(task => task.id !== taskId);

export function filterTasks(tasks, status) {
  switch (status) {
    case 'completed':
      return tasks.filter(function(task) {
        return task.status === 'completed';
      });
    case 'pending':
      return tasks.filter(function(task) {
        return task.status === 'pending';
      });
    case 'all':
    default:
      return tasks.filter(function() {
        return true; 
      });
  }
}
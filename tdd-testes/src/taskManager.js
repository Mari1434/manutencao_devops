export function removeTask(tasks, taskId) {
  return tasks.filter(function(task) {
    return task.id !== taskId;
  });
}
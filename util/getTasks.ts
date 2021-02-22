import { GetTasks } from '../types';

const getTasks: GetTasks = tasks => {
  const parentTasks = tasks
    .filter(t => !t.parent)
    .map((t, i) => ({
      id: t.id,
      index: i,
      price: t.price,
      completed: t.completed,
      name: t.name,
      subtasks: [] as Task[],
    }));

  const subtasks = tasks
    .filter(st => st.parent)
    .map((st, i) => ({
      id: st.id,
      index: i,
      price: st.price,
      completed: st.completed,
      name: st.name,
      parent: st.parent,
    }));
  parentTasks.forEach(t => {
    subtasks.forEach(st => {
      if (st.parent === t.id) {
        t.subtasks.push(st);
      }
    });
  });
  return parentTasks;
};

export default getTasks;

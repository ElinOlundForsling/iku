const getTasks: GetTasks = tasks => {
  const parentTasks = tasks
    .filter(t => !t.parent)
    .map(t => ({
      id: t.id,
      index: t.index,
      price: t.price,
      completed: t.completed,
      name: t.name,
      subtasks: [] as Task[],
    }));

  const subtasks = tasks
    .filter(st => st.parent)
    .map(st => ({
      id: st.id,
      index: st.index,
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

import todo from './todo';

const project = (save, name, description, todos) => {
  const addTodo = (elements) => {
    if (elements != null) {
      const t = todo(elements.title.value, elements.description.value, elements.date.value,
        elements.priority.value);
      todos.push(t);
      save();
    }
  };

  const removeTodo = (title, description, dueDate, priority) => {
    const index = todos.indexOf(todo(title, description, dueDate, priority));
    if (index !== -1) {
      todos.splice(index, 1);
    }
  };

  return {
    name, todos, addTodo, removeTodo,
  };
};

const projectFactory = (save, obj) => {
  return project(save, obj.name, obj.description, obj.todos);
};

export { projectFactory as default };

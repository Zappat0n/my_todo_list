import todo from './todo';

const project = (save, name, todos) => {
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

const emptyProjectObj = (_name) => ({
  name: _name,
  todos: [],
});

const projectFactory = (save, obj) => {
  return project(save, obj.name, obj.todos);
};

export { projectFactory, emptyProjectObj };

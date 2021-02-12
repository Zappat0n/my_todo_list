import todo from './todo';

const project = (save, obj) => {
  const addTodo = (elements) => {
    console.log(obj);
    if (elements != null) {
      const t = todo(elements.title.value, elements.description.value, elements.date.value,
        elements.priority.value);
      obj.todos.push(t);
      save();
    }
  };

  const removeTodo = (title, description, dueDate, priority) => {
    const index = obj.todos.indexOf(todo(title, description, dueDate, priority));
    if (index !== -1) {
      obj.todos.splice(index, 1);
    }
  };

  return { obj, addTodo, removeTodo };
};

const emptyProjectObj = (_name) => ({
  name: _name,
  todos: [],
});

export { project, emptyProjectObj };

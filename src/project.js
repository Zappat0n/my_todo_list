import todo from './todo';

const project = () => {
  const todos = [];

  const addTodo = (title, description, dueDate, priority) => {
    const t = todo(title, description, dueDate, priority);
    todos.push(t);
  };

  const removeTodo = (title, description, dueDate, priority) => {
    const index = todos.indexOf(todo(title, description, dueDate, priority));
    if (index !== -1) {
      todos.splice(index, 1);
    }
  };

  return { addTodo, removeTodo };
};

export { project as default };

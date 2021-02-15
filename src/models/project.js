import todo from './todo';
import designer from '../views/view_designer'

const project = (save, name, description, todos = []) => {
  const currentTodo = {};

  const addTodo = (elements) => {
    if (elements != null) {
      const t = todo(elements.title.value, elements.description.value, elements.date.value,
        elements.priority.value);
      todos.push(t);
      save();
    }
  };

  const getIndex = (title) => {
    for (let index = 0; index < todos.length; index += 1) {
      if (title === todos[index].title) return index;
    }
    return -1;
  };

  const removeTodo = (index, currentProject) => {
    if (index !== -1) {
      todos.splice(index, 1);
      save();
      designer().updateTodos(currentProject);
      document.querySelector('.todo_container').innerHTML = '';
    }
  };

  return {
    name, currentTodo, description, getIndex, todos, addTodo, removeTodo,
  };
};

const projectFactory = (save, obj) => project(save, obj.name, obj.description, obj.todos);

export { projectFactory as default };
